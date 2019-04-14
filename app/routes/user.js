import express from 'express';
import userController from '../controllers/user';
import authMiddleware from '../middleware/auth';
import validateIfAdmin from '../middleware/admin';

const router = express.Router();

router.post('/', authMiddleware, userController.create);
router.get('/', [validateIfAdmin, authMiddleware], userController.getAll);
router.get('/:id', authMiddleware, userController.getOne);
router.put('/:id', authMiddleware, userController.update);
router.delete('/:id', authMiddleware, userController.delete);

export default router;