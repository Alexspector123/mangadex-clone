import React, { useState, useEffect } from 'react';
import { useFetchChapters } from '../../hooks/chapter/useFetchChapters';

import { FiArrowRight } from "react-icons/fi";

const Latest = () => {
    const { chapters, loading, error } = useFetchChapters(18, 'readableAt');
    const { mangaID, mangaTitle, coverUrl} = chapters || {};

    if (error) return <p>Error: {error}</p>;

    function sendData(index) {
        sessionStorage.setItem("coverUrl", coverUrl[index]);
        sessionStorage.setItem("mangaTitle", mangaTitle[index]);
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='z-2 min-[1448px]:text-4xl font-semibold sm:text-2xl text-xl font-spartan'>Latest Updates</h2>
                <FiArrowRight className='z-2 min-[1448px]:text-4xl font-semibold sm:text-2xl text-xl font-spartan' />
            </div>

            <div className='grid gap-x-6 3xl:grid-cols-4 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1'>
                <div className='grid gap-4 p-4 bg-gray-100'>
                    {chapters.slice(0,6).map((chap, index) => (
                        <a href={`/titles/${chap.mangaID}`}>                        
                            <div 
                            className='flex gap-2' 
                            key={chap.mangaID}
                            id={chap.mangaID}
                            onClick={() => sendData(index)}
                            >
                                <div className='h-20 w-14 flex-shrink-0'>
                                    <img className='flex items-start relative mb-auto select-none w-full h-full' src={chap.coverUrl} alt={chap.title}/>
                                </div>
                                <div className='flex flex-grow flex-col justify-evenly'>
                                    <h6 className='text-base font-bold line-clamp-1 break-all'>{chap.mangaTitle}</h6>
                                    <p>Ch. {chap.chapter} {chap.volume ? `Vol. ${chap.volume}` : ''}</p>
                                    <p className='text-sm text-gray-600'>{chap.group} • {chap.language.toUpperCase()}</p>
                                    <p className='text-sm text-gray-500'>{chap.updatedAt}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className='grid gap-4 p-4 bg-gray-100'>
                    {chapters.slice(7,12).map((chap, index) => (
                        <a href={`/titles/${chap.mangaID}`}>                        
                            <div 
                            className='flex gap-2' 
                            key={chap.mangaID}
                            id={chap.mangaID}
                            onClick={() => sendData(index)}
                            >
                                <div className='h-20 w-14 flex-shrink-0'>
                                    <img className='flex items-start relative mb-auto select-none w-full h-full' src={chap.coverUrl} alt={chap.title}/>
                                </div>
                                <div className='flex flex-grow flex-col justify-evenly'>
                                    <h6 className='text-base font-bold line-clamp-1 break-all'>{chap.mangaTitle}</h6>
                                    <p>Ch. {chap.chapter} {chap.volume ? `Vol. ${chap.volume}` : ''}</p>
                                    <p className='text-sm text-gray-600'>{chap.group} • {chap.language.toUpperCase()}</p>
                                    <p className='text-sm text-gray-500'>{chap.updatedAt}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className='grid gap-4 p-4 bg-gray-100'>
                    {chapters.slice(13,18).map((chap, index) => (
                        <a href={`/titles/${chap.mangaID}`}>                        
                            <div 
                            className='flex gap-2' 
                            key={chap.mangaID}
                            id={chap.mangaID}
                            onClick={() => sendData(index)}
                            >
                                <div className='h-20 w-14 flex-shrink-0'>
                                    <img className='flex items-start relative mb-auto select-none w-full h-full' src={chap.coverUrl} alt={chap.title}/>
                                </div>
                                <div className='flex flex-grow flex-col justify-evenly'>
                                    <h6 className='text-base font-bold line-clamp-1 break-all'>{chap.mangaTitle}</h6>
                                    <p>Ch. {chap.chapter} {chap.volume ? `Vol. ${chap.volume}` : ''}</p>
                                    <div className='flex justify-between'>
                                        <div className='text-sm text-gray-600'>{chap.group}</div>
                                        <div className='text-sm text-gray-500'>{chap.updatedAt}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Latest