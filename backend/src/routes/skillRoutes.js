import { Router } from 'express';
import { getSkills } from '../controllers/skillController.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

router.get('/', asyncHandler(getSkills));

export default router;
