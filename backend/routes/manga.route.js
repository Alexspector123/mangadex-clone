import express from 'express';
import { fetchMangaList, fetchMangaById, fetchVolumeListByID, searchManga } from '../controllers/manga.controller.js';

const router = express.Router();

router.get('/', fetchMangaList); // /api/manga?params=...
router.get('/volume/:id', fetchVolumeListByID);
router.get('/search', searchManga);
router.get('/:id', fetchMangaById);

export default router;