import React from 'react'

export const Tag = ({label}) => {
  return (
    <a href="#">
        <span className='bg-slate-100 font-bold px-2 m-1 text-[10px] rounded-sm items-center'>{label}</span>
    </a>
  )
}

export default Tag