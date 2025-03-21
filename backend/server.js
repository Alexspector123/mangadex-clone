import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors'; 
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/proxy", async (req, res) => {
  const apiUrl = req.query.url;
  if (!apiUrl) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  console.log(`Proxying request to: ${apiUrl}`);

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "MyMangaApp/1.0 (http://localhost:5173)",
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Proxy server error:", error.message);
    res.status(500).json({ error: "Proxy server error", details: error.message });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Proxy server running on port ${PORT}`);
});
