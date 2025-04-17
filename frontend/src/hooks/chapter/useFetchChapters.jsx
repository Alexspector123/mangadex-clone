import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = "http://localhost:5000/api/chapter";

export const useFetchChapters = (limit, order) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapterList = async () => {
      try {
        setLoading(true);

        const chapterRes = await axios.get(`${apiUrl}?limit=${limit}&order=${order}`);
        const chapterData = chapterRes.data;

        setChapters(chapterData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterList();
  }, [limit, order]);

  return { chapters, loading, error };
};

export default useFetchChapters;
