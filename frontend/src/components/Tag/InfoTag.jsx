import React from 'react'

export const InfoTag = ({label}) => {
  return (
    <a href="#">
        <div className='px-[8px] py-[5px] bg-slate-200 rounded-sm text-xs inline-block'>{label}</div>
    </a>
  )
}

export default InfoTag