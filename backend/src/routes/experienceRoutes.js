import { Router } from 'express';
import { getExperience } from '../controllers/experienceController.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

router.get('/', asyncHandler(getExperience));

export default router;
