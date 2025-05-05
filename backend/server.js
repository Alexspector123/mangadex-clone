import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js';

import authRoutes from './routes/auth.route.js';
import mangaRoutes from './routes/manga.route.js';
import chapterRoutes from './routes/chapter.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

let totalRequests = 0;
let successfulRequests = 0;

connectDB();

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
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

app.use('/api/auth', authRoutes);
app.use('/api/manga', mangaRoutes);
app.use('/api/chapter', chapterRoutes);

const proxyLimiter = rateLimit({
  windowMs: 1000,
  max: 5,
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
  console.log(`Proxy server running on port ${PORT}`);
});
