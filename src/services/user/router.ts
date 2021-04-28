import { Router } from 'express';
import * as userController from './controller';

const router = Router();

router.get('/', userController.get);

export default router;
