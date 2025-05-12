import React, { useMemo } from 'react'

import { IoClose } from "react-icons/io5";

import ChapterItem from '../Chapter/ChapterItem';

import { useNavigate } from 'react-router-dom';

const ReadModal = ({ readModalRef, onClose, allChapters }) => {
    const navigate = useNavigate();
    const firstChapList = useMemo(() => {
        const list = allChapters.filter(
            chap => chap.chapter === "1"
        );
        if(list){
            return list;
        }
        return null;
    }, [allChapters]);
  return (
    <div>
        <div ref={readModalRef} className="sm:fixed sm:inset-0 sm:bg-black/50 sm:backdrop-blur-sm sm:z-20"></div>

        <div className="absolute
                        top-1/2 left-1/2 
                        transform -translate-x-1/2 -translate-y-1/2 
                        bg-white z-30
                        w-full sm:max-w-[726px] md:max-w-[800px] max-h-[calc(100%-3rem)]
                        rounded
                        shadow-lg
                        m-4 sm:mx-auto
                        flex flex-col">
           <div className='flex items-center justify-between
                            text-xl
                            px-6 py-4'>
                <div>Select Group</div>
                <IoClose onClick={onClose}/>
            </div>
           <div className='text-sm
                            px-6 pb-5
                            first:pt-4
                            space-y-1'>
            {firstChapList && (
                firstChapList.map(chap => (
                    <a
                    key={chap.id} 
                    href={`/chapter/${chap.id}/1`}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/chapter/${chap.id}/1`);
                    }}
                    >
                        <ChapterItem data={chap}/>
                    </a>
                ))
            )}
           </div>
          </div>
    </div>
  )
}

export default ReadModal