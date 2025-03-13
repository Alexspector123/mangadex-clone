import React from 'react';
import { FiHome } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import Logo from './Logo';

const SideBar = ({ children }) => {
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FiHome />,
    },
    {
      path: "/titles",
      name: "Advanced Search",
    },
    {
      path: "/recent",
      name: "Recently Added",
    },
    {
      path: "/lastest",
      name: "Lastest Updates",
    },
    {
      path: "/random",
      name: "Random",
    }
  ]
  return (
    <div className='flex'>
        <div className='bg-gray-200 w-80'>
          <div className='flex items-center px-1 py-3'>
            <Logo />
            <div className='flex text-2xl ml-20 cursor-pointer'>
              <IoMdClose />
            </div>
          </div>
          {
            menuItem.map((item, index) => (
              <NavLink 
              to={item.path} 
              key={index} 
              activeclassName= 'bg-gray-300'
              className={`flex items-center px-2.5 py-1 gap-[15px] transition-all duration-500 hover:bg-gray-300`}>
                <div className='text-[20px]'>{item.icon ? item.icon : ""}</div>
                <div className='text-[20px]'>{item.name}</div>
              </NavLink>
              )
            )
          }
        </div>
        <main className='w-full p-5'>{children}</main>
    </div>
  )
}

export default SideBar