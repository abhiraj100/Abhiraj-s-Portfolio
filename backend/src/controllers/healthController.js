import mongoose from 'mongoose';
import { isDbConnected } from '../config/db.js';
import { isMailerConfigured } from '../config/mailer.js';
import { config } from '../config/env.js';

const startTime = Date.now();

export const getHealth = (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown';

  res.json({
    success: true,
    service: 'Abhiraj Portfolio API',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: `${uptimeSeconds}s`,
    environment: config.nodeEnv,
    database: {
      connected: isDbConnected(),
      state: dbState,
      name: mongoose.connection.name || 'none',
    },
    mailer: {
      configured: isMailerConfigured(),
      service: config.email.service,
      recipient: config.email.recipient,
    },
  });
};
