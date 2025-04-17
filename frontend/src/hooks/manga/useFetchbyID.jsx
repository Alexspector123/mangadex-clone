// hooks/useFetchByID.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = "http://localhost:5000/api/manga";

export const useFetchByID = (id) => {
  const [mangaData, setMangaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangaByID = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${apiUrl}/${id}`);
        setMangaData(res.data);
        console.log("Fetched data:", res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMangaByID();
    }
  }, [id]);

  return { mangaData, isLoading, error };
};

export default useFetchByID;
