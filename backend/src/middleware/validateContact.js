import validator from 'validator';

export const validateContactInput = (req, res, next) => {
  const { name, email, subject, message, honeypot } = req.body;

  // Bot honeypot check: If honeypot is filled, silently succeed without processing
  if (honeypot) {
    return res.status(200).json({
      success: true,
      message: 'Your message has been received.',
    });
  }

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide your name.',
    });
  }
  if (name.trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Name cannot exceed 100 characters.',
    });
  }

  // Email validation
  if (!email || typeof email !== 'string' || !validator.isEmail(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  // Subject validation
  if (subject && typeof subject === 'string' && subject.length > 200) {
    return res.status(400).json({
      success: false,
      message: 'Subject cannot exceed 200 characters.',
    });
  }

  // Message validation
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a message.',
    });
  }
  if (message.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: 'Message is too short. Please provide at least 5 characters.',
    });
  }
  if (message.trim().length > 5000) {
    return res.status(400).json({
      success: false,
      message: 'Message cannot exceed 5000 characters.',
    });
  }

  // Clean/trim fields
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.subject = (subject || 'General Inquiry').trim();
  req.body.message = message.trim();

  next();
};
