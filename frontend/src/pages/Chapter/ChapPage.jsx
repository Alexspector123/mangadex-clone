import { useParams, useNavigate } from 'react-router-dom';
import useFetchChapterReader from '../../hooks/chapter/useFetchChapterReader';
import { useEffect, useState } from 'react';

const ChapterReader = () => {
  const { id, page } = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(page) || 1;

  const { chapterReaderData, isLoading, error } = useFetchChapterReader(id);
  
  if (error) return <div>Error: {error}</div>;

  const nextPage = () => {
    if (currentPage < chapterReaderData.length)
      navigate(`/chapter/${id}/${currentPage + 1}`, { replace: true });
  };

  const prevPage = () => {
    if (currentPage > 1)
      navigate(`/chapter/${id}/${currentPage - 1}`, { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      
        <div className='p-4 
                        w-full 
                        border-b-1 border-b-gray-100
                        flex flex-col gap-0.5'>
            <div className='text-[18px]'>Encouter</div>
            <a className='text-[16px] text-orange-500 font-semibold' href="">Kara no Kioku</a>
            <div className='flex flex-row justify-between items-center gap-2
                            text-base'>
                <div className='bg-gray-100 flex-grow text-center p-0.5'>Ch .44</div>
                <div className='bg-gray-100 flex-grow text-center p-0.5'>Pg. 2/8</div>
                <div className='bg-gray-100 flex-grow text-center p-0.5'>Menu</div>
            </div>
            <div className='h-6'>No Group</div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center justify-center h-[776px] w-full">
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

        <div className='w-full py-3 px-5 flex flex-col items-center border-t border-t-gray-100'>
        <div className='flex items-center w-full'>
          <div>{currentPage}</div>
          <div className='flex flex-row w-full mx-3 h-5 rounded-full overflow-hidden'>
            {chapterReaderData.map((_, index) => (
              <div
                key={index}
                className={`h-full transition-all duration-300 ${
                  index <= currentPage - 1 ? 'bg-indigo-500' : 'bg-gray-200'
                }`}
                style={{ width: `${100 / chapterReaderData.length}%` }}
              />
            ))}
          </div>
          <div>{chapterReaderData.length}</div>
        </div>
      </div>
    </div>
  );
};

export default ChapterReader;
