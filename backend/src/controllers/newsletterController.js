import NewsletterSubscriber from '../models/NewsletterSubscriber.js'

export const saveNewsletterEmail = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email' })
    }

    const subscriber = await NewsletterSubscriber.create({ email })

    res.status(201).json({
      message: 'Email saved successfully',
      subscriber: {
        id: subscriber._id,
        email: subscriber.email,
      },
    })
  } catch (error) {
    next(error)
  }
}
