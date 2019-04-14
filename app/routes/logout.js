import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();


/**
 * @swagger
 * /api/auth/signout:
 *    post:
 *      summary: Logs out a user.
 *      tags: [/api/auth/signout]
 *      description: This should logs out the user
 *      responses:
 *        200:
 *          description: User logged out successfully
 *          schema:
 *            type: string
 */
router.post('/', authController.logout);

export default router;