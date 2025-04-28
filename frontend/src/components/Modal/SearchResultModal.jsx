import React, { useRef, useEffect } from 'react'

import { FiArrowRight } from "react-icons/fi";

import SearchMangaItem from '../Search/SearchMangaItem';
import SearchAuthorItem from '../Search/SearchAuthorItem';

const SearchResultModal = ({ results, isInput, modalRef }) => {
    return (
        <>
          <div 
          ref={modalRef} className="md:fixed md:inset-0 md:bg-black/50 md:backdrop-blur-sm md:z-10"></div>

          <div
          className="absolute
                        top-16 md:top-full right-0 left-0 md:right-auto md:left-auto
                        mt-2
                        bg-white z-50 
                        w-full max-h-[90vh]
                        overflow-y-auto
                        rounded-b-lg
                        shadow-lg
                        p-4 pb-8">
            {isInput ? (
                <div>
                    {/*Manga search*/} 
                    <div>
                        {results.manga?.length > 0 && (
                            <div className='mb-4'>
                                <div className='flex justify-between items-center mb-4'>
                                    <h3 className='font-bold text-lg font-spartan
                                                    '>Manga</h3>
                                    <FiArrowRight className='font-bold text-lg cursor-pointer'/>
                                </div>
                                
                                <div className='flex flex-col gap-3'>
                                    {results.manga.slice(0,5).map((manga) => (
                                        <SearchMangaItem data={manga} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/*Group search*/} 
                    <div>
                        {results.group?.length > 0 && (
                            <div className='mb-4'>
                                <div className='flex justify-between items-center mb-4'>
                                    <h3 className='font-bold text-lg font-spartan
                                                    '>Group</h3>
                                    <FiArrowRight className='font-bold text-lg cursor-pointer'/>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    {results.group.slice(0,5).map((group) => (
                                        <a href={``}>
                                            {group.attributes?.name || "No name"}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/*Author search*/} 
                    <div>
                        {results.author?.length > 0 && (
                            <div className='mb-4'>
                                <div className='flex justify-between items-center mb-4'>
                                    <h3 className='font-bold text-lg font-spartan
                                                    '>Author</h3>
                                    <FiArrowRight className='font-bold text-lg cursor-pointer'/>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    {results.author.slice(0,5).map((author) => (
                                        <SearchAuthorItem data={author} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            ) : (
              <p className="text-gray-500">Please enter a search term.</p>
            )}
          </div>
        </>
      )
}

export default SearchResultModal