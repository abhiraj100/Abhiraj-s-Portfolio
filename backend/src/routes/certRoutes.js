import { Router } from 'express';
import { getCertifications } from '../controllers/certController.js';

const router = Router();

router.get('/', getCertifications);

export default router;
