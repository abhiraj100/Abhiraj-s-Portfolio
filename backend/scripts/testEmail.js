import { initMailer, sendContactEmails, isMailerConfigured } from '../src/config/mailer.js';
import { config } from '../src/config/env.js';
import { logger } from '../src/utils/logger.js';

const runTest = async () => {
  logger.info('Initializing mailer for diagnostic test...');
  await initMailer();

  if (!isMailerConfigured()) {
    logger.warn('Email credentials not configured in backend/.env.');
    logger.info('Please set EMAIL_USER and EMAIL_PASS (Gmail 16-character App Password) in backend/.env');
    process.exit(1);
  }

  logger.info(`Sending test message to recipient: ${config.email.recipient}...`);
  try {
    const result = await sendContactEmails({
      name: 'Diagnostic Tester',
      email: config.email.recipient,
      subject: '🧪 Portfolio SMTP Email Test',
      message: 'Greetings! This test email confirms that Nodemailer is successfully configured with your credentials.',
      receivedAt: new Date(),
      ip: '127.0.0.1 (CLI Test)',
    });

    if (result.adminSent) {
      logger.success('✅ Email sent successfully! Check your inbox at: ' + config.email.recipient);
    } else {
      logger.error('❌ Failed to send email. Errors:', result.errors);
    }
  } catch (err) {
    logger.error('Exception during test email:', err.message);
  }

  process.exit(0);
};

runTest();
