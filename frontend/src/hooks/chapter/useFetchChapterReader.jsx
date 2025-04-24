import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/chapter';

function useFetchChapterReader(id) {
  const [chapterReaderData, setChapterReaderData] = useState([]);
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]       = useState(null);
  useEffect(() => {
    const fetchChapterReader = async () => {
        try {
            setIsLoading(true);
            const chaptersRes = await axios.get(`${apiUrl}/reader/${id}`);
            setChapterReaderData(chaptersRes.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    if(id){
        fetchChapterReader();
    }
  }, [id]);

  return { chapterReaderData, isLoading, error };
};

export default useFetchChapterReader;

