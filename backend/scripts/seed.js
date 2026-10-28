import mongoose from 'mongoose';
import { config } from '../src/config/env.js';
import { Project } from '../src/models/Project.js';
import { Skill } from '../src/models/Skill.js';
import { Experience } from '../src/models/Experience.js';
import { defaultProjects, defaultSkills, defaultExperience } from '../src/data/seedData.js';
import { logger } from '../src/utils/logger.js';

const seedDatabase = async () => {
  logger.info(`Connecting to MongoDB at: ${config.mongoUri}`);

  try {
    await mongoose.connect(config.mongoUri);
    logger.success('Connected to MongoDB. Starting database seeding...');

    // 1. Seed Projects
    await Project.deleteMany({});
    const insertedProjects = await Project.insertMany(defaultProjects);
    logger.success(`Seeded ${insertedProjects.length} projects.`);

    // 2. Seed Skills
    await Skill.deleteMany({});
    const insertedSkills = await Skill.insertMany(defaultSkills);
    logger.success(`Seeded ${insertedSkills.length} skill categories.`);

    // 3. Seed Experience
    await Experience.deleteMany({});
    const insertedExp = await Experience.insertMany(defaultExperience);
    logger.success(`Seeded ${insertedExp.length} experience entries.`);

    logger.success('Database seeding completed successfully! 🎉');
  } catch (error) {
    logger.error('Failed to seed database:', error.message);
  } finally {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB.');
    process.exit(0);
  }
};

seedDatabase();
