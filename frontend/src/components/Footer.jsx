import React from 'react'
import
{
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from 'react-icons/fa'
const Footer = () => {
  return (
    <div id ="Footer" className='text-gray-300 max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 '>
       <div>
          <h1 className='w-full text-3xl text-[#00df9a]'>IQUEST.</h1>
          <p className='py-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed tempora distinctio voluptatum natus commodi odit eum ratione nisi explicabo beatae dolorum molestias iure, doloremque suscipit consectetur minima harum temporibus doloribus?</p>
          <div className='flex justify-between md:w-[75%] my-6'>
            <a href="">< FaDribbbleSquare  size={30} className='hover:text-[#00df9a] transition-colors'/></a> 
            <a href="">< FaFacebookSquare  size={30}  className='hover:text-[#00df9a] transition-colors'/> </a>
            <a href="">< FaGithubSquare  size={30} className='hover:text-[#00df9a] transition-colors'/></a>
            <a href="">< FaInstagramSquare  size={30} className='hover:text-[#00df9a] transition-colors'/></a>
            <a href="">< FaTwitterSquare  size={30} className='hover:text-[#00df9a] transition-colors'/></a>
          </div>
       </div>
       <div className='lg:col-span-2 flex justify-between mt-6'>
        <div>
        <h6 className='font-medium text-gray-400'>Solutions</h6>
        <ul>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="#">Analytics</a></li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">Marketing</a></li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">commerce</a></li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">Insights</a></li>
        </ul>
       
       
       </div>

       <div>
        <h6 className='font-medium text-gray-400'>Support</h6>
        <ul>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">Pricing</a></li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">Documentatio</a>n</li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">Guides</a></li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">API Status</a></li>
        </ul>
       </div>

       <div>
        <h6 className='font-medium text-gray-400'>Company</h6>
        <ul>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">About</a></li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">Blog</a></li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">Job</a>s</li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">Press</a></li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">Carrers</a></li>


        </ul>
       </div>
        <div>
        <h6 className='font-medium text-gray-400'>Legal</h6>
        <ul>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors '><a href="">Claims</a></li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors'><a href="">Policy</a></li>
          <li className='py-2 text-sm hover:text-[#00df9a] transition-colors'><a href="">Terms</a></li>
          <a href=""></a>

        </ul>
       </div>
       </div>
    </div>
  )
}

export default Footer
