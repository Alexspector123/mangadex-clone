import axios from 'axios';
import Redis from 'ioredis';
import mangadexLimiter from '../utils/rateLimiter.js';
import { toRelativeTime } from '../utils/toRelativeTime.js';

const redis = new Redis(); // Connect to Redis

// Get chapter list information
export const fetchChapterList = async (req, res) => {
  try {
    const { limit = 10, order = 'desc' } = req.query;
    const queryString = `limit=${limit}&order[${order}]=desc`;

    const cacheKey = `chapterList:${queryString}`;

    // Check cache first
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    // Fetch chapters from MangaDex
    const response = await mangadexLimiter.schedule(() =>
      axios.get(`https://api.mangadex.org/chapter?${queryString}`, {
        headers: {
          'User-Agent': 'YourAppName/1.0 (alexspector8766@gmail.com)',
        },
      })
    );

    const chapterList = response.data.data;

    const fullData = await Promise.all(chapterList.map(async (chapter) => {
      const mangaRel = chapter.relationships.find(r => r.type === 'manga');
      const groupRel = chapter.relationships.find(r => r.type === 'scanlation_group');

      const mangaID = mangaRel?.id;
      const groupID = groupRel?.id;

      const mangaRes = await axios.get(`https://api.mangadex.org/manga/${mangaID}`);
      const mangaTitle = Object.values(mangaRes.data.data.attributes.title)[0];

      const coverRel = mangaRes.data.data.relationships.find(rel => rel.type === 'cover_art');
      const coverID = coverRel?.id;
      const coverRes = await axios.get(`https://api.mangadex.org/cover/${coverID}`);
      const coverFileName = coverRes.data.data.attributes.fileName;
      const coverUrl = `https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}`;

      let groupName = '';
      if (groupID) {
        const groupRes = await axios.get(`https://api.mangadex.org/group/${groupID}`);
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

    // Cache result for 60 seconds
    await redis.setex(cacheKey, 60, JSON.stringify(fullData));

    return res.status(200).json(fullData);
  } catch (error) {
    console.error("Error fetching chapter list:", error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please wait and try again.' });
    }

    return res.status(500).json({ error: 'An error occurred while fetching chapter data.' });
  }
};
// Get specific chapter information
export const fetchChapterByID = async (req, res) => {
  const { id } = req.params;
  try {
    const cacheKey = `chapter:${id}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const chapterRes = await mangadexLimiter.schedule(() => 
      axios.get(`https://api.mangadex.org/chapter/${id}`, {
        headers: {
          'User-Agent' : 'YourAppName/1.0 (alexspector8766@gmail.com)',
        },
      })
    );

    const chapter = chapterRes.data.data;

    const chapterTitle = chapter.attributes?.title;

    const chapterNo = chapter.attributes?.chapter;

    const updatedAt = toRelativeTime(chapter.attributes.readableAt);

    const mangaRel = chapter.relationships.find(r => r.type === 'manga');
    const groupRel = chapter.relationships.find(r => r.type === 'scanlation_group');

    const mangaID = mangaRel?.id;
    const groupID = groupRel?.id;

    const mangaRes = await axios.get(`https://api.mangadex.org/manga/${mangaID}`);
    const mangaTitle = Object.values(mangaRes.data.data.attributes.title)[0];

    let groupName = '';
    if (groupID) {
      const groupRes = await axios.get(`https://api.mangadex.org/group/${groupID}`);
      groupName = groupRes.data.data.attributes.name;
    }

    const translatedLanguage = chapter.attributes?.translatedLanguage;

    const chapterData = {
      id,
      Title: chapterTitle,
      ReleaseTime: updatedAt,
      chapterNo,
      groupName,
      translatedLanguage,
      mangaID,
      mangaTitle,
    }

    await redis.setex(cacheKey, 60, JSON.stringify(chapterData));
    return res.status(200).json(chapterData);

  } catch (error) {
    console.error('Error fetching manga by ID:', error.message);
    return res.status(500).json({ error: 'Failed to fetch manga by ID.' });
  }
};
// Get chapter list base on id list
export const fetchChaptersBatch = async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'Request body must be { ids: string[] }' });
  }

  try {
    // schedule and dedupe via your limiter
    const results = await Promise.all(
      ids.map(id =>
        mangadexLimiter.schedule(() =>
          axios
            .get(`https://api.mangadex.org/chapter/${id}`, {
              headers: { 'User-Agent': 'YourApp/1.0 (email@example.com)' },
            })
            .then(async r => {
              const d = r.data.data;

              const groupRel = d.relationships.find(r => r.type === 'scanlation_group');
              const groupID = groupRel?.id;
              let groupName = '';
              if (groupID) {
                const groupRes = await axios.get(`https://api.mangadex.org/group/${groupID}`);
                groupName = groupRes.data.data.attributes.name;
              }

              return {
                id,
                title: d.attributes.title,
                readableAt: toRelativeTime(d.attributes.readableAt),
                chapter: d.attributes.chapter,
                volume: d.attributes.volume,
                translatedLanguage: d.attributes.translatedLanguage,
                group: groupName,
              };
            })
            .catch(() => null)
        )
      )
    );

    // filter out any nulls
    res.json(results.filter(Boolean));
  } catch (err) {
    console.error('Batch chapters error:', err);
    res.status(500).json({ error: 'Failed to fetch chapters batch' });
  }
};
// Get chapter to read
export const fetchChapterReader = async (req, res) => {
  const { id } = req.params;

  try {
    const cacheKey = `chapterReader:${id}`;

    const cachedData = await redis.get(cacheKey);
    if(cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    const chapterReaderRes = await mangadexLimiter.schedule(() =>
      axios.get(`https://api.mangadex.org/at-home/server/${id}?forcePort443=true`,{
        headers: {
          'User-Agent' : 'YourAppName/1.0 (alexspector8766@gmail.com)',
        }
      })
    );

    const chapterReader = chapterReaderRes.data;
    const chapterReaderData = [];
    chapterReader.chapter?.data?.map((imgUrl) => {
      const url = `${chapterReader.baseUrl}/data/${chapterReader.chapter.hash}/${imgUrl}`;
      chapterReaderData.push(url);
    });
    await redis.setex(cacheKey, 60, JSON.stringify(chapterReaderData));
    return res.status(200).json(chapterReaderData);
  } catch (error) {
    console.error('Error fetching manga reader by ID:', error.message);
    return res.status(500).json({ error: 'Failed to fetch manga reader by ID.' });
  }
};

export default fetchChapterList;
