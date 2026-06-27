import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const[nav, setNav] = useState(false)
  const[isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('token')))
   
  const handleNav =() =>
    {
      setNav(!nav);
    };

  useEffect(() => {
    const updateAuthState = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('token')))
    }

    window.addEventListener('storage', updateAuthState)
    window.addEventListener('authChanged', updateAuthState)

    return () => {
      window.removeEventListener('storage', updateAuthState)
      window.removeEventListener('authChanged', updateAuthState)
    }
  }, [])

  const authLinks = isLoggedIn ? (
    <li className='p-4 flex items-center'>
      <Link to='/profile'>
        <FaUserCircle className='text-[#00df9a]' size={30} title='Profile' />
      </Link>
    </li>
  ) : (
    <>
      <li className='p-4'><Link to="/login">Login</Link></li>
      <li className='p-4'><Link className='bg-[#00df9a] text-black rounded-md px-4 py-2 font-medium' to="/signup">Signup</Link></li>
    </>
  )

  const mobileAuthLinks = isLoggedIn ? (
    <li className='p-4'>
      <Link onClick={() => setNav(false)} to='/profile'>
        <FaUserCircle className='text-[#00df9a]' size={30} title='Profile' />
      </Link>
    </li>
  ) : (
    <>
      <li className='p-4  border-b-gray-600'><Link onClick={() => setNav(false)} to="/login">Login</Link></li>
      <li className='p-4'><Link onClick={() => setNav(false)} to="/signup">Signup</Link></li>
    </>
  )

  return (
    <div className='text-white flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 '>
        <h1 className='w-full text-3xl text-[#00df9a]'>IQUEST.</h1>
        <ul className='hidden md:flex'>
            <li className='p-4'><a href="/#Home">Home</a></li>
            <li className='p-4'><a href="/#About">About</a></li>
            <li className='p-4'><a href="/#Company">Company</a></li>
            <li className='p-4'><a href="/#Cards">Resources</a></li>
            <li className='p-4'><a href="/#Footer">Contact</a></li>
            {authLinks}
            
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
          { nav ? <AiOutlineClose size={30} /> : <IoMenu size={30}/> }
          
        </div>
        <div className= {nav ? 'fixed left-0 top-0 w-[60%] h-full border-r ease-in-out duration-500 border-r-gray-900 bg-[#000300]' : 'fixed left-[-100%]'}>
          <h1 className='w-full text-3xl text-[#00df9a] m-4'>DEVANSH.</h1>
          <ul className='uppercase p-4'>
            <li className='p-4  border-b-gray-600'><a href="/#Home">Home</a></li>
            <li className='p-4  border-b-gray-600'><a href="/#About">About</a></li>
            <li className='p-4  border-b-gray-600'><a href="/#Company">Company</a></li>
            <li className='p-4  border-b-gray-600'><a href="/#Cards">Resources</a></li>
            <li className='p-4  border-b-gray-600'><a href="/#Footer">Contact</a></li>
            {mobileAuthLinks}
            
          </ul>
        </div>
    </div>
  )
} 

export default Navbar
