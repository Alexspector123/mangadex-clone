import express from "express";
import uploadChapter from "../middlewares/uploadChapter.js";
import {
  fetchChapterList,
  fetchChapterByID,
  fetchChaptersBatch,
  fetchChapterReader,
  addChapter,
} from "../controllers/chapter.controller.js";

const router = express.Router();

// Route to fetch chapters

router.get("/reader/:id", fetchChapterReader);
//router.post('/upload', uploadChapter.fields([{ name: "pages", maxCount: 150 }]), addChapter);
router.post("/batch", fetchChaptersBatch);

router.get("/", fetchChapterList);

router.get("/:id", fetchChapterByID);
export default router;
