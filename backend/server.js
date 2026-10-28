import app from './app.js';
import { config } from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import { initMailer } from './src/config/mailer.js';
import { logger } from './src/utils/logger.js';

const startServer = async () => {
  console.log('\n======================================================');
  console.log(`🚀 Starting Abhiraj Yadav Portfolio Backend (${config.nodeEnv})`);
  console.log('======================================================\n');

  // 1. Connect to Database
  await connectDB();

  // 2. Initialize Nodemailer Mailer
  await initMailer();

  // 3. Listen on Port
  const server = app.listen(config.port, () => {
    logger.success(`Server running on port ${config.port} (http://localhost:${config.port})`);
    logger.info(`API Health: http://localhost:${config.port}/api/health`);
    logger.info(`Contact Endpoint: POST http://localhost:${config.port}/api/contact\n`);
  });

  // Graceful shutdown handling
  const shutdown = async (signal) => {
    logger.warn(`Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });

    // Force exit if not closed within 5 seconds
    setTimeout(() => {
      logger.error('Force closing server after timeout.');
      process.exit(1);
    }, 5000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

startServer().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
