import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

const sendAuthResponse = (res, statusCode, user) => {
  const token = signToken(user._id)

  res.status(statusCode).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    },
  })
}

export const signup = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: 'Name, email, mobile, and password are required' })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is missing on the server' })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    })

    sendAuthResponse(res, 201, user)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is missing on the server' })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    sendAuthResponse(res, 200, user)
  } catch (error) {
    next(error)
  }
}
