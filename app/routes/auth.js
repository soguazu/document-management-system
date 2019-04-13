import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

router.post('/', authController.login);

export default router;