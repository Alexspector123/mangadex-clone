import React, { useState, useEffect } from 'react';
import { fetchMangaData } from '../services/mangaService';

const useFetch = (params) => {

    const [mangaData, setMangaData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchMangaData(params);
                setMangaData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        if(params){
            loadData();
        }
    }, [params])
    
  return (
    {mangaData, error, isLoading}
  )
}

export default useFetch