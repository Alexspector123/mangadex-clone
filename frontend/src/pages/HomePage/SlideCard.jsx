import React from 'react'
import { useState, useEffect } from 'react'

const SlideCard = ({ mangaTitles, coverUrls, mangaAuthors, mangaDescriptions }) => {
    const creator = Array.isArray(mangaAuthors)
    ? mangaAuthors.map((a) => a.name).join(", ")
    : mangaAuthors;

  return (
    <div className='h-full relative flex gap-4'>
      <img className='flex items-start relative mb-auto w-full h-full aspect-[7/10] !h-[10rem] md:!h-full !w-auto object-top object-cover rounded sm:shadow-lg bg-transparent' src={ coverUrls } alt="" />
      <div className='mt-auto grid grid-rows-[auto_auto_1fr_auto] gap-6 sm:gap-2 h-full min-h-0'>
        <h3 className='font-poppins font-bold text-xl line-clamp-5 sm:line-clamp-2 lg:text-4xl overflow-hidden'>{ mangaTitles }</h3>
        {/*{mangaData.tag ? (
          <div className='flex h-6'>
            {mangaData.tag.map((tag, index) => (
              <span key={index} className='bg-slate-100 font-bold px-2 m-1 text-[10px] rounded-sm items-center'>{tag}</span>
            ))}
          </div>
        )
        : null}*/}
        {mangaDescriptions ? (
          <div className='text-sm flex-grow max-h-[200px] font-poppins scrollbar-hide hidden md:block overflow-auto'>
          {mangaDescriptions.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                  {line}
                  <br />
              </React.Fragment>
              ))}
          </div>
        ) : null}
          <div className='self-end'>{creator}</div>
      </div>
    </div>
  )
}

export default SlideCard