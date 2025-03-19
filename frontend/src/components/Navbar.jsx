import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { FaBars } from "react-icons/fa6";
import Logo from './Logo';

const Navbar = ({ showSidebar, sidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
  
    handleScroll();
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

    <div className='flex justify-center items-center'>
      <div className={`fixed top-0 ${sidebar ? 'w-[calc(100%-260px)]' : 'w-350'} h-[60px] flex justify-between items-center px-4 text-black z-10 flex-shrink-0 transition-all duration-200 ${
        isScrolled ? 'bg-white' : 'bg-transparent'
        }`}>
        <div className="flex items-center text-2xl">
          {!sidebar && (
            <>
              <div><FaBars className={`filter transition-all duration-200 ${isScrolled ? 'invert-0' : 'invert'} cursor-pointer`} onClick={showSidebar} /></div>
              <Logo isScrolled={isScrolled} applyFilter={true}/>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">

          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="md:w-72 h-8 bg-slate-100 rounded-lg px-4 py-1 text-[17px] transition-all duration-200 focus:w-170 "
            />
            <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer " />
          </div>

          <div className="md:hidden flex justify-center items-center bg-slate-300 h-8 w-8 rounded-xl">
            <CiSearch className="text-2xl cursor-pointer"/>
          </div>
            <div className='bg-slate-300 h-10 w-10 flex justify-center items-center rounded-full'><FiUser className="text-4xl cursor-pointer" /></div>
        </div>
      </div>      

    </div>

    
  );
};

export default Navbar;
