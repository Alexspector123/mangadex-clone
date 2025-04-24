import React from 'react';
import { getFlagUrl } from '../../utils/getFlagEmoji';
import { RiGroupLine } from "react-icons/ri";

const ChapterItem = ({ data }) => {
  if (!data) return null;

  return (
    <div className="px-2 py-1 rounded
                  bg-gray-100 hover:bg-gray-200
                    transition
                    ">
      <div className='flex flex-row gap-2 items-center mb-1'>
        <img src={getFlagUrl(data.translatedLanguage)} alt="Flag" className="w-6 inline-block" />
        <div className="text-sm font-medium">Chapter {data.chapter}: {data.title || 'No title'}</div>
      </div>
      <div className='flex flex-row items-center'>
        <RiGroupLine className='mr-2' />
        <div className="text-sm mr-10">{data.group}</div>
        <div className="text-sm text-gray-500">{data.readableAt}</div>
      </div>
    </div>
  );
};

export default ChapterItem;
