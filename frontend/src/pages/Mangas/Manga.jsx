import React, { useState } from "react";
import { useParams, useSearchParams } from 'react-router-dom';

import { useFetchByID } from "../../hooks/manga/useFetchbyID.jsx";

import { useSidebar } from "../../contexts/SidebarContext.js";

import { Tag } from "../../components/Tag/Tag.jsx"
import Cover from "../../components/Manga/Cover.jsx";
import CoverModal from "../../components/Manga/CoverModal.jsx";
import TabNavigation from "../../components/Manga/TabNavigation.jsx";

import { FaRegBookmark } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { RiPlayListAddLine } from "react-icons/ri";
import { LuFlag } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";

import MangaTagSection from "./MangaTagSection.jsx";
import ArtGallery from "./ArtGallery.jsx";
import MangaChapterSection from "./MangaChapterSection.jsx";

const Manga = () => {
  const { id } = useParams();
  const { mangaData, isLoading, error } = useFetchByID(id);
  const [showMore, setShowMore] = useState(false);

  const [showModal, setShowModal] = useState(false)

  const { sidebar } = useSidebar();

  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "chapters";

  if (isLoading) return <div></div>;
  if (error || !mangaData) return <div>Error: {error || "Manga not found"}</div>;

  return (
    <div className="flex min-w-0">

      <div className="flex-grow relative">
        <div className="absolute inset-0 h-60 sm:h-70 md:h-[280px] w-full">
          <img
            className="object-cover object-[0%_25%] h-full w-full"
            src= { mangaData.Cover }
            />
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-t before:from-white before:to-white/80 sm:before:hidden sm:bg-black/50 sm:backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 px-6 mt-[68px] mb-8">
          <div className={`mx-auto grid grid-flow-row-dense
                          grid-cols-[0px_100px_1fr_0px] sm:grid-cols-[0px_200px_1fr_0px] 
                          ${sidebar ? "" 
                            : "2xl:grid-cols-[40px_200px_1fr_40px]"}
                          items-start gap-4`}>
            <div className="col-start-2 row-span-2 flex items-start relative mb-auto select-none sm:row-span-4">
              <Cover cover={mangaData.Cover} onClick={() => setShowModal(true)} />
            </div>
            
            {showModal && <CoverModal cover={mangaData.Cover} onClose={() => setShowModal(false)} />}
            <div className="col-start-3
                            flex flex-col 
                          text-black sm:text-white
                            sm:h-[205px]">
              <p className="mb-1
                            leading-[1.1em] wrap-break-word text-shadow-[1px_2px_4px_rgb(0_0_0_/_0.3)] 
                            font-bold font-poppins 
                            md:max-w-[682px] xl:max-w-[860px]
                            max-[610px]:text-base text-xl sm:text-2xl md:text-3xl xl:text-[40px]">{mangaData.Title}</p>
              <div className="line-clamp-2 font-normal inline-block
                              leading-5 sm:leading-6
                              text-base sm:text-2xl xl:text-xl">{mangaData.AltTitles}</div>
              <div className="grow hidden sm:block"></div>
              <div className="flex flex-row gap-2">
                <div className="font-normal text-xs sm:text-lg truncate">{mangaData.Author}</div>
              </div>
            </div>
            <div className="col-start-3 col-span-full sm:col-span-1 sm:col-start-3 sm:row-start-3">
            {Array.isArray(mangaData.tags) ? mangaData.tags.map((tag, index) => (
              <Tag key={index} label={tag.attributes.name.en} />
            )) : <Tag label="Unknown" />}
            <div className="inline-flex items-center gap-1 font-bold text-[13px] uppercase">
              <GoDotFill className={`${mangaData.Status === "ongoing" ? "text-green-400" 
                                      : (mangaData.Status === "completed" ? "text-blue-400"
                                      : (mangaData.Status === "completed" ? "text-orange-500" 
                                      : (mangaData.Status === "completed" ? "text-red-500" 
                                      : "text-gray-400")))}`} />
              <span>Publication: {mangaData.PublicationYear}, {mangaData.Status}</span>
            </div>
            </div>
            <div className="col-start-3 hidden sm:block"></div>
            <div className="col-start-3 min-h-[100px] rounded-lg bg-teal-500 shadow">Statistic</div>
            <div className="col-start-2 col-span-full
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
            <div className="col-start-2 col-span-full">
                {/* Mobile layout */}
                <div className="block sm:hidden flex flex-col">
                {/* Description (short or full) */}
                <div className={`text-sm transition-all duration-300 ease-in-out ${showMore ? '' : 'line-clamp-3'}`}>
                  {mangaData.Description}
                </div>

                {/* tags */}
                {showMore && (
                  <MangaTagSection data={mangaData}/>
                )}

                {/* See more / less button */}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-2 text-blue-600 text-sm font-medium cursor-pointer"
                >
                  {showMore ? "See less ▲" : "See more ▼"}
                </button>
              </div>

              {/* Desktop layout */}
              <div className="hidden sm:block space-y-4">
                <div className="text-base mb-4">{mangaData.Description}</div>
              </div>
            </div>

            <div className="col-start-2 col-span-full">
              <div className="overflow-x-auto mt-2 mb-4">
                <TabNavigation />
              </div>
              <div className="flex gap-6 items-start">
                <div className="hidden sm:block basis-1/3">
                      <MangaTagSection data={mangaData}/>
                </div>
                <div className="grow flex-grow">
                  {tab === "chapters" && <MangaChapterSection id={id}/>}
                  {tab === "art" && <ArtGallery />}
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manga;
