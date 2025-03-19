import React from 'react'
import { mangaData } from '../mockData/mangaData.js';

const HomePage = () => {
  return (
    <div>
      <div className="relative">
        <img 
          className="object-cover object-[0%_25%] h-[440px] w-full" 
          src= { mangaData[0].Cover }
          alt="" 
        />
        
        <div className="absolute inset-0 bg-white opacity-50 blur-lg"></div>

        <div className="absolute bottom-0 left-0 right-0 h-[calc(100%-60px)] flex justify-center">
          <div className='w-350'>
            <h2 className='font-semibold sm:text-2xl text-xl font-spartan px-4'>Popular New Titles</h2>
            <div className='p-4 mt-auto w-full mx-auto flex gap-2 md:h-[77%] h[70%] xl:max-w-[1440px]'>
              <img className='min-h-[160px] h-72' src={ mangaData[0].Cover } alt="" />
              <div className='h-full mt-auto flex gap-6'>
                <h3 className='font-poppins font-bold text-4xl'>{ mangaData[0].Name }</h3>

              </div>
            </div>
          </div>
        </div>
      </div>




      <div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  )
}

export default HomePage