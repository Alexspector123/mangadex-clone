import React, { useRef } from 'react'
import { mangaData } from '../../mockData/mangaData.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideCard from './SlideCard.jsx';
import { Autoplay, Navigation } from 'swiper/modules';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import 'swiper/css';
import 'swiper/css/navigation';

const HomePage = () => {
  const swiperRef = useRef();
  return (
    <div>
      <div className='relative h-[324px] md:h-[440px]'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay, Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="mySwiper"
        >
          {mangaData.map((mangaData, index) =>
            <SwiperSlide key={index}>
              <div className='relative'>
                <img
                  className="object-cover object-[0%_25%] h-80 md:h-[400px] xl:h-[440px] w-full"
                  src= { mangaData.Cover }
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 h-full flex justify-center md:items-center">
                  <div className='p-4 mb-6 md:mb-0 md:py-4 md:px-4 grid grid-rows-[1fr_1rem] md:grid-rows-1 gap-2 md:h-[77%] sm:h-[65%] h-[70%] mt-auto xl:max-w-[1440px] w-full mx-auto'>
                    <SlideCard mangaData={mangaData} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <div className=''>

        <div className="absolute bottom-0 right-5 left-5 flex justify-between gap-5 text-xl z-10 md:justify-normal md:left-auto md:bottom-14 lg:text-2xl lg:bottom-4">
          <IoIosArrowBack className='cursor-pointer transition-all duration-200 w-8 h-8 p-1 hover:bg-slate-300 hover:rounded-full' onClick={() => swiperRef.current?.slidePrev()} />
          <IoIosArrowForward className='cursor-pointer transition-all duration-200 w-8 h-8 p-1 hover:bg-slate-300 hover:rounded-full' onClick={() => swiperRef.current?.slideNext()} />
        </div>
        <h2 className='absolute top-13 sm:top-15 left-1 z-10 min-[1448px]:left-10 min-[1448px]:text-4xl font-semibold sm:text-2xl text-xl font-spartan px-4'>Popular New Titles</h2>
        </div>
      </div>

      <div className="p-4 my-8 min-[1448px]:mx-auto">
        <div>
          <h2>Lastest Updates</h2>
        </div>
      </div>
    </div>
  )
}

export default HomePage