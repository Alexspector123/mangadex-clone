import express from 'express';
import { fetchMangaList, fetchMangaById } from '../controllers/mangaController.js';

const router = express.Router();

router.get('/', fetchMangaList); // /api/manga?params=...
router.get('/:id', fetchMangaById);

export default router;