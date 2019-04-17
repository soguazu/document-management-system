import express from 'express';
import roleController from '../controllers/role';
import authMiddleware from '../middleware/auth';
import validateIfAdmin from '../middleware/admin';

const router = express.Router();

/**
 * @swagger
 * /api/roles:
 *    post:
 *      summary: creates a new user.
 *      tags: [/api/roles]
 *      consumes:
 *        - application/json
 *      description: This should create a new role
 *      parameters:
 *        - in: body
 *          name: title
 *          description: should contain the role title
 *      schema:
 *        type: object
 *        required:
 *          - title
 *        properties:
 *          title:
 *            type: string
 *            example: jto
 *      responses:
 *        200:
 *          description: role created successfully
 *          schema:
 *            type: string
 *        400:
 *          description: Could not create the role
 *          schema:
 *            type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *            type: string
 *        403:
 *          description: User not an Admin
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find a role with the given ID
 *          schema:
 *            type: string
 */

router.post('/', roleController.create);

/**
 * @swagger
 * /api/roles:
 *    get:
 *      summary: returns all roles.
 *      tags: [/api/roles]
 *      description: This should return all roles
 *      parameters:
 *        - in: header
 *          name: x-auth-token
 *          description: An authorization token
 *      responses:
 *        200:
 *          description: A list of roles
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
// , [authMiddleware, validateIfAdmin]
router.get('/', roleController.getAll);

/**
 * @swagger
 * /api/roles/{id}:
 *    get:
 *      summary: returns the unique role with the passed id
 *      tags: [/api/roles]
 *      consumes:
 *        - application/json
 *      description: This should return an existing role with the given id
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the role requested.
 *      schema:
 *        type: object
 *        required:
 *          - title
 *        properties:
 *          title:
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
// authMiddleware,
router.get('/:id', roleController.getOne);

/**
 * @swagger
 * /api/roles/{id}:
 *    put:
 *      summary: updates a role with the given id.
 *      tags: [/api/roles]
 *      consumes:
 *        - application/json
 *      description: This should update an existing role
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the role to edit.
 *      schema:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          title:
 *            type: string
 *      responses:
 *        200:
 *          description: role updated successfully
 *          schema:
 *            type: string
 *        400:
 *          description: Could not update the roles
 *          schema:
 *            type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find  a role with the given ID
 *          schema:
 *            type: string
 * */
// , authMiddleware
router.put('/:id', roleController.update);

/**
 * @swagger
 * /api/roles/{id}:
 *    delete:
 *      summary: delete a role with the given id.
 *      tags: [/api/roles]
 *      consumes:
 *        - application/json
 *      description: This should delete an existing role
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the role to delete.
 *      responses:
 *        200:
 *          description: role deleted successfully
 *          schema:
 *            type: string
 *        400:
 *          description: Could delete the role
 *          schema:
 *            type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find  a role with the given ID
 *          schema:
 *            type: string
 * */
// , authMiddleware
router.delete('/:id', roleController.delete);

export default router;
