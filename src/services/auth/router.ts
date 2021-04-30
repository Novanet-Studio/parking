import { Router } from 'express';
import * as authController from './controller';

const router = Router();

router.post('/signup', authController.signup);

export default router;
