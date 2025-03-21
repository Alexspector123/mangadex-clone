import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';

const Manga = () => {
  const { id } = useParams();
  const {mangaData, error, isLoading} = useFetch({id});

  return (
    <div>
      <h2>Manga Library</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {mangaData.map((manga) => (
          <li key={manga.id}>{manga.attributes.title.en}</li>
        ))}
      </ul>
    </div>
  );
};

export default Manga;
