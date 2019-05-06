import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

/**
 * @swagger
 * /api/auth:
 *    post:
 *      summary: signs in a user.
 *      tags: [/api/auth/]
 *      description: This should login the user
 *      parameters:
 *        - in: body
 *          name: email
 *          description: should contain the user email
 *        - in: body
 *          name: password
 *          description: should contain the user pasword
 *      schema:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            example: admin@gmail.com
 *          password:
 *            type: string
 *            example: JamTa19
 *      responses:
 *        200:
 *          description: User logged in successfully
 *          schema:
 *            type: string
 *        400:
 *          description: Invalid username or password
 *          schema:
 *            type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *          type: string
 *        403:
 *          description: User not an Admin
 *          schema:
 *          type: string
 *        404:
 *          description: Could not find a user with the given ID
 *          schema:
 *          type: string
 */
router.post('/', authController.login);


export default router;
