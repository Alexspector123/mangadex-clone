import React from 'react'

export const InfoTag = ({label}) => {
  return (
    <a href="#">
        <span className='px-[8px] py-[5px] bg-slate-200 rounded-sm text-xs'>{label}</span>
    </a>
  )
}

export default InfoTag