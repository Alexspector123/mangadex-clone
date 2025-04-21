import React from 'react'
import { IoExpandSharp } from "react-icons/io5"

const Cover = ({ cover, onClick }) => {

  return (
    <div onClick={onClick} className='relative group w-full'>
        <img className="h-auto w-full rounded shadow-md" src={cover} alt="" />
        
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
        <IoExpandSharp className="text-white text-5xl" />
      </div>
    </div>
  )
}

export default Cover