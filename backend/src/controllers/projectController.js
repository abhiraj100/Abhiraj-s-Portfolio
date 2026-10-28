import { Project } from '../models/Project.js';
import { defaultProjects } from '../data/seedData.js';
import { isDbConnected } from '../config/db.js';
import { config } from '../config/env.js';

export const getProjects = async (req, res) => {
  if (isDbConnected()) {
    try {
      const projects = await Project.find().sort({ order: 1, createdAt: -1 });
      if (projects.length > 0) {
        return res.json({
          success: true,
          count: projects.length,
          source: 'mongodb',
          data: projects,
        });
      }
    } catch (err) {
      // fallback
    }
  }

  return res.json({
    success: true,
    count: defaultProjects.length,
    source: 'defaults',
    data: defaultProjects,
  });
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;

  if (isDbConnected()) {
    try {
      const project = await Project.findById(id);
      if (project) {
        return res.json({ success: true, data: project });
      }
    } catch (err) {
      // invalid id or error
    }
  }

  const fallback = defaultProjects.find((p, index) => String(index) === id || p.title.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase());
  if (fallback) {
    return res.json({ success: true, data: fallback });
  }

  return res.status(404).json({ success: false, message: 'Project not found' });
};

export const createProject = async (req, res) => {
  const adminKey = req.headers['x-admin-key'] || req.query.admin_key;
  if (!adminKey || adminKey !== config.adminApiKey) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Admin key required.' });
  }

  if (!isDbConnected()) {
    return res.status(503).json({ success: false, message: 'Database is not connected.' });
  }

  const project = await Project.create(req.body);
  return res.status(201).json({ success: true, data: project });
};
