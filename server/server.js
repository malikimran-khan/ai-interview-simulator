const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const interviewRoutes = require('./routes/interviewRoutes');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Security & Middleware
app.use(helmet()); // Basic security headers
app.use(morgan('dev')); // Request logging
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);

// Health Check
app.get('/health', (req, res) => res.status(200).send('API Stable'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong on our end.'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 AI Interview Engine operational on port ${PORT}`));
