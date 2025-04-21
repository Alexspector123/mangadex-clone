import React from 'react'

export const Tag = ({label}) => {
  return (
    <a href="#">
        <div className='bg-slate-100 font-bold px-2 m-1 text-[12px] rounded-sm items-center inline-block mb-2'>{label}</div>
    </a>
  )
}

export default Tag