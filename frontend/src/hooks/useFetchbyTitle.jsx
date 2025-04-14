import { useState, useEffect } from 'react';
import { fetchMangaByTitle } from '../services/mangaService';

const useFetchbyTitle = (params) => {
    const [mangaData, setMangaData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const loadData = async () => {
        try {
            setIsLoading(true);
            let data = await fetchMangaByTitle(params.title, params.limit || 10);
            setMangaData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
      };

      if(params) {
        loadData();
      }
    }, [params])

    return { mangaData, error, isLoading };
};

export default useFetchbyTitle