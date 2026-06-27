import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaPhoneAlt, FaUser } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const AuthPage = ({ mode }) => {
  const isSignup = mode === 'signup'
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')
    setLoading(true)

    const payload = isSignup
      ? formData
      : { email: formData.email, password: formData.password }

    try {
      const response = await fetch(`${API_URL}/auth/${isSignup ? 'signup' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
        window.dispatchEvent(new Event('authChanged'))
      }

      setStatus(isSignup ? 'Account created successfully.' : 'Logged in successfully.')
      setFormData({ name: '', email: '', mobile: '', password: '' })
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='text-white min-h-[calc(100vh-96px)] px-4 py-16 flex items-center'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-10 items-center w-full'>
        <div>
          <p className='text-[#00df9a] font-bold p-2'>START WITH YOUR DATA</p>
          <h1 className='md:text-6xl sm:text-5xl text-4xl font-bold md:py-6'>
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className='md:text-2xl text-xl font-bold text-gray-500 max-w-[620px]'>
            {isSignup
              ? 'Build your analytics workspace and keep every customer signal in one clean flow.'
              : 'Continue monitoring your analytics, revenue, and customer growth.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className='bg-white text-black rounded-lg shadow-xl p-6 sm:p-8 w-full'>
          <div className='mb-8'>
            <h2 className='text-3xl font-bold'>{isSignup ? 'Signup' : 'Login'}</h2>
            <p className='text-gray-500 font-medium mt-2'>
              {isSignup ? 'Join DEVANSH analytics today.' : 'Access your DEVANSH dashboard.'}
            </p>
          </div>

          <div className='grid gap-5'>
            {isSignup && (
              <label className='block'>
                <span className='font-medium'>Name</span>
                <div className='mt-2 flex items-center gap-3 border border-gray-300 rounded-md px-3 focus-within:border-[#00df9a]'>
                  <FaUser className='text-[#00df9a]' />
                  <input
                    className='w-full py-3 outline-none'
                    name='name'
                    type='text'
                    placeholder='Enter name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>
            )}

            <label className='block'>
              <span className='font-medium'>Email</span>
              <div className='mt-2 flex items-center gap-3 border border-gray-300 rounded-md px-3 focus-within:border-[#00df9a]'>
                <FaEnvelope className='text-[#00df9a]' />
                <input
                  className='w-full py-3 outline-none'
                  name='email'
                  type='email'
                  placeholder='Enter email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            {isSignup && (
              <label className='block'>
                <span className='font-medium'>Mobile</span>
                <div className='mt-2 flex items-center gap-3 border border-gray-300 rounded-md px-3 focus-within:border-[#00df9a]'>
                  <FaPhoneAlt className='text-[#00df9a]' />
                  <input
                    className='w-full py-3 outline-none'
                    name='mobile'
                    type='tel'
                    placeholder='Enter mobile'
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>
            )}

            <label className='block'>
              <span className='font-medium'>Password</span>
              <div className='mt-2 flex items-center gap-3 border border-gray-300 rounded-md px-3 focus-within:border-[#00df9a]'>
                <FaLock className='text-[#00df9a]' />
                <input
                  className='w-full py-3 outline-none'
                  name='password'
                  type='password'
                  placeholder='Enter password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
            </label>
          </div>

          {error && <p className='text-red-600 font-medium mt-5'>{error}</p>}
          {status && <p className='text-[#00a875] font-medium mt-5'>{status}</p>}

          <button
            className='bg-[#00df9a] w-full rounded-md font-medium mt-8 py-3 text-black cursor-pointer disabled:opacity-60'
            disabled={loading}
          >
            {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Login'}
          </button>

          <p className='text-center text-gray-600 mt-6 font-medium'>
            {isSignup ? 'Already have an account?' : 'Need an account?'}{' '}
            <Link
              className='text-[#00a875] font-bold'
              to={isSignup ? '/login' : '/signup'}
            >
              {isSignup ? 'Login' : 'Signup'}
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
