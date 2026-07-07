import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/aiRoutes.js';
import listingRoutes from './routes/listingRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Moved this up, removed the stray app.use(listingRoutes)

// API Routes
app.use('/api/ai', aiRoutes);
app.use('/api/listing', listingRoutes); // This is the correct, single place for it

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Overengineered Backend running securely on port ${PORT}`);
});