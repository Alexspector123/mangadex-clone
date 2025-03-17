import React from 'react';
import { FiHome } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import Logo from './Logo';

const SideBar = ({ closeSidebar }) => {
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FiHome />,
      type: "link"
    },
    {
      path: "/",
      name: "Titles",
      icon: <FaRegBookmark />,
      type: "title"
    },
    {
      path: "/titles",
      name: "Advanced Search",
      type: "link"
    },
    {
      path: "/titles/recent",
      name: "Recently Added",
      type: "link"
    },
    {
      path: "/titles/lastest",
      name: "Lastest Updates",
      type: "link"
    },
    {
      path: "/titles/random",
      name: "Random",
      type: "link"
    }
  ]
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
            menuItem.map((item, index) => (
              item.type === 'title' ? (
                <div
                key={index}
                className='flex items-center px-2.5 py-1 gap-[15px] transition-all duration-500 hover:bg-gray-300'>
                  <div className='text-[20px]'>{item.icon ? item.icon : ""}</div>
                  <div className='text-[17px] font-bold'>{item.name}</div>
                </div>
              ) : (
              <NavLink 
                to={item.path}
                key={index} 
                activeclassName= 'bg-gray-300'
                className='flex items-center px-2.5 py-1 gap-[15px] transition-all duration-500 hover:bg-gray-300'>
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