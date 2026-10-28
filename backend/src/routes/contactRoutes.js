import { Router } from 'express';
import { submitContact, getMessages, getMessageById, testEmail } from '../controllers/contactController.js';
import { validateContactInput } from '../middleware/validateContact.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Public: Contact form submission with rate limiting and input validation
router.post('/', contactLimiter, validateContactInput, asyncHandler(submitContact));

// Admin: View all submitted messages
router.get('/messages', asyncHandler(getMessages));

// Admin: View a specific message by ID
router.get('/messages/:id', asyncHandler(getMessageById));

// Admin / Diagnostic: Send a test email
router.post('/test-email', asyncHandler(testEmail));

export default router;
