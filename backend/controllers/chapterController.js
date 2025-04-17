import axios from 'axios';
import Redis from 'ioredis';
import Bottleneck from 'bottleneck';

const redis = new Redis(); // Connect to Redis

// Initialize Bottleneck with 200ms delay and 1 concurrent request
const mangadexLimiter = new Bottleneck({
  minTime: 200,
  maxConcurrent: 1
});

export const fetchChapterList = async (req, res) => {
  try {
    const { limit = 10, order = 'desc' } = req.query; // Default to limit of 10 and order desc
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
          'User-Agent': 'YourAppName/1.0 (alexspector8766@gmail.com)', // Replace with your info
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

// Helper function to convert time to relative format (like "5 minutes ago")
const toRelativeTime = (dateStr) => {
  const timeDiff = (new Date() - new Date(dateStr)) / 1000;
  if (timeDiff < 60) return `${Math.floor(timeDiff)} seconds ago`;
  if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)} minutes ago`;
  if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)} hours ago`;
  return `${Math.floor(timeDiff / 86400)} days ago`;
};

export default fetchChapterList;
