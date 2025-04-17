import express from 'express';
import { fetchMangaList } from '../controllers/mangaController.js';

const router = express.Router();

router.get('/', fetchMangaList); // /api/manga?params=...

export default router;