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
    <div className='p-4 mt-auto w-full mx-auto flex gap-3 h-[85%] xl:max-w-[1440px]'>
    <img className='min-h-[160px] h-[112px] rounded-sm md:h-72' src={ mangaData.Cover } alt="" />
    <div className='h-full mt-auto flex flex-col gap-2'>
      <h3 className='font-poppins font-bold text-[20px] h-25 xl:text-4xl md:h-auto'>{ mangaData.Name }</h3>
      {mangaData.tag ? (
        <div>
          {mangaData.tag.map((tag, index) => (
            <span key={index} className='bg-slate-100 font-bold px-2 m-1 text-[10px] rounded-sm items-center'>{tag}</span>
          ))}
        </div>
      )
      : null}
      {mangaData.Description ? (
        <div className='text-sm font-poppins h-[200px] hidden md:block overflow-auto scrollbar-hide'>
        {mangaData.Description.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
            ))}
        </div>
      ) : null}
        <span>{creator.join(", ")}</span>
    </div>
  </div>
  )
}

export default SlideCard