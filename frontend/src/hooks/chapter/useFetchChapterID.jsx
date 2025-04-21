import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const apiUrl = "http://localhost:5000/api/chapter";

const useFetchChapterbyID = (id) => {
    const [chapterData, setChapterData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChapterByID = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${apiUrl}/${id}`);
                setChapterData(res.data);
            } catch (error) {
                setError(error.message);
            } finally {
              setIsLoading(false);
            }
        }
        if (id) {
            fetchChapterByID();
        }
    }, [id]);
  return { chapterData, isLoading, error };
}

export default useFetchChapterbyID