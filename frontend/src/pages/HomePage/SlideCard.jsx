import React from 'react'
import { useState, useEffect } from 'react'

const SlideCard = ({ mangaData }) => {
    const [creator, setCreator] = useState([]);

    useEffect(() => {
        const combinedCreators = [...mangaData.Author];
        mangaData.Artist.forEach((artist) => {
          if (!mangaData.Author.includes(artist)) {
            combinedCreators.push(artist);
          }
        });
        setCreator(combinedCreators);
      }, [mangaData]);

  return (
    <div className='h-full relative flex gap-4'>
      <img className='flex items-start relative mb-auto w-full h-full aspect-[7/10] !h-[10rem] md:!h-full !w-auto object-top object-cover rounded sm:shadow-lg bg-transparent' src={ mangaData.Cover } alt="" />
      <div className='mt-auto grid grid-rows-[auto_auto_1fr_auto] gap-6 sm:gap-2 h-full min-h-0'>
        <h3 className='font-poppins font-bold text-xl line-clamp-5 sm:line-clamp-2 lg:text-4xl overflow-hidden'>{ mangaData.Name }</h3>
        {mangaData.tag ? (
          <div className='flex h-6'>
            {mangaData.tag.map((tag, index) => (
              <span key={index} className='bg-slate-100 font-bold px-2 m-1 text-[10px] rounded-sm items-center'>{tag}</span>
            ))}
          </div>
        )
        : null}
        {mangaData.Description ? (
          <div className='text-sm flex-grow max-h-[200px] font-poppins hidden md:block overflow-auto scrollbar-hide'>
          {mangaData.Description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                  {line}
                  <br />
              </React.Fragment>
              ))}
          </div>
        ) : null}
          <div className='self-end'>{creator.join(", ")}</div>
      </div>
    </div>
  )
}

export default SlideCard