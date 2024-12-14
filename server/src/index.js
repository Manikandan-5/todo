import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import TodoTitle from './model/todotitleModel.js';
import SubTitle from './model/subtitleModel.js';

import todotitleRoutes from './routes/todotitleRoutes.js';
import subtitleRoutes from './routes/subtitleRoutes.js';

dotenv.config();
connectDB();
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://todo-client-five-chi.vercel.app', // Allow this specific origin
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Apply CORS middleware globally

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: 'CORS fixed!' });
});

app.get('/', (req, res) => {
  res.json("Hii");
});

// API routes
app.use("/api", todotitleRoutes);
app.use("/api", subtitleRoutes);

// Listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
