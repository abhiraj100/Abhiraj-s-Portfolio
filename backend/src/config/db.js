import mongoose from 'mongoose';
import { config } from './env.js';
import { logger } from '../utils/logger.js';

let isConnected = false;

export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      isConnected = true;
      logger.success(`MongoDB connected successfully to ${mongoose.connection.host}/${mongoose.connection.name}`);
    });

    mongoose.connection.on('error', (err) => {
      isConnected = false;
      logger.error('MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      logger.warn('MongoDB disconnected');
    });

    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    isConnected = false;
    logger.warn(`Could not connect to MongoDB at "${config.mongoUri}": ${error.message}`);
    logger.info('Backend will run in graceful fallback mode. Set valid MONGODB_URI in backend/.env to connect to MongoDB.');
  }
};

export const isDbConnected = () => isConnected && mongoose.connection.readyState === 1;
