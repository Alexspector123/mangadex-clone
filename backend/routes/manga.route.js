import express from "express";
import uploadManga from "../middlewares/uploadManga.js";
import {
  fetchMangaList,
  fetchMangaById,
  fetchVolumeListByID,
  searchManga,
  addManga,
} from "../controllers/manga.controller.js";

const router = express.Router();

router.get("/", fetchMangaList); // /api/manga?params=...
router.get("/volume/:id", fetchVolumeListByID);
router.get("/search", searchManga);
//router.post('/upload', uploadManga.single("image"), addManga);
router.get("/:id", fetchMangaById);

export default router;
