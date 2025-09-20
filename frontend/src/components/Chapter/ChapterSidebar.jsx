import React, { useMemo, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { RiCloseLine } from "react-icons/ri";
import { FaFileAlt, FaUserFriends } from "react-icons/fa";
import { BsArrowsFullscreen, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import useFetchChapterbyID from "../../hooks/chapter/useFetchChapterID";

import useChapterList from "../../hooks/chapter/useChapterList";

const ChapterSidebar = ({ closeSidebar, toggleHeader }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleChapterSelect = (chapter) => {
    navigate(`/chapter/${chapter.id}/1`);
    setDropdownOpen(false);
  };

  const {
    chapterData,
    isLoading: isChapterLoading,
    error: isChapterError,
  } = useFetchChapterbyID(id);
  const mangaID = chapterData?.mangaID;
  const { allChapters, error: isVolumeLoading } = useChapterList(mangaID);

  if (isChapterError) return <div>Error ChapterReading: {isChapterError}</div>;
  if (isVolumeLoading) return <div>Error ChapterReading: {isChapterError}</div>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const groupedChapter = useMemo(() => {
    if (!Array.isArray(allChapters) || !chapterData) return null;
    const sameLanguage = allChapters.filter(
      (chap) => chap.translatedLanguage === chapterData.translatedLanguage
    );
    const chapterMap = new Map();
    sameLanguage.forEach((chap) => {
      const chapNumber = chap.chapter;
      if (!chapterMap.has(chapNumber)) {
        chapterMap.set(chapNumber, chap);
      } else {
        const existing = chapterMap.get(chapNumber);
        if (
          existing.group !== chapterData.groupName &&
          chap.group === chapterData.groupName
        ) {
          chapterMap.set(chapNumber, chap);
        }
      }
    });
    return Array.from(chapterMap.values()).sort(
      (a, b) => parseFloat(a.chapter) - parseFloat(b.chapter)
    );
  }, [allChapters, chapterData]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const nextChapter = useMemo(() => {
    if (!Array.isArray(groupedChapter) || !chapterData) return null;

    if (groupedChapter) {
      return groupedChapter.find(
        (chap) =>
          parseFloat(chap.chapter) === parseFloat(chapterData.chapterNo) + 1
      );
    }

    return null;
  }, [groupedChapter]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const prevChapter = useMemo(() => {
    if (!Array.isArray(groupedChapter) || !chapterData) return null;

    if (groupedChapter) {
      return groupedChapter.find(
        (chap) =>
          parseFloat(chap.chapter) === parseFloat(chapterData.chapterNo) - 1
      );
    }

    return null;
  }, [groupedChapter]);

  const moveNextChapter = () => {
    if (nextChapter === null) {
      navigate(`/titles/${chapterData.mangaID}`);
    } else {
      navigate(`/chapter/${nextChapter.id}/1`);
    }
  };

  const movePrevChapter = () => {
    if (!prevChapter) {
      navigate(`/titles/${chapterData.mangaID}`);
    } else {
      navigate(`/chapter/${prevChapter.id}/1`);
    }
  };

  console.log("Grouped Chapter:", groupedChapter);

  return (
    <>
      {!isChapterLoading && (
        <div className="w-80 flex flex-col p-4 gap-4">
          <div className="flex justify-between">
            <button onClick={closeSidebar} className="text-2xl cursor-pointer">
              <RiCloseLine />
            </button>
            <button onClick={toggleHeader} className="text-xl cursor-pointer">
              <BsArrowsFullscreen />
            </button>
          </div>

          <a
            className="text-base text-orange-500 font-semibold
                cursor-pointer"
            onClick={() => navigate(`/titles/${chapterData.mangaID}`)}
          >
            {chapterData.mangaTitle}
          </a>

          <div className="flex items-center gap-2 text-[18px]">
            <FaFileAlt />
            {chapterData.Title === null
              ? chapterData.chapterNo === null
                ? "Oneshot"
                : `Chapter ${chapterData.chapterNo}`
              : chapterData.Title}
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-3 relative">
              <div
                className=" bg-slate-200 h-14 w-7
                            flex text-center items-center justify-center
                            cursor-pointer"
              >
                <IoIosArrowBack className="text-xl" onClick={moveNextChapter} />
              </div>
              <div
                className="flex-grow text-center p-4 rounded cursor-pointer
                        text-base
                        bg-slate-200"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                Chapter {chapterData.chapterNo}
              </div>

              {isDropdownOpen && (
                <div className="absolute top-full left-11 mt-1 w-50 bg-slate-200 border shadow-lg rounded-md z-10">
                  <ul className="max-h-60 overflow-y-auto">
                    {groupedChapter?.map((chapter) => (
                      <li
                        key={chapter.id}
                        className={`px-4 py-2 cursor-pointer ${
                          chapter.id === chapterData.id
                            ? "bg-orange-500 font-semibold text-white"
                            : ""
                        }`}
                        onClick={() => handleChapterSelect(chapter)}
                      >
                        Chapter {chapter.chapter}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div
                className=" bg-slate-200 h-14 w-7
                            flex text-center items-center justify-center
                            cursor-pointer"
              >
                <IoIosArrowForward
                  className="text-xl"
                  onClick={movePrevChapter}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-sm mt-4">
            <div className="font-semibold">Uploaded By</div>
            <div className="flex items-center gap-2">
              <FaUserFriends />
              <div>Bagek Scans</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChapterSidebar;
