import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = "http://localhost:5000/api/manga";

export const useFetchList = (params) => {
  const [mangaData, setMangaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        setIsLoading(true);

        const queryString = new URLSearchParams(params).toString();
        const mangaRes = await axios.get(`${apiUrl}?${queryString}`);
        const mangaData = mangaRes.data;

        setMangaData(mangaData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (params) {
      fetchMangaList();
    }
  }, [params]);

  return { mangaData, isLoading, error };
};

export default useFetchList;
