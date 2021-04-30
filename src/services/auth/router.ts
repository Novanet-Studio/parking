import { Router } from 'express';
import * as authController from './controller';

const router = Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

export default router;
