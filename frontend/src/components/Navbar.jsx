import React from 'react'
import { CiSearch } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { FaBars } from "react-icons/fa6";
import Logo from './Logo';

const Navbar = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex justify-between items-center h-[56px] max-w-[1440px] w-[1440px] px-4 bg-white text-black relative shadow-sm font-mono' role='navigation'>
        <div className="flex items-center text-2xl">
            <Logo />
        </div>
        <div className="flex items-center max-w-4xl text-4xl relative">
          <div className='flex justify-center'>
            <input
            type="text"
            placeholder='Search'
            className= 'invisible md:text-[16px] w-[310px] visible h-8 bg-slate-100 rounded-[10px] px-4 py-1 placeholder-black'
            />
            <CiSearch className="invisible md:visible absolute right-15 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer " />
          </div>
            <CiSearch className='text-2xl cursor-pointer md:hidden'/>
            <RxAvatar className='ml-3' />
        </div>
      </div>
    </div>
  )
}

export default Navbar