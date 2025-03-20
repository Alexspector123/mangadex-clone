import React, { useRef } from 'react'
import { mangaData } from '../../mockData/mangaData.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideCard from './SlideCard.jsx';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HomePage = () => {
  const swiperRef = useRef();
  return (
    <div>
      <div className={`relative`}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="mySwiper relative"
      >
          {mangaData.map((mangaData) =>
            <SwiperSlide>
              <div className='relative'>
                <img 
                  className="object-cover object-[0%_25%] h-[440px] w-full" 
                  src= { mangaData.Cover }
                  alt="" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-white opacity-50 backdrop-blur-lg"></div>

                <div className="absolute bottom-0 left-0 right-0 h-[calc(100%-60px)] flex justify-center">
                  <div className='w-350'>
                    <h2 className='font-semibold sm:text-2xl text-xl font-spartan px-4'>Popular New Titles</h2>
                    <SlideCard mangaData={mangaData} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <div className="absolute bottom-5 right-5 flex gap-2 z-50">
          <button onClick={() => swiperRef.current?.slidePrev()} className="custom-prev w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">
            ❮
          </button>
          <button onClick={() => swiperRef.current?.slideNext()} className="custom-next w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">
            ❯
          </button>
        </div>
      </div>

      <div className="h-[500px]"></div>
    </div>
  )
}

export default HomePage