import { Router } from 'express';
import * as userController from './controller';

const router = Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post('/', userController.add);
router.post('/:id', userController.update);

export default router;
