import { Router } from 'express';
import * as userController from './controller';

const router = Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post('/', userController.add);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export default router;
