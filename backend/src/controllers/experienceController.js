import { Experience } from '../models/Experience.js';
import { defaultExperience } from '../data/seedData.js';
import { isDbConnected } from '../config/db.js';

export const getExperience = async (req, res) => {
  if (isDbConnected()) {
    try {
      const exp = await Experience.find().sort({ order: 1 });
      if (exp.length > 0) {
        return res.json({
          success: true,
          count: exp.length,
          source: 'mongodb',
          data: exp,
        });
      }
    } catch (err) {
      // fallback
    }
  }

  return res.json({
    success: true,
    count: defaultExperience.length,
    source: 'defaults',
    data: defaultExperience,
  });
};
