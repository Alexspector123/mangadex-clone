import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/chapter';

export function useBatchChapters(ids) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchBatchChapter = async () => {
        try {
            setLoading(true);
            const chaptersRes = await axios.post(`${apiUrl}/batch`, { ids });
            setChapters(chaptersRes.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    if(ids){
        fetchBatchChapter();
    }
  }, [ids]);

  return { chapters, loading, error };
}
