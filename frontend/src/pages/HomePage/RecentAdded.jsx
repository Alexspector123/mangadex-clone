import React from 'react'
import { useFetchChapters } from '../../hooks/chapter/useFetchChapters';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import { FiArrowRight } from "react-icons/fi";

import 'swiper/css';
import 'swiper/css/pagination';

const RecentAdded = () => {
    const { chapters, loading, error } = useFetchChapters(18, 'createdAt');
    const { mangaID, mangaTitle, coverUrl} = chapters || {};
    if (error) return <p>Error: {error}</p>;

    function sendData(index) {
        sessionStorage.setItem("coverUrl", coverUrl[index]);
        sessionStorage.setItem("mangaTitle", mangaTitle[index]);
    };
    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='my-4 z-2 min-[1448px]:text-4xl font-semibold sm:text-2xl text-xl font-spartan'>Recently Added</h2>
                <FiArrowRight className='z-2 min-[1448px]:text-4xl font-semibold sm:text-2xl text-xl font-spartan' />
            </div>
            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                loop={true}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
            {chapters.map((chap, index) => (
                <SwiperSlide key={chap.mangaID}>
                <a 
                    href={`/titles/${chap.mangaID}`} 
                    onClick={() => sendData(index)} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                    <img 
                    src={chap.coverUrl} 
                    alt={chap.mangaTitle} 
                    className="flex items-start h-full w-full aspect-[5/7] object-cover"
                    />
                    <div className="mb-6">
                    <h3 className="text-sm line-clamp-2">{chap.mangaTitle}</h3>
                    </div>
                </a>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    )
}

export default RecentAdded