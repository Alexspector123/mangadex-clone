import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { SideBarData } from './SideBarData';
import Logo from './Logo';

const SideBar = ({ closeSidebar }) => {
  return (
    <div className='flex w-65 bg-gray-200 fixed h-full'>
        <div className='bg-gray-200 w-80'>
          <div className='flex items-center px-1 py-3'>
            <Logo />
            <div className='flex text-2xl ml-10 cursor-pointer'>
              <IoMdClose onClick={closeSidebar}/>
            </div>
          </div>
          {
            SideBarData.map((item, index) => (
              item.type === 'title' ? (
                <div
                key={index}
                className='flex items-center px-2.5 py-1 gap-[15px]'>
                  <div className='text-[20px]'>{item.icon ? item.icon : ""}</div>
                  <div className='text-[17px] font-bold'>{item.name}</div>
                </div>
              ) : (
              <NavLink 
                to={item.path}
                key={index}
                end
                className={({isActive}) => ` flex items-center px-2.5 py-1 gap-[15px] hover:bg-gray-300 hover:transition-all hover:duration-300 ${isActive ? 'bg-[#FF6740] text-white hover:bg-orange-700' : ''}`}>
                  <div className='text-[20px]'>{item.icon ? item.icon : ""}</div>
                  <div className={`text-[17px] ${item.icon ? 'font-bold' : ''}`}>{item.name}</div>
              </NavLink>
              )
            )
            )
          }
        </div>
    </div>
  )
}

export default SideBar