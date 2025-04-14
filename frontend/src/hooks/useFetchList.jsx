import axios from 'axios';

import { useEffect, useState } from 'react';
import { mangaList } from '../mockData/mangaList';

export const useFetchList = (params) => {
    const apiUrl = 'https://api.mangadex.org/manga';
    const proxyUrl = `http://localhost:5000/proxy?url=`;

    const [mangaData, setMangaData] = useState(mangaList);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMangaList = async (retryCount = 0) => {
        try {
            setIsLoading(true);
            const fullUrl = `${apiUrl}?${params.toString()}`;
            const response = await axios.get(`${proxyUrl}${encodeURIComponent(fullUrl)}`);
            //Get id
            const ids = response.data.data.map((manga) => manga.id);
            //Get title
            const titles = response.data.data.map((manga) => {
                const title = manga.attributes.title;
                return Object.values(title)[0];
            });
            //Get cover art
            const covers = await Promise.all(
                response.data.data.map(async (manga) => {
                    const coverArtRel = manga.relationships.find((rel) => rel.type === 'cover_art');
                    if(coverArtRel){
                        const coverResp = await axios.get(`${proxyUrl}${encodeURIComponent(`https://api.mangadex.org/cover/${coverArtRel.id}`)}`);
                        const coverFileName = coverResp.data.data.attributes.fileName;
                        return `${proxyUrl}${encodeURIComponent(`https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`)}`;
                    }
                })
            );
            //Get author 
            const authors = await Promise.all(
                response.data.data.map(async (manga) => {
                    const authorRel = manga.relationships.find((rel) => rel.type === 'author');
                    if(authorRel){
                        const authorResp = await axios.get(`${proxyUrl}${encodeURIComponent(`https://api.mangadex.org/author/${authorRel.id}`)}`);
                        return authorResp.data.data.attributes.name;
                    }
                    return null;
                })
            );
            //Get description
            const descriptions = response.data.data.map((manga) => {
                const desc = manga.attributes.description;
                const firstDesKey = Object.keys(desc)[0];
                return desc[firstDesKey];
            });

            setMangaData({
                mangaIDs: ids,
                mangaTitles: titles,
                coverUrls: covers,
                mangaAuthors: authors,
                mangaDescriptions: descriptions,
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 429 && retryCount < 5) {
                console.warn(`Rate limit hit! Retrying in ${(retryCount + 1) * 2000}ms...`);
                await new Promise((resolve) => setTimeout(resolve, (retryCount + 1) * 2000));
                return retryFunction();
            }
            throw new Error(`Error fetching manga: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if(params){
            fetchMangaList();
        }
    }, [params]);
    return { mangaData, error, isLoading };
}

export default useFetchList