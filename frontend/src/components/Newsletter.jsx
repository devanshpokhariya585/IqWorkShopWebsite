import React, { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save email')
      }

      setStatus('Email saved successfully.')
      setEmail('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="Company" className='w-full py-16 text-white px-4'>
        <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
            <div className='lg:col-span-2 my-4'>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'> Want tips & tricks to optimize your flow?</h1>
                <p>Sign up to our newsletter and stay up to date.</p>
            </div>
           <div className='my-4'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                  <input
                    className='p-3 flex w-full rounded-md text-black bg-white'
                    type="email"
                    placeholder='Enter Email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <button
                    className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 sm:ml-4 px-6 py-3 text-black cursor-pointer disabled:opacity-60'
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Notify Me'}
                  </button>

              </div>
              {status && <p className='text-[#00df9a] font-medium'>{status}</p>}
              {error && <p className='text-red-400 font-medium'>{error}</p>}
            </form>
           </div>
           <p>We care bout the protection of your data. Read our <span className='text-[#00df9a]'>Privacy Policy</span></p>
        </div >
      
    </div>
  )
}

export default Newsletter
