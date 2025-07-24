import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import { globalErrorHandler } from './utils/errorHandler';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skyballoon';
mongoose.connect(DB_URI)
  .then(() => console.log('✅ MongoDB connection successful'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('🎈 Sky Balloon Experience API - Operational');
});

app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});