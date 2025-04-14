import { useState, useEffect } from 'react';
import { fetchMangaById} from '../services/mangaService';

const useFetch = (params) => {
    const [mangaData, setMangaData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                let data = await fetchMangaById(params, 0);
                setMangaData(data ? [data] : []);
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