import React from 'react'
import { useNavigate } from 'react-router-dom'
import laptop from '../assests/laptop.jpg'
const Analytics = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      return
    }

    navigate('/start-trial')
  }

  return (
    <div id="About" className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
             <img className='w-[500px] mx-auto my-4' src={laptop} alt="/" /> 
             
        <div className='flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold'>DATA ANALYTICS DASHBOARD</p>
        <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Manage Data Analytics Centrally</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam dolores ex, cupiditate consequuntur nisi omnis quas modi odit quis quidem, suscipit delectus mollitia, nostrum dicta dolore perferendis laudantium quia reprehenderit.</p>
       <button onClick={handleGetStarted} className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 cursor-pointer'>Get Started</button>
      </div>
      </div>
     
    </div>
  )
}

export default Analytics
