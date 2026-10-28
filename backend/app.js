import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './src/config/env.js';
import { notFoundHandler, errorHandler } from './src/middleware/errorHandler.js';
import { apiLimiter } from './src/middleware/rateLimiter.js';

// Route imports
import contactRoutes from './src/routes/contactRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import skillRoutes from './src/routes/skillRoutes.js';
import experienceRoutes from './src/routes/experienceRoutes.js';
import healthRoutes from './src/routes/healthRoutes.js';
import certRoutes from './src/routes/certRoutes.js';
import chatRoutes from './src/routes/chatRoutes.js';
import statsRoutes from './src/routes/statsRoutes.js';

const app = express();

// Security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Cross-Origin Resource Sharing
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  config.clientUrl,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in dev, can restrict in prod
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
}));

// Request logging
if (config.nodeEnv !== 'test') {
  app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
}

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Apply rate limiter to all API endpoints
app.use('/api', apiLimiter);

// API Documentation / root welcome
app.get('/', (req, res) => {
  res.json({
    name: "Abhiraj Yadav's Portfolio API",
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      health: 'GET /api/health',
      contact: 'POST /api/contact',
      contactMessages: 'GET /api/contact/messages (Requires x-admin-key)',
      projects: 'GET /api/projects',
      skills: 'GET /api/skills',
      experience: 'GET /api/experience',
    },
  });
});

// Mount Routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/certifications', certRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/stats', statsRoutes);

// Catch-all 404 & Global Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
