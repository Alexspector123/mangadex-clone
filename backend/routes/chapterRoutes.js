import express from 'express';
import { fetchChapterList, fetchChapterByID, fetchChaptersBatch, } from '../controllers/chapterController.js';

const router = express.Router();

// Route to fetch chapters
router.get('/', fetchChapterList);
router.get('/:id', fetchChapterByID);
router.post('/batch', fetchChaptersBatch);

export default router;
