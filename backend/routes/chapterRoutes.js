import express from 'express';
import fetchChapterList from '../controllers/chapterController.js';

const router = express.Router();

// Route to fetch chapters
router.get('/', fetchChapterList);

export default router;
