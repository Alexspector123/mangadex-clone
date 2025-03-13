import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import logo from "../assets/mangadex-logo.svg";
import wordmark from "../assets/mangadex-wordmark.svg";

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono' role='navigation'>
        <div className="text-3xl">
            <FaBars />
        </div>
        <div className=''>
            <img src={logo} alt="logo" />
            <img src={wordmark} alt="wordmark" />
        </div>
        <div className="text-3xl">
            <CiSearch />
            <RxAvatar />
        </div>
    </nav>
  )
}

export default Navbar