import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const title = req.body.title;

    if (!title) {
      throw new Error("Title is undefined");
    }

    return {
      folder: `manga/covers/${title}`,
      public_id: file.originalname.replace(/\.[^/.]+$/, ""),
      format: file.mimetype.split("/")[1],
      transformation: [{ width: 800, crop: "limit" }],
    };
  },
});

const uploadManga = multer({ storage });

export default uploadManga;