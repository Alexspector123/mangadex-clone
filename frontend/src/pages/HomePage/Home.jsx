import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFetchList } from '../../hooks/manga/useFetchList.jsx';
import SlideCard from './SlideCard.jsx';
import { Autoplay, Navigation } from 'swiper/modules';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import 'swiper/css';
import 'swiper/css/navigation';

const Home = () => {
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState({followedCount: 'desc'});
  const [queryParams, setQueryParams] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('limit', limit);
    Object.keys(order).forEach((key) => {
      params.append(`order[${key}]`, order[key]);
    });
    setQueryParams(params);
  }, [limit, order]);

  const { mangaData, error, isLoading } = useFetchList(queryParams);
  const { mangaIDs, mangaTitles, coverUrls, mangaAuthors, mangaDescriptions, tags} = mangaData || {};
  if(error) {
    return <div>{error}</div>;
  }

  function sendData(index) {
    sessionStorage.setItem("coverUrl", coverUrls[index]);
    sessionStorage.setItem("mangaTitle", mangaTitles[index]);
    sessionStorage.setItem("mangaDescription", mangaDescriptions[index]);
    sessionStorage.setItem("mangaAuthor", mangaAuthors[index]);
    sessionStorage.setItem("tags", tags[index]);
  };

  const swiperRef = useRef();
  return (
    <div className='relative h-[324px] md:h-[440px]'>
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      loop={coverUrls?.length > 1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay, Navigation]}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="mySwiper"
    >
      {coverUrls?.map((url, index) =>
        <SwiperSlide key={index} onClick={() => sendData(index)}>
          <a href={`/titles/${mangaIDs[index]}`}>
          <div className='relative'>
            <img
              className="object-cover object-[0%_25%] h-80 md:h-[400px] xl:h-[440px] w-full"
              src= {coverUrls[index]}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 h-full flex justify-center md:items-center">
              <div className='p-4 mb-6 md:mb-0 md:py-4 md:px-6 grid grid-rows-[1fr_1rem] md:grid-rows-1 gap-2 md:h-[77%] sm:h-[65%] h-[70%] mt-auto xl:max-w-[1440px] w-full mx-auto'>
                <SlideCard mangaAuthors={mangaAuthors[index]} tags={tags[index]} mangaTitles={mangaTitles[index]} mangaDescriptions={mangaDescriptions[index]} coverUrls={coverUrls[index]}/>
              </div>
            </div>
          </div>
          </a>
        </SwiperSlide>
      )}
    </Swiper>
    <div className="absolute bottom-0 right-5 left-5 flex justify-between gap-5 text-xl z-10 md:justify-normal md:left-auto md:bottom-14 lg:text-2xl lg:bottom-4">
      <IoIosArrowBack className='cursor-pointer transition-all duration-200 w-8 h-8 p-1 hover:bg-slate-300 hover:rounded-full' onClick={() => swiperRef.current?.slidePrev()} />
      <IoIosArrowForward className='cursor-pointer transition-all duration-200 w-8 h-8 p-1 hover:bg-slate-300 hover:rounded-full' onClick={() => swiperRef.current?.slideNext()} />
    </div>
    <h2 className='absolute top-13 sm:top-15 left-1 z-2 min-[1448px]:left-10 min-[1448px]:text-4xl font-semibold sm:text-2xl text-xl font-spartan px-6'>Popular New Titles</h2>
  </div>
  )
}

export default Home