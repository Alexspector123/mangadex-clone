import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { FaBars } from "react-icons/fa6";
import Logo from './Logo';

const Navbar = ({ showSidebar, sidebar, scrollContainer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainer.current) {
        setIsScrolled(scrollContainer.current.scrollTop > 0);
      }
    };

    const container = scrollContainer.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainer]);

  const isMangaPage = /^\/titles\/[^/]+$/.test(location.pathname);
  const isChapPage = /^\/chapter\/[^/]+\/\d+$/.test(location.pathname);

  return (

    <div className={`${!isChapPage ? 'fixed' : ''} top-0 left-0 w-full z-50`}>
    <div className={`flex justify-center ${sidebar ? 'justify-end' : ''} items-center`}>
      <div className={`${!isChapPage ? 'fixed' : ''} top-0 ${sidebar ? 'w-[calc(100%-260px)]' : 'w-full min-[1448px]:w-[1440px]'} h-[60px] flex justify-between items-center px-6 text-black z-10 flex-shrink-0 transition-all duration-200 ${
        isScrolled ? 'bg-white' : 'bg-transparent'
        }`}>
        <div className="flex items-center text-2xl">
          {!sidebar && (
            <>
              <div><FaBars className={`filter transition-all duration-200 ${(isScrolled || !isMangaPage) ? 'invert sm:invert-0' : 'invert-0 sm:invert'} cursor-pointer`} onClick={showSidebar} /></div>
              <Logo isScrolled={isScrolled} applyFilter={!isMangaPage}/>
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
    </div>
  );
};

export default Navbar;
