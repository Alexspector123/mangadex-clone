import express from 'express';
import { fetchMangaList, fetchMangaById, fetchVolumeListByID } from '../controllers/mangaController.js';

const router = express.Router();

router.get('/', fetchMangaList); // /api/manga?params=...
router.get('/volume/:id', fetchVolumeListByID);
router.get('/:id', fetchMangaById);

export default router;