import { useParams, useNavigate } from 'react-router-dom';
import { dummyChapterData } from '../../mockData/mangaData';
import { useEffect, useState } from 'react';

const ChapterReader = () => {
  const { id, page } = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(page) || 1;

  const pages = dummyChapterData;

  const nextPage = () => {
    if (currentPage < pages.pages.length)
      navigate(`/chapter/${id}/${currentPage + 1}`);
  };

  const prevPage = () => {
    if (currentPage > 1)
      navigate(`/chapter/${id}/${currentPage - 1}`);
  };

  useEffect(() => {
    console.log('Page changed:', page);
  }, [page]);

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
        <div className='grid grid-cols-[1fr_541px_1fr] items-center justify-center h-full w-full m-h-[776px]'>
            <div 
            className='h-full cursor-pointer' 
            onClick={prevPage}
            role='button'
            ></div>
            <img
            src={pages.pages[currentPage - 1]}
            alt={`Page ${currentPage}`}
            />
            <div 
            className='h-full cursor-pointer' 
            onClick={nextPage}
            role='button'></div>
        </div>
        <div className='w-full py-3 px-5
                        flex flex-row justify-center items-center
                        border-t-1 border-t-gray-100'>
            <div>{currentPage}</div>
            <div className='h-5 bg-gray-200 w-full rounded-full mx-3'></div>
            <div>{pages.pages.length}</div>
        </div>
    </div>
  );
};

export default ChapterReader;
