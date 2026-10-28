import { defaultTestimonials, portfolioStats } from '../data/seedData.js';

export const getStats = (req, res) => {
  res.json({
    success: true,
    stats: portfolioStats,
    testimonials: defaultTestimonials,
  });
};
