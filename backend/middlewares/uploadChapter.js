import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import { db } from "../config/db.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const mangaTitle = req.body.manga_title || req.query.manga_title || "";
    const chapterNumber = req.body.chapter_number || req.query.chapter_number || "";
    const chapterTitle = req.body.chapter_title || req.query.chapter_title;
    const userId = req.user?.userId;

    if (!mangaTitle || !chapterNumber) {
      throw new Error("manga_title and chapter_number are undefined");
    }

    let url = `manga/${mangaTitle}/chapter_${chapterNumber}/${userId}`;
    if (chapterTitle === 'Oneshot') {
      url = `manga/${mangaTitle}/Oneshot/${userId}`;
    }

    const [rows] = await db.execute("SELECT manga_id FROM Manga WHERE title = ?", [mangaTitle]);
    if (rows.length === 0) {
      throw new Error("Not found any manga from this title");
    }

    req.body.manga_id = rows[0].manga_id;

    return {
      folder: url,
      public_id: file.originalname,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [{ width: 800, crop: "limit" }],
    };
  },
});

const uploadChapter = multer({ storage });

export default uploadChapter;
