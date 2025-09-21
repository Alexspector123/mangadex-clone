import React from 'react'

import { InfoTag } from "../../components/Tag/InfoTag.jsx"

const MangaTagSection = ({data}) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 max-w-[400px] min-w-[100px]">
      <div className="mb-2 flex flex-col">
        <span className="font-bold mb-2">Author</span>
        <div><InfoTag label={data.Author} /></div>
      </div>
      <div className="mb-2 flex flex-col">
        <span className="font-bold mb-2">Artist</span>
        <div><InfoTag label={data.Artist} /></div>
      </div>
      <div className="mb-2 flex flex-col">
        <span className="font-bold mb-2">Genres </span>
        <div className="flex flex-wrap gap-2">
            {Array.isArray(data.tags) ? data.tags.map((tag, index) => (
              tag.attributes.group === "genre" ? <InfoTag key={index} label={tag.attributes.name.en} /> : ''
            )) : <InfoTag label="Unknown" />}
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <span className="font-bold mb-2">Themes </span>
        <div className="flex flex-wrap gap-2">
            {Array.isArray(data.tags) ? data.tags.map((tag, index) => (
              tag.attributes.group === "theme" ? <InfoTag key={index} label={tag.attributes.name.en} /> : ''
            )) : <InfoTag label="Unknown" />}
        </div>
      </div>
    </div>
  )
}

export default MangaTagSection
