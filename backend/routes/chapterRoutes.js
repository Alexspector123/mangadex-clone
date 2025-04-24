import express from 'express';
import { fetchChapterList, fetchChapterByID, fetchChaptersBatch, fetchChapterReader, } from '../controllers/chapterController.js';

const router = express.Router();

// Route to fetch chapters
router.get('/', fetchChapterList);
router.get('/:id', fetchChapterByID);
router.post('/batch', fetchChaptersBatch);
router.get('/reader/:id', fetchChapterReader);

export default router;
