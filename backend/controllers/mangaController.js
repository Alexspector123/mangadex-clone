import axios from 'axios';
import Redis from 'ioredis';
import mangadexLimiter from '../utils/rateLimiter.js';

const redis = new Redis();

//Get Manga List
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
                `https://api.mangadex.org/author/${artistRel.id}`
              );
              return artistResp?.data?.data?.attributes?.name || 'Unknown';
            } catch (err) {
              console.error(`Error fetching artist for manga ID ${manga.id}: ${err.message}`);
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

//Get Manga information
export const fetchMangaById = async (req, res) => {
  const { id } = req.params;

  try {
    const cacheKey = `manga:${id}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const mangaRes = await mangadexLimiter.schedule(() => 
      axios.get(`https://api.mangadex.org/manga/${id}`, {
        headers: {
          'User-Agent' : 'YourAppName/1.0 (alexspector8766@gmail.com)',
        },
      })
    );

    const manga = mangaRes.data.data;

    const MangaTitle = manga.attributes?.title ? (manga.attributes.title.ja ? manga.attributes.title.ja : (manga.attributes.title.en ? manga.attributes.title.en : Object.values(manga.attributes.title)[0])) : "Untitled";
    
    const altTitles = manga.attributes?.altTitles;
    const MangaAltTitle = 
    altTitles.find(t => t.en && t.en !== MangaTitle)?.en ??
    altTitles.find(t => t.ja && t.ja !== MangaTitle)?.ja ??
    Object.values(altTitles[0] || {})[0] ??
    "No alternative titles";

    let MangaDescription;
    const desc = manga.attributes.description;
    const firstKey = Object.keys(desc || {})[0];
    MangaDescription = firstKey ? desc[firstKey] : "No description";
    if (desc?.en) {
      MangaDescription = desc.en;
    }

    const tags = manga.attributes.tags;

    const coverRel = manga.relationships.find(rel => rel.type === 'cover_art');
    let coverUrl = null;
    if (coverRel) {
      try {
        const coverRes = await axios.get(`https://api.mangadex.org/cover/${coverRel.id}`);
        const coverFileName = coverRes.data.data.attributes.fileName;
        coverUrl = `https://uploads.mangadex.org/covers/${id}/${coverFileName}.256.jpg`;
      } catch (err) {
        console.error(`Error fetching cover for manga ID ${id}: ${err.message}`);
      }
    }

    const authorRel = manga.relationships.find(rel => rel.type === 'author');
    let MangaAuthor = null;
    if (authorRel) {
      try {
        const authorRes = await axios.get(`https://api.mangadex.org/author/${authorRel.id}`);
        MangaAuthor = authorRes?.data?.data?.attributes?.name || 'Unknown';
      } catch (err) {
        console.error(`Error fetching author for manga ID ${id}: ${err.message}`);
      }
    }

    const artistRel = manga.relationships.find(rel => rel.type === 'artist');
    let MangaArtist = null;
    if (artistRel) {
      try {
        const artistRes = await axios.get(`https://api.mangadex.org/author/${artistRel.id}`);
        MangaArtist = artistRes?.data?.data?.attributes?.name || 'Unknown';
      } catch (err) {
        console.error(`Error fetching artist for manga ID ${id}: ${err.message}`);
      }
    }
    const MangaStatus = manga.attributes.status || 'Unknown';
    const MangaYear = manga.attributes.year || 'Unknown';

    const mangaData = {
      id,
      Title: MangaTitle,
      AltTitles: MangaAltTitle,
      Description: MangaDescription,
      tags: tags,
      Cover: coverUrl,
      Author: MangaAuthor,
      Artist: MangaArtist,
      Status: MangaStatus,
      PublicationYear: MangaYear,
    };

    await redis.setex(cacheKey, 60, JSON.stringify(mangaData));
    return res.status(200).json(mangaData);

  } catch (err) {
    console.error('Error fetching manga by ID:', err.message);
    return res.status(500).json({ error: 'Failed to fetch manga by ID.' });
  }
};


// Get chapter information by manga ID
export const fetchVolumeListByID = async (req, res) => {
  const { id } = req.params;
  try {
    const cacheKey = `VolumeList:${id}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const VolumeRes = await mangadexLimiter.schedule(() =>
      axios.get(`https://api.mangadex.org/manga/${id}/aggregate`, {
        headers: {
          'User-Agent': 'YourAppName/1.0 (alexspector8766@gmail.com)',
        },
      })
    );

    const volumesObj = VolumeRes.data.volumes;
    
    const VolumeListData = Object.entries(volumesObj).map(([volumeNumber, volumeData]) => {
      const chapters = Object.entries(volumeData.chapters).map(
        ([chapterNumber, chapterData]) => ({
          chapterNumber,
          id: chapterData.id,
          others: chapterData,
        })
      );

      return {
        volume: volumeNumber,
        count: volumeData.count,
        chapters,
      };
    });

    await redis.setex(cacheKey, 60, JSON.stringify(VolumeListData));

    return res.status(200).json(VolumeListData);
  } catch (error) {
    console.error("Error fetching Volume list:", error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please wait and try again.' });
    }

    return res.status(500).json({ error: 'An error occurred while fetching chapter data.' });
  }
}

export default fetchMangaList;
