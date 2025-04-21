import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const apiUrl = "http://localhost:5000/api/manga";

const useFetchVolumebyID = (id) => {
    const [volumeData, setVolumeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVolumeByID = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${apiUrl}/volume/${id}`);
                setVolumeData(res.data);
            } catch (error) {
                setError(error.message);
            } finally {
              setIsLoading(false);
            }
        }
        if (id) {
            fetchVolumeByID();
        }
    }, [id]);
  return { volumeData, isLoading, error };
}

export default useFetchVolumebyID