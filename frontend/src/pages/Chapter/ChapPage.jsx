import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useFetchChapterReader from '../../hooks/chapter/useFetchChapterReader';
import useFetchChapterbyID from '../../hooks/chapter/useFetchChapterID';
import useChapterList from '../../hooks/chapter/useChapterList';

import { useOutletContext } from 'react-router-dom';

import { RiGroupLine } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaAlignRight } from "react-icons/fa";


const ChapPage = () => {
  const { id, page } = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(page) || 1;

  const { showSidebar = () => {}, showHeader = true } = useOutletContext() || {};

  const { chapterReaderData, isLoading, error } = useFetchChapterReader(id);
  const { chapterData, isLoading: isChapterLoading, error: isChapterError } = useFetchChapterbyID(id);

  const mangaID = chapterData?.mangaID;
  const { allChapters, isLoading: isAllChaptersLoading, error: isVolumeLoading } = useChapterList(mangaID);
  
  if (error) return <div>Error ChapterReading: {error}</div>;
  if (isChapterError) return <div>Error ChapterReading: {isChapterError}</div>;

    const nextChapter = useMemo(() => {
      if (!Array.isArray(allChapters) || !chapterData) return null;
      const sameGroupAndLanguage = allChapters.filter(
        chap => chap.group === chapterData.groupName && chap.translatedLanguage === chapterData.translatedLanguage
      );

      if (sameGroupAndLanguage) {
        return sameGroupAndLanguage.find(chap => parseFloat(chap.chapter) === parseFloat(chapterData.chapterNo) + 1);
      }
    
      const sameLanguage = allChapters.filter(
        chap => chap.translatedLanguage === chapterData.translatedLanguage
      );
    
      if (sameLanguage) {
        return sameLanguage.find(chap => parseFloat(chap.chapter) === parseFloat(chapterData.chapterNo) + 1);
      }
    
      return null;
    }, [allChapters, chapterData]);

    const prevChapter = useMemo(() => {
      if (!Array.isArray(allChapters) || !chapterData) return null;
      const sameGroupAndLanguage = allChapters.filter(
        chap => chap.group === chapterData.groupName && chap.translatedLanguage === chapterData.translatedLanguage
      );
    
      if (sameGroupAndLanguage) {
        return sameGroupAndLanguage.find(chap => parseFloat(chap.chapter) === parseFloat(chapterData.chapterNo) - 1);
      }
    
      const sameLanguage = allChapters.filter(
        chap => chap.translatedLanguage === chapterData.translatedLanguage
      );
    
      if (sameLanguage) {
        return sameLanguage.find(chap => parseFloat(chap.chapter) === parseFloat(chapterData.chapterNo) - 1);
      }
    
      return null;
    }, [allChapters, chapterData]);

  const nextPage = () => {
    if (currentPage < chapterReaderData.length)
      navigate(`/chapter/${id}/${currentPage + 1}`, { replace: true });
    else if(nextChapter === null){
        navigate(`/titles/${chapterData.mangaID}`);
      } else {
        navigate(`/chapter/${nextChapter.id}/1`, { replace: true });
      }
  };

  const prevPage = () => {
    if (currentPage > 1)
      navigate(`/chapter/${id}/${currentPage - 1}`, { replace: true });
    else
      if(prevChapter === null){
        navigate(`/titles/${chapterData.mangaID}`);
      } else {
        navigate(`/chapter/${prevChapter.id}/1`, { replace: true });
      }
  };

  return (
    <>
    {!isChapterLoading && (
      <div className="flex flex-col items-center justify-center relative">

        {showHeader && (
          <div className='p-4 
                w-full 
                border-b-1 border-b-gray-100
                flex flex-col gap-1'>
          <div className='text-[18px]'>{chapterData.Title === null ? (chapterData.chapterNo === null ? 'Oneshot' : `Chapter ${chapterData.chapterNo}`) : chapterData.Title}</div>
          <a 
          className='text-base text-orange-500 font-semibold
                cursor-pointer' 
          onClick={() => navigate(`/titles/${chapterData.mangaID}`)}
          >
          {chapterData.mangaTitle}</a>
          <div className='flex flex-row justify-between items-center gap-2
                    text-base'>
          <div className='bg-gray-100 flex-grow text-center p-0.5'>Ch. {chapterData.chapterNo}</div>
          <div className='bg-gray-100 flex-grow text-center p-0.5'>Pg. {currentPage}/{chapterReaderData.length}</div>
          <div 
          className='bg-gray-100 flex-grow 
                    flex
                    items-center
                    justify-center
                    text-center p-0.5 
                    cursor-pointer'
          onClick={showSidebar}>Menu<MdKeyboardArrowLeft className=''/></div>
          </div>
          <div className='h-6
                    text-base
                    flex items-center gap-2'>
          <RiGroupLine />
          <div>{chapterData.groupName}</div>
          </div>
          </div>
        )}


        <div className="grid grid-cols-[1fr_auto_1fr] items-center justify-center h-[776px] w-full relative">
        {!showHeader && (
          <FaAlignRight 
          className='absolute top-4 right-7
                      text-xl
                      text-slate-200 hover:text-slate-600
                      transition-all duration-200
                      cursor-pointer'
          onClick={showSidebar}/>
        )}
        <div
          className="h-full cursor-pointer overflow-hidden"
          onClick={prevPage}
          role="button"
        ></div>

        <div className="h-full flex items-center justify-center overflow-hidden">
          <img
            src={chapterReaderData[currentPage - 1]}
            alt={`Page ${currentPage}`}
            className="h-full max-w-full object-contain"
          />
        </div>

        <div
          className="h-full cursor-pointer overflow-hidden"
          onClick={nextPage}
          role="button"
          >
        </div>
        </div>

        <div className='w-full 
                        py-3 px-5 
                        flex flex-col items-center
                        h-2
                        absolute bottom-0'>
          <div className='flex items-center 
                          w-full'>
            <div className='hidden hover:block'>{currentPage}</div>
          <div className='flex flex-row gap-0.5
                          w-full h-1
                          mx-3
                          rounded-full 
                          overflow-hidden'>
            {chapterReaderData.map((_, index) => (
              <div
                key={index}
                onClick={() => navigate(`/chapter/${id}/${index+1}`)}
                className={`h-full transition-all duration-300 cursor-pointer ${
                  index <= currentPage - 1 ? 'bg-orange-500' : 'bg-gray-200'
                }`}
                style={{ width: `${100 / chapterReaderData.length}%` }}
              />
            ))}
          </div>
            <div className='hidden hover:block'>{chapterReaderData.length}</div>
          </div>
        </div>
      </div>
    )}</>

  );
};

export default ChapPage;
