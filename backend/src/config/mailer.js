import nodemailer from 'nodemailer';
import { config } from './env.js';
import { logger } from '../utils/logger.js';
import { getAdminNotificationTemplate, getAutoReplyTemplate } from '../utils/emailTemplates.js';

let transporter = null;
let isConfigured = false;

export const initMailer = async () => {
  const { email } = config;

  // Check if credentials are real and not placeholder
  const hasGmailCreds = Boolean(
    email.service === 'gmail' &&
    email.user &&
    email.pass &&
    email.pass !== 'your_app_password_here' &&
    email.pass !== 'your_16_character_app_password'
  );

  const hasSmtpCreds = Boolean(
    email.service === 'smtp' &&
    email.smtpHost &&
    email.smtpUser &&
    email.smtpPass
  );

  if (hasGmailCreds) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email.user,
        pass: email.pass,
      },
    });
    isConfigured = true;
  } else if (hasSmtpCreds) {
    transporter = nodemailer.createTransport({
      host: email.smtpHost,
      port: email.smtpPort,
      secure: email.smtpSecure,
      auth: {
        user: email.smtpUser,
        pass: email.smtpPass,
      },
    });
    isConfigured = true;
  } else {
    isConfigured = false;
    logger.warn('Email credentials not fully configured in backend/.env.');
    logger.info('Contact submissions will be safely stored in MongoDB and logged to console.');
    logger.info('To enable real email sending to your inbox, set EMAIL_USER & EMAIL_PASS in backend/.env.');
    return;
  }

  try {
    await transporter.verify();
    logger.success(`Nodemailer connected and verified (${email.service} as ${email.user || email.smtpUser})`);
  } catch (err) {
    logger.error('Nodemailer verification failed:', err.message);
    logger.info('Messages will still be saved to the database. Check your Gmail App Password.');
  }
};

export const isMailerConfigured = () => isConfigured;

export const sendContactEmails = async ({ name, email, subject, message, receivedAt = new Date(), ip = '' }) => {
  const results = {
    adminSent: false,
    autoReplySent: false,
    errors: [],
  };

  // 1. Prepare Admin Notification Email
  const adminMailOptions = {
    from: `"${name} (Portfolio Inquiry)" <${config.email.user || config.email.recipient}>`,
    replyTo: email,
    to: config.email.recipient,
    subject: `⚡ Portfolio Contact: ${subject || 'New Message'} from ${name}`,
    html: getAdminNotificationTemplate({ name, email, subject, message, receivedAt, ip }),
  };

  // 2. Prepare Visitor Auto-Reply Email
  const autoReplyOptions = {
    from: `"Abhiraj Yadav" <${config.email.user || config.email.recipient}>`,
    to: email,
    subject: `Thank you for contacting me, ${name}!`,
    html: getAutoReplyTemplate({ name, message }),
  };

  if (!isConfigured || !transporter) {
    logger.info(`[SIMULATED EMAIL] Message from ${name} <${email}>: "${subject || 'No Subject'}"`);
    return {
      adminSent: false,
      autoReplySent: false,
      simulated: true,
      message: 'Email credentials not configured in backend/.env, message logged to console & saved to database',
    };
  }

  // Send admin notification
  try {
    await transporter.sendMail(adminMailOptions);
    results.adminSent = true;
    logger.success(`Admin notification email sent to ${config.email.recipient}`);
  } catch (err) {
    results.errors.push(`Admin email error: ${err.message}`);
    logger.error('Failed to send admin notification email:', err.message);
  }

  // Send auto-reply to visitor
  try {
    await transporter.sendMail(autoReplyOptions);
    results.autoReplySent = true;
    logger.success(`Confirmation auto-reply sent to ${email}`);
  } catch (err) {
    results.errors.push(`Auto-reply error: ${err.message}`);
    logger.warn('Failed to send auto-reply to visitor:', err.message);
  }

  return results;
};
