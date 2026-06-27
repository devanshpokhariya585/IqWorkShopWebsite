import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaPhoneAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load profile')
        }

        setUser(data.user)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('authChanged'))
    navigate('/')
  }

  return (
    <div className='text-white min-h-[calc(100vh-96px)] px-4 py-16 flex items-center'>
      <div className='max-w-[800px] mx-auto w-full'>
        <p className='text-[#00df9a] font-bold p-2 text-center'>YOUR PROFILE</p>
        <div className='bg-white text-black rounded-lg shadow-xl p-6 sm:p-8'>
          {loading && <p className='text-center font-medium text-gray-500'>Loading profile...</p>}
          {error && <p className='text-center font-medium text-red-600'>{error}</p>}
          {user && (
            <>
              <div className='flex flex-col items-center text-center border-b pb-8'>
                <FaUserCircle className='text-[#00df9a]' size={78} />
                <h1 className='text-3xl font-bold mt-4'>{user.name}</h1>
                <p className='text-gray-500 font-medium mt-2'>Iquest account</p>
              </div>

              <div className='grid gap-4 mt-8 font-medium'>
                <div className='flex items-center gap-3 border border-gray-200 rounded-md p-4'>
                  <FaEnvelope className='text-[#00df9a]' />
                  <span>{user.email}</span>
                </div>
                <div className='flex items-center gap-3 border border-gray-200 rounded-md p-4'>
                  <FaPhoneAlt className='text-[#00df9a]' />
                  <span>{user.mobile}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className='bg-black text-[#00df9a] w-full rounded-md font-medium mt-8 py-3 cursor-pointer flex items-center justify-center gap-2'
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
