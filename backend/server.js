import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors'; 
import { connectDB } from './config/db.js';
import rateLimit from 'express-rate-limit';
import Bottleneck from 'bottleneck';

dotenv.config();

const app = express();
const apiLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 seconds
  max: 3, // Limit each IP to 3 requests per windowMs
  message: "Too many requests, please try again later.",
});

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

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1100
});

async function throttledMangaDexRequest(url) {
  return limiter.schedule(() =>
    axios.get(url, {
      headers: {
        "User-Agent": "MyMangaApp/1.0 (http://localhost:5173)",
      },
      responseType: "stream",
      timeout: 10000,
    })
  );
}

app.get("/proxy", async (req, res) => {
  const apiUrl = req.query.url;
  if (!apiUrl) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await throttledMangaDexRequest(apiUrl);
    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res);
  } catch (error) {
    console.error("Proxy server error:", error.message);
    if (error.response?.status === 429) {
      return res.status(429).json({ error: "MangaDex rate limit exceeded." });
    }
    res.status(500).json({ error: "Proxy server error", details: error.message })
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Proxy server running on port ${PORT}`);
});
