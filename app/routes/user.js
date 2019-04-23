import express from 'express';
import userController from '../controllers/user';
import authMiddleware from '../middleware/auth';
import validateIfAdmin from '../middleware/admin';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *    post:
 *      summary: creates a new user.
 *      tags: [/api/users]
 *      consumes:
 *        - application/json
 *      description: This should create a new role
 *      parameters:
 *        - in: body
 *          name: username
 *          description: should contain the user's username
 *        - in: body
 *          name: name
 *          description: should contain the user's fullname
 *        - in: body
 *          name: email
 *          description: should contain the user's email
 *        - in: body
 *          name: password
 *          description: should contain the user's password
 *        - in: body
 *          name: role
 *          description: should contain the user's role
 *      schema:
 *        type: object
 *        required:
 *          - username
 *          - name
 *          - email
 *          - password
 *          - role
 *        properties:
 *          username:
 *            type: string
 *            example: jto
 *          name:
 *            type: object
 *            example: john Doe
 *          email:
 *            type: string
 *            example: jto@info.com
 *          password:
 *            type: string
 *            example: jto1606
 *          role:
 *            type: string
 *            example: admin
 *      responses:
 *        200:
 *          description: user created successfully
 *          schema:
 *            type: string
 *        400:
 *          description: Could not create the user
 *          schema:
 *            type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *            type: string
 *        403:
 *          description: User no an Admin
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find a type with the given ID
 *          schema:
 *            type: string
 */

router.post('/', userController.create);

/**
 * @swagger
 * /api/users:
 *    get:
 *      summary: returns all users.
 *      tags: [/api/users]
 *      description: This should return all users
 *      parameters:
 *        - in: header
 *          name: x-auth-token
 *          description: An authorization token
 *      responses:
 *        200:
 *          description: A list of users
 *          schema:
 *            type: object
 *        400:
 *          description: Failed Request
 *          schema:
 *          type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *          type: string
 *        403:
 *          description: User not an Admin
 *          schema:
 *          type: string
 */

router.get('/', [authMiddleware, validateIfAdmin], userController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *    get:
 *      summary: returns the unique user with the passed id
 *      tags: [/api/users]
 *      consumes:
 *        - application/json
 *      description: This should return an existing user with the given id
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the user requested.
 *      schema:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          id:
 *            type: integer
 *          username:
 *            type: string
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          role:
 *            type: string
 *      responses:
 *        200:
 *          description:  success
 *          schema:
 *            type: string
 *        400:
 *          description: Invalid ID
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find  a role with the given ID
 *          schema:
 *            type: string
 */

router.get('/:id', authMiddleware, userController.getOne);

/**
 * @swagger
 * /api/users/{id}:
 *    put:
 *      summary: updates a user with the given id.
 *      tags: [/api/users]
 *      consumes:
 *        - application/json
 *      description: This should update an existing user
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the user to edit.
 *        - in: body
 *          name: username
 *          description: The username of the user to be updated.
 *        - in: body
 *          name: name
 *          description: The name of the user to be updated.
 *        - in: body
 *          name: email
 *          description: The password of the user to be updated.
 *        - in: body
 *          name: password
 *          description: The password of the user to be updated.
 *        - in: body
 *          name: role
 *          description: The role of the user to be updated.
 *      schema:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          id:
 *            type: integer
 *          username:
 *            type: string
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          role:
 *            type: string
 *      responses:
 *        200:
 *          description: user updated successfully
 *          schema:
 *            type: string
 *        400:
 *          description: Could not update the user
 *          schema:
 *            type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find  a user with the given ID
 *          schema:
 *            type: string
 * */

router.put('/:id', [authMiddleware, validateIfAdmin], userController.update);

/**
 * @swagger
 * /api/users/{id}:
 *    delete:
 *      summary: delete a user with the given id.
 *      tags: [/api/users]
 *      consumes:
 *        - application/json
 *      description: This should delete an existing user
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the user to delete.
 *      schema:
 *        type: object
 *        required:
 *          - id
 *      responses:
 *        200:
 *          description: user updated successfully
 *          schema:
 *            type: string
 *        400:
 *          description: Could not update the user
 *          schema:
 *            type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find  a user with the given ID
 *          schema:
 *            type: string
 * */

router.delete('/:id', [authMiddleware, validateIfAdmin], userController.delete);

export default router;
