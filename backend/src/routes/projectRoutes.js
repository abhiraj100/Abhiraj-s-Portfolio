import { Router } from 'express';
import { getProjects, getProjectById, createProject } from '../controllers/projectController.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

router.get('/', asyncHandler(getProjects));
router.get('/:id', asyncHandler(getProjectById));
router.post('/', asyncHandler(createProject));

export default router;
