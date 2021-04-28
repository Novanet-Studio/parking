import { Router } from 'express';
import * as userController from './controller';

const router = Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);

export default router;
