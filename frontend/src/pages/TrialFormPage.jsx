import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const TrialFormPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    userType: '',
    storageNeeded: '',
    usersAllowed: '',
    transferLimit: '',
  })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/trial-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save trial request')
      }

      setStatus('Trial request saved successfully.')
      setFormData((current) => ({ ...current, companyName: '' }))
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
          <p className='text-[#00df9a] font-bold p-2'>START YOUR TRIAL</p>
          <h1 className='md:text-6xl sm:text-5xl text-4xl font-bold md:py-6'>Tell us what you need</h1>
          <p className='md:text-2xl text-xl font-bold text-gray-500 max-w-[620px]'>
            Choose the account type and storage details so your analytics workspace starts with the right setup.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='bg-white text-black rounded-lg shadow-xl p-6 sm:p-8 w-full'>
          <div className='mb-8'>
            <h2 className='text-3xl font-bold'>Trial Details</h2>
            <p className='text-gray-500 font-medium mt-2'>Your plan information will be saved in the database.</p>
          </div>

          <div className='grid gap-5'>
            <label className='block'>
              <span className='font-medium'>Company Name</span>
              <input
                className='mt-2 w-full p-3 rounded-md border border-gray-300 outline-none focus:border-[#00df9a]'
                name='companyName'
                type='text'
                placeholder='Enter company name'
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </label>

            <label className='block'>
              <span className='font-medium'>Type of User</span>
              <select
                className='mt-2 w-full p-3 rounded-md border border-gray-300 outline-none focus:border-[#00df9a]'
                name='userType'
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value='' disabled>Select user type</option>
                <option value='single'>Single User</option>
                <option value='partnership'>Partnership</option>
                <option value='group'>Group Account</option>
              </select>
            </label>

            <label className='block'>
              <span className='font-medium'>Storage Needed</span>
              <input
                className='mt-2 w-full p-3 rounded-md border border-gray-300 outline-none focus:border-[#00df9a]'
                name='storageNeeded'
                type='text'
                placeholder='Example: 1 TB Storage'
                value={formData.storageNeeded}
                onChange={handleChange}
                required
              />
            </label>

            <label className='block'>
              <span className='font-medium'>Users Allowed</span>
              <input
                className='mt-2 w-full p-3 rounded-md border border-gray-300 outline-none focus:border-[#00df9a]'
                name='usersAllowed'
                type='text'
                placeholder='Example: 3 Users Allowed'
                value={formData.usersAllowed}
                onChange={handleChange}
                required
              />
            </label>

            <label className='block'>
              <span className='font-medium'>Transfer Limit</span>
              <input
                className='mt-2 w-full p-3 rounded-md border border-gray-300 outline-none focus:border-[#00df9a]'
                name='transferLimit'
                type='text'
                placeholder='Example: Send up to 10 GB'
                value={formData.transferLimit}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {error && <p className='text-red-600 font-medium mt-5'>{error}</p>}
          {status && <p className='text-[#00a875] font-medium mt-5'>{status}</p>}

          <button
            className='bg-[#00df9a] w-full rounded-md font-medium mt-8 py-3 text-black cursor-pointer disabled:opacity-60'
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Submit Trial Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TrialFormPage
