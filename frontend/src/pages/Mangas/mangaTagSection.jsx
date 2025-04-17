import React from 'react'

import { InfoTag } from "../../components/Tag/InfoTag.jsx"

const mangaTagSection = ({data}) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
        <div className="mb-2 flex flex-col">
        <span className="font-bold mb-2">Author</span>
        <div><InfoTag label={data.Author} /></div></div>
        <div className="mb-2 flex flex-col">
        <span className="font-bold mb-2">Artist</span>
        <div><InfoTag label={data.Artist} /></div></div>
        <div className="mb-2 flex flex-col">
        <span className="font-bold mb-2">Genres </span>
        <div className="flex gap-2">
            {Array.isArray(data.tag) ? data.tag.map((tag, index) => (
              <InfoTag key={index} label={tag} />
            )) : <InfoTag label="Unknown" />}</div></div>
    </div>
  )
}

export default mangaTagSection