import React from "react";
import { mangaData } from '../../mockData/mangaData.js';

const Manga = () => {
  const data = mangaData[0];

  return (
    <div className="flex min-w-0">

      <div className="flex-grow relative">
        <div className="absolute inset-0 h-80 md:h-[400px] xl:h-[440px] w-full">
          <img
            className="object-cover object-[0%_25%] h-full w-full"
            src= { data.Cover }
            />
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-t before:from-white before:to-white/80 md:before:hidden md:bg-black/50 md:backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 px-4 mt-[68px] mb-auto text-black
        grid grid-rows-6 gap-2.5 ">
          <h2 className="text-3xl font-bold">hello</h2>
        </div>
      </div>
    </div>
  );
};

export default Manga;
