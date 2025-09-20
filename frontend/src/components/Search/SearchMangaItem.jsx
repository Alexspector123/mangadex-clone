import React from "react";

import { useFetchByID } from "../../hooks/manga/useFetchbyID";

import { GoDotFill } from "react-icons/go";

const SearchMangaItem = ({ data }) => {
  if (!data) return null;
  if (!data.attributes) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mangaData, isLoading } = useFetchByID(data.id);

  return (
    <div>
      {!isLoading && (
        <a className="" key={mangaData.id} href={`/titles/${mangaData.id}`}>
          <div
            className="grid grid-cols-[56px_1fr] gap-2 w-full
                                    min-h-20
                                    bg-slate-100 hover:bg-slate-300
                                    transition-all duration-200
                                    p-1.5"
          >
            <div className="h-full w-full">
              <img
                className="rounded shadow-md w-full h-full object-fill"
                src={mangaData.Cover}
                alt="Cover img"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-bold text-lg line-clamp-1">
                {mangaData.Title}
              </div>
              <div className="grow"></div>
              <div
                className="bg-slate-200
                                            flex flex-row items-center
                                            px-1
                                            w-fit
                                            text-base
                                            font-sans"
              >
                <GoDotFill
                  className={`${
                    mangaData.Status === "ongoing"
                      ? "text-green-400"
                      : mangaData.Status === "completed"
                      ? "text-blue-400"
                      : mangaData.Status === "hiatus"
                      ? "text-orange-500"
                      : mangaData.Status === "cancelled"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                />
                <span>{mangaData.Status}</span>
              </div>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default SearchMangaItem;
