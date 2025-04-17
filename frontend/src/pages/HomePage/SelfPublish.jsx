import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFetchList } from '../../hooks/manga/useFetchList.jsx';

import { FiArrowRight } from "react-icons/fi";

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';

const SelfPublish = () => {
    const [limit, setLimit] = useState(15);
    const [order, setOrder] = useState({latestUploadedChapter: 'desc'});
    const [queryParams, setQueryParams] = useState(null);
    
    useEffect(() => {
        const params = new URLSearchParams();
        params.append('limit', limit);
        Object.keys(order).forEach((key) => {
          params.append(`order[${key}]`, order[key]);
        });
        params.append('includedTags[]', '891cf039-b895-47f0-9229-bef4c96eccd4');
        setQueryParams(params);
    }, [limit, order]);
    
    const { mangaData, error, isLoading } = useFetchList(queryParams);
    const { mangaIDs, mangaTitles, coverUrls, mangaAuthors, mangaDescriptions } = mangaData || {};
    if(error) {
        return <div>{error}</div>;
    }
    
    function sendData(index) {
        sessionStorage.setItem("coverUrl", coverUrls[index]);
        sessionStorage.setItem("mangaTitle", mangaTitles[index]);
        sessionStorage.setItem("mangaDescription", mangaDescriptions[index]);
        sessionStorage.setItem("mangaAuthor", mangaAuthors[index]);
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='my-4 z-2 min-[1448px]:text-4xl font-semibold sm:text-2xl text-xl font-spartan'>Self-Published</h2>
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
            {mangaIDs && mangaIDs.map((id, index) => (
                <SwiperSlide key={id}>
                <a 
                    href={`/titles?id=${id}`} 
                    onClick={() => sendData(index)} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                    <img 
                    src={coverUrls[index]} 
                    alt={mangaTitles[index]} 
                    className="flex items-start h-full w-full aspect-[5/7] object-cover"
                    />
                    <div className="mb-6">
                    <h3 className="text-sm line-clamp-2">{mangaTitles[index]}</h3>
                    </div>
                </a>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    )
}

export default SelfPublish;