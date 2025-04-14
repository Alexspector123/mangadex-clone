import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = "https://api.mangadex.org/chapter";
const proxy = `http://localhost:5000/proxy?url=`;

const useLatestChapters = (limit = 20) => {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toRelativeTime = (dateStr) => {
        const timeDiff = (new Date() - new Date(dateStr)) / 1000;
        if (timeDiff < 60) return `${Math.floor(timeDiff)} seconds ago`;
        if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)} minutes ago`;
        if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)} hours ago`;
        return `${Math.floor(timeDiff / 86400)} days ago`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const chapterRes = await axios.get(`${proxy}${encodeURIComponent(`${apiUrl}?limit=${limit}&order[readableAt]=desc`)}`);
                const chapterData = chapterRes.data.data;

                const fullData = await Promise.all(chapterData.map(async (chapter) => {
                    const mangaRel = chapter.relationships.find(r => r.type === 'manga');
                    const groupRel = chapter.relationships.find(r => r.type === 'scanlation_group');

                    const mangaID = mangaRel?.id;
                    const groupID = groupRel?.id;

                    const mangaRes = await axios.get(`${proxy}${encodeURIComponent(`https://api.mangadex.org/manga/${mangaID}`)}`);
                    const mangaTitle = Object.values(mangaRes.data.data.attributes.title)[0];

                    const coverRel = mangaRes.data.data.relationships.find(rel => rel.type === 'cover_art');
                    const coverID = coverRel?.id;
                    const coverRes = await axios.get(`${proxy}${encodeURIComponent(`https://api.mangadex.org/cover/${coverID}`)}`);
                    const coverFileName = coverRes.data.data.attributes.fileName;
                    const coverUrl = `https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}`;

                    let groupName = '';
                    if (groupID) {
                        const groupRes = await axios.get(`${proxy}${encodeURIComponent(`https://api.mangadex.org/group/${groupID}`)}`);
                        groupName = groupRes.data.data.attributes.name;
                    }

                    return {
                        mangaID,
                        mangaTitle,
                        coverUrl,
                        chapter: chapter.attributes.chapter,
                        volume: chapter.attributes.volume,
                        language: chapter.attributes.translatedLanguage,
                        group: groupName,
                        updatedAt: toRelativeTime(chapter.attributes.readableAt),
                    };
                }));

                setChapters(fullData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [limit]);

    return { chapters, loading, error };
};

export default useLatestChapters;
