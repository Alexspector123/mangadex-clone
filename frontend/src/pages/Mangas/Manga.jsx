import React from "react";
import { mangaData } from '../../mockData/mangaData.js';
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { RiPlayListAddLine } from "react-icons/ri";
import { LuFlag } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";

const Manga = () => {
  const data = mangaData[0];

  return (
    <div className="flex min-w-0">

      <div className="flex-grow relative">
        <div className="absolute inset-0 h-60 sm:h-70 md:h-[280px] w-full">
          <img
            className="object-cover object-[0%_25%] h-full w-full"
            src= { data.Cover }
            />
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-t before:from-white before:to-white/80 sm:before:hidden sm:bg-black/50 sm:backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 px-6 mt-[68px] mb-auto">
          <div className="mx-auto grid grid-flow-row-dense
                          grid-cols-[30px_100px_1fr_30px] sm:grid-cols-[30px_200px_1fr_30px]
                          items-start gap-4">
            <div className="col-start-2 row-span-2 flex items-start relative mb-auto select-none sm:row-span-4">
              {/*<div className="flex items-center justify-center inset-0 absolute"></div>         For hover expand*/}
              <img className="h-auto w-full rounded shadow-md" src={data.Cover} alt="" />
            </div>
            <div className="col-start-3
                            flex flex-col 
                          text-black sm:text-white
                            sm:h-[210px]">
              <p className="mb-1
                            leading-[1.1em] wrap-break-word text-shadow-[1px_2px_4px_rgb(0_0_0_/_0.3)] 
                            font-bold font-poppins 
                            md:max-w-[682px] xl:max-w-[860px]
                            max-[610px]:text-base text-xl sm:text-2xl md:text-3xl xl:text-[40px]">{data.Name}</p>
              <div className="line-clamp-2 font-normal inline-block
                              leading-5 sm:leading-6
                              text-base sm:text-2xl xl:text-xl">{data.Name}</div>
              <div className="grow hidden sm:block"></div>
              <div className="flex flex-row gap-2">
                <div className="font-normal text-xs sm:text-lg truncate">{data.Author}</div>
              </div>
            </div>
            <div class="col-start-3 col-span-full sm:col-span-1 sm:col-start-3 sm:row-start-3">
              {Array.isArray(data.tag) ? data.tag.map((tag, index) => (
                <span key={index} className='bg-slate-100 font-bold px-2 m-1 text-[10px] rounded-sm items-center'>{tag}</span>
              )) : <span key={index} className='bg-slate-100 font-bold px-2 m-1 text-[10px] rounded-sm items-center'>{tags}</span>}
            </div>
            <div className="col-start-3 hidden sm:block"></div>
            <div class="col-start-3 min-h-[100px] rounded-lg bg-teal-500 shadow">Statistic</div>
            <div class="col-start-2 col-span-full
                        sm:col-span-1 sm:col-start-3 sm:row-start-2
                        flex gap-2 justify-between items-center sm:justify-normal">

              {/*Add to library*/}
              <button className="bg-orange-500 text-white 
                                  block sm:hidden
                                  px-2.5 py-2.5 rounded
                                  w-[40px]
                                  text-xl"><FaRegBookmark /></button>
              <button className="bg-orange-500 text-white 
                                  hidden sm:block
                                  px-12 py-3 rounded
                                  w-[220px] h-[48px]
                                  font-semibold text-base">Add To Library</button>

              {/*Favourite*/}
              <button className=" bg-slate-100
                                  px-2.5 py-2.5 rounded sm:px-3.5 sm:py-3.5
                                  w-[40px] sm:w-[48px]
                                  text-xl sm:text-[20px]"><FaRegStar  /></button>

              {/*...*/}
              <button className=" bg-slate-100
                                  xl:hidden
                                  px-2.5 py-2.5 rounded sm:px-3.5 sm:py-3.5
                                  w-[40px] sm:w-[48px]
                                  text-xl sm:text-[20px]"><FiMoreHorizontal /></button>

              {/*Add to MD List*/}
              <button className=" bg-slate-100
                                  hidden xl:block 2xl:hidden
                                  px-2.5 py-2.5 rounded sm:px-3.5 sm:py-3.5
                                  w-[40px] sm:w-[48px]
                                  text-xl sm:text-[20px]"><RiPlayListAddLine /></button>
                <button className="bg-slate-100
                                  py-3 px-4 hidden 2xl:flex
                                  rounded
                                  items-center justify-center gap-2"><RiPlayListAddLine className="text-xl" /><span className="text-base font-semibold">Add to MDList</span></button>

              {/*Read*/}
              <button className="bg-slate-100
                                  py-2 sm:hidden
                                  rounded grow
                                  text-xl
                                  flex items-center justify-center gap-2"><IoBookOutline /><span className="text-base font-semibold">Read</span></button>
              <button className=" bg-slate-100
                                  hidden xl:block 2xl:hidden
                                  px-2.5 py-2.5 rounded sm:px-3.5 sm:py-3.5
                                  w-[40px] sm:w-[48px]
                                  text-xl sm:text-[20px]"><IoBookOutline /></button>
                <button className="bg-slate-100
                                  py-3 px-4 hidden 2xl:flex
                                  rounded
                                  items-center justify-center gap-2"><IoBookOutline className="text-xl" /><span className="text-base font-semibold">Start Reading</span></button>

              {/*Report*/}
              <button className=" bg-slate-100
                                  hidden xl:block
                                  px-2.5 py-2.5 rounded sm:px-3.5 sm:py-3.5
                                  w-[40px] sm:w-[48px]
                                  text-xl sm:text-[20px]"><LuFlag /></button>
              {/*Upload*/}
              <button className=" bg-slate-100
                                  hidden xl:block
                                  px-2.5 py-2.5 rounded sm:px-3.5 sm:py-3.5
                                  w-[40px] sm:w-[48px]
                                  text-xl sm:text-[20px]"><FiUpload /></button>
            </div>
            <div class="col-start-2 col-span-full min-h-[100px] rounded-lg bg-gray-500 shadow"></div>
            <div class="col-start-2 col-span-full min-h-[100px] rounded-lg bg-blue-300 shadow">chapbox</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manga;
