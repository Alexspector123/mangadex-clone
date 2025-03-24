import React, { useState, useEffect } from 'react';
import { fetchMangaById, fetchMangaByTitle } from '../services/mangaService';

const useFetch = (params) => {
    const [mangaData, setMangaData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                let data;

                if (typeof params === "string") {
                    data = await fetchMangaById(params);
                    setMangaData(data ? [data] : []);
                } else if (params && params.title) {
                    data = await fetchMangaByTitle(params.title, params.limit || 10);
                    setMangaData(data);
                }

            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (params) {
            loadData();
        }
    }, [params]);

    return { mangaData, error, isLoading };
};

export default useFetch;