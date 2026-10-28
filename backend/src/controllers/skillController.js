import { Skill } from '../models/Skill.js';
import { defaultSkills } from '../data/seedData.js';
import { isDbConnected } from '../config/db.js';

export const getSkills = async (req, res) => {
  if (isDbConnected()) {
    try {
      const skills = await Skill.find().sort({ order: 1 });
      if (skills.length > 0) {
        return res.json({
          success: true,
          count: skills.length,
          source: 'mongodb',
          data: skills,
        });
      }
    } catch (err) {
      // fallback
    }
  }

  return res.json({
    success: true,
    count: defaultSkills.length,
    source: 'defaults',
    data: defaultSkills,
  });
};
