import axios from 'axios';
import Redis from 'ioredis';
import Bottleneck from 'bottleneck';

const redis = new Redis();

const mangadexLimiter = new Bottleneck({
  minTime: 200,
  maxConcurrent: 1,
});

export const fetchMangaList = async (req, res) => {
  try {
    let query = { ...req.query };

    if (query.order && typeof query.order === 'object') {
      for (const [key, value] of Object.entries(query.order)) {
        query[`order[${key}]`] = value;
      }
      delete query.order;
    }

    if (!query.limit) query.limit = 10;

    if (query.includedTags) {
      const tags = Array.isArray(query.includedTags) ? query.includedTags : [query.includedTags];
      tags.forEach(tag => {
        query['includedTags[]'] = tag;
      });
      delete query.includedTags;
    }

    const queryString = new URLSearchParams(query).toString();
    const cacheKey = `mangaList:${queryString}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const response = await mangadexLimiter.schedule(() =>
      axios.get(`https://api.mangadex.org/manga?${queryString}`, {
        headers: {
          'User-Agent': 'YourAppName/1.0 (alexspector8766@gmail.com)',
        },
      })
    );

    const mangaList = response.data.data;

    // Manga IDs
    const mangaIDs = mangaList.map(manga => manga.id);

    // Titles
    const mangaTitles = mangaList.map(manga => {
        const titleObj = manga.attributes?.title;
        return titleObj ? Object.values(titleObj)[0] : "Untitled";
      });

    // Descriptions
    const mangaDescriptions = mangaList.map(manga => {
      const desc = manga.attributes.description;
      if (desc?.en) return desc.en;
      const firstKey = Object.keys(desc || {})[0];
      return firstKey ? desc[firstKey] : "No description";
    });

    // Tags
    const tags = mangaList.map(manga => {
      return manga.attributes.tags.map(tag => tag.attributes.name.en);
    });

    // Cover URLs
    const coverUrls = await Promise.all(
        response.data.data.map(async (manga) => {
          const coverArtRel = manga.relationships.find(
            (rel) => rel.type === "cover_art"
          );
          if (coverArtRel) {
            try {
              const coverResp = await axios.get(
                `https://api.mangadex.org/cover/${coverArtRel.id}`
              );
              const coverFileName = coverResp.data.data.attributes.fileName;
              return `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.256.jpg`;
            } catch (err) {
              console.error(`Error fetching cover for manga ID ${manga.id}: ${err.message}`);
              return null;
            }
          }
          return null;
        })
      );
      

    // Authors
    const mangaAuthors = await Promise.all(
        response.data.data.map(async (manga) => {
          const authorRel = manga.relationships.find(
            (rel) => rel.type === "author"
          );
          if (authorRel) {
            try {
              const authorResp = await axios.get(
                `https://api.mangadex.org/author/${authorRel.id}`
              );
              return authorResp.data.data.attributes.name;
            } catch (err) {
              console.error(`Error fetching author for manga ID ${manga.id}: ${err.message}`);
              return null;
            }
          }
          return null;
        })
      );

    // Artists
    const mangaArtists = await Promise.all(
        response.data.data.map(async (manga) => {
          const artistRel = manga.relationships.find(
            (rel) => rel.type === "artist"
          );
          if (artistRel) {
            try {
              const artistResp = await axios.get(
                `https://api.mangadex.org/artist/${artistRel.id}`
              );
              return artistResp.data.data.attributes.name;
            } catch (err) {
              console.error(`Error fetching author for manga ID ${manga.id}: ${err.message}`);
              return null;
            }
          }
          return null;
        })
      );

    const mangaData = {
      mangaIDs,
      mangaTitles,
      coverUrls,
      mangaAuthors,
      mangaArtists,
      mangaDescriptions,
      tags,
    };

    await redis.setex(cacheKey, 60, JSON.stringify(mangaData));

    return res.status(200).json(mangaData);
  } catch (error) {
    console.error("Error fetching manga list:", error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please wait and try again.' });
    }

    return res.status(500).json({ error: 'An error occurred while fetching manga data.' });
  }
};

export default fetchMangaList;
