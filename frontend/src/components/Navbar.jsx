import React from 'react';
import { CiSearch } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { FaBars } from "react-icons/fa6";
import Logo from './Logo';

const Navbar = ({ showSidebar }) => {
  return (
    <div className="top-0 w-full h-[56px] flex justify-between items-center px-4 bg-white text-black shadow-md z-10">
      <div className="flex items-center text-2xl">
        <FaBars className="cursor-pointer" onClick={showSidebar} />
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="md:w-72 h-8 bg-gray-100 rounded-lg px-4 py-1"
          />
          <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer" />
        </div>
        <RxAvatar className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
