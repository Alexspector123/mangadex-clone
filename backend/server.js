import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import mangaRoutes from './routes/mangaRoutes.js';
import chapterRoutes from './routes/chapterRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

let totalRequests = 0;
let successfulRequests = 0;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  totalRequests++;
  next();
});

successfulRequests++;

// Every second
setInterval(() => {
  console.log(`Total RPS: ${totalRequests}, Successful: ${successfulRequests}`);
  totalRequests = 0;
  successfulRequests = 0;
}, 1000);

app.use('/api/manga', mangaRoutes);
app.use('/api/chapter', chapterRoutes);

const proxyLimiter = rateLimit({
  windowMs: 1000, // 1 second window
  max: 5, // Limit each IP to 5 requests per second
  message: { error: "Too many requests, please slow down." },
});

app.use('/proxy', proxyLimiter);

app.get("/proxy", async (req, res) => {
  const apiUrl = req.query.url;
  if (!apiUrl) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "MyMangaApp/1.0 (http://localhost:5173)",
      },
      timeout: 10000,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    console.error("Proxy server error:", error.message);
    res.status(status).json({
      error: "Proxy server error",
      status,
      message: error.message,
      data: error.response?.data || null,
    });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Proxy server running on port ${PORT}`);
});
