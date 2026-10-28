import { Message } from '../models/Message.js';
import { sendContactEmails, isMailerConfigured } from '../config/mailer.js';
import { isDbConnected } from '../config/db.js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

// In-memory fallback if MongoDB is temporarily unavailable
const inMemoryMessages = [];

export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || '';

  let savedMessage = null;

  // 1. Persist to MongoDB (or fallback array)
  if (isDbConnected()) {
    try {
      savedMessage = await Message.create({
        name,
        email,
        subject,
        message,
        ipAddress: String(ip),
        userAgent: String(userAgent),
      });
      logger.info(`Message saved to MongoDB (ID: ${savedMessage._id})`);
    } catch (err) {
      logger.error('Failed to save message to MongoDB:', err.message);
    }
  }

  if (!savedMessage) {
    savedMessage = {
      _id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name,
      email,
      subject,
      message,
      ipAddress: String(ip),
      userAgent: String(userAgent),
      createdAt: new Date(),
      status: 'unread',
      emailSent: false,
    };
    inMemoryMessages.unshift(savedMessage);
    logger.warn(`Message saved to in-memory store (ID: ${savedMessage._id}) because MongoDB is not connected.`);
  }

  // 2. Dispatch emails via Nodemailer
  let emailResults = { adminSent: false, autoReplySent: false, simulated: false };
  try {
    emailResults = await sendContactEmails({
      name,
      email,
      subject,
      message,
      receivedAt: savedMessage.createdAt || new Date(),
      ip: String(ip),
    });

    // Update message status in MongoDB if connected
    if (isDbConnected() && savedMessage._id && !String(savedMessage._id).startsWith('mem_')) {
      await Message.findByIdAndUpdate(savedMessage._id, {
        emailSent: emailResults.adminSent,
        emailError: emailResults.errors && emailResults.errors.length > 0 ? emailResults.errors.join('; ') : null,
      });
    }
  } catch (emailErr) {
    logger.error('Unexpected error while dispatching email:', emailErr.message);
  }

  // 3. Return user-friendly response
  return res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been sent successfully.',
    data: {
      id: savedMessage._id,
      name: savedMessage.name,
      emailSent: emailResults.adminSent,
      autoReplySent: emailResults.autoReplySent,
      mailerConfigured: isMailerConfigured(),
    },
  });
};

export const getMessages = async (req, res) => {
  const adminKey = req.headers['x-admin-key'] || req.query.admin_key;
  if (!adminKey || adminKey !== config.adminApiKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Valid x-admin-key header required to view contact messages.',
    });
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;

  if (isDbConnected()) {
    const total = await Message.countDocuments();
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({
      success: true,
      count: messages.length,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      source: 'mongodb',
      messages,
    });
  }

  return res.json({
    success: true,
    count: inMemoryMessages.length,
    total: inMemoryMessages.length,
    page: 1,
    pages: 1,
    source: 'in-memory-fallback',
    messages: inMemoryMessages,
  });
};

export const getMessageById = async (req, res) => {
  const adminKey = req.headers['x-admin-key'] || req.query.admin_key;
  if (!adminKey || adminKey !== config.adminApiKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Valid x-admin-key header required.',
    });
  }

  const { id } = req.params;

  if (isDbConnected()) {
    const msg = await Message.findById(id);
    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    if (msg.status === 'unread') {
      msg.status = 'read';
      await msg.save();
    }
    return res.json({ success: true, message: msg });
  }

  const memMsg = inMemoryMessages.find((m) => m._id === id);
  if (!memMsg) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }
  return res.json({ success: true, message: memMsg });
};

export const testEmail = async (req, res) => {
  const adminKey = req.headers['x-admin-key'] || req.query.admin_key;
  if (!adminKey || adminKey !== config.adminApiKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Valid x-admin-key header or query param required.',
    });
  }

  if (!isMailerConfigured()) {
    return res.status(400).json({
      success: false,
      message: 'Mailer is not configured yet. Set EMAIL_USER and EMAIL_PASS in backend/.env',
    });
  }

  try {
    const result = await sendContactEmails({
      name: 'System Test',
      email: config.email.recipient,
      subject: '🧪 Portfolio Mailer Diagnostic Test',
      message: 'This is a test email sent from your MERN backend diagnostic endpoint to verify SMTP delivery.',
      receivedAt: new Date(),
      ip: '127.0.0.1',
    });

    return res.json({
      success: true,
      message: 'Test email execution finished',
      result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error sending test email',
      error: err.message,
    });
  }
};
