import express from 'express';
import documentController from '../controllers/document';
import authMiddleware from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * /api/documents:
 *    post:
 *      summary: creates a new document.
 *      tags: [/api/documents]
 *      consumes:
 *        - application/json
 *      description: This should create a new document
 *      parameters:
 *        - in: body
 *          name: ownerId
 *          description: should contain the user's Id
 *        - in: body
 *          name: title
 *          description: should contain the document title
 *        - in: body
 *          name: docType
 *          description: should contain the document type
 *        - in: body
 *          name: content
 *          description: should contain the document content
 *        - in: body
 *          name: access
 *          description: should contain the private / public / Role
 *        - in: body
 *          name: createdAt
 *          description: should contain the date document was created
 *        - in: body
 *          name: modifiedAt
 *          description: should contain the date document was modified
 *      schema:
 *        type: object
 *        required:
 *          - ownerId
 *          - title
 *          - content
 *          - access
 *          - createdAt
 *          - modifiedAt
 *        properties:
 *          ownerId:
 *            type: string
 *            example: 384m2902-919
 *          title:
 *            type: string
 *            example: The Secret Montemont
 *          docType:
 *            type: string
 *            example: Designs
 *          content:
 *            type: string
 *          access:
 *            type: string
 *            example: private
 *          createdAt:
 *            type: date
 *            example: 2018-03-23
 *      responses:
 *        200:
 *          description: document created successfully
 *          schema:
 *            type: string
 *        400:
 *          description: Could not create the document
 *          schema:
 *            type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find a type with the given ID
 *          schema:
 *            type: string
 */

router.post('/', authMiddleware, documentController.create);

/**
 * @swagger
 * /api/documents:
 *    get:
 *      summary: returns all documents.
 *      tags: [/api/documents]
 *      description: This should return all documents
 *      parameters:
 *        - in: header
 *          name: x-auth-token
 *          description: An authorization token
 *      responses:
 *        200:
 *          description: A list of documents
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
 */

router.get('/private', authMiddleware, documentController.private);

/**
 * @swagger
 * /api/users:
 *    get:
 *      summary: returns all documents.
 *      tags: [/api/documents]
 *      description: This should return all documents
 *      parameters:
 *        - in: header
 *          name: x-auth-token
 *          description: An authorization token
 *      responses:
 *        200:
 *          description: A list of documents
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
 */

router.get('/', authMiddleware, documentController.getAll);

/**
 * @swagger
 * /api/documents/search?key:
 *    get:
 *      summary: returns the document search for
 *      tags: [/api/documents]
 *      consumes:
 *        - application/json
 *      description: This should return documents that matches the query
 *      parameters:
 *        - in: query
 *          name: key
 *          description: The ID of the user requested.
 *        - in: header
 *          name: x-auth-token
 *          description: Token to authenticate the user requesting for a document.
 *      schema:
 *        type: object
 *        required:
 *          - id
 *          - ownerId
 *          - title
 *          - docType
 *          - content
 *          - createdAt
 *      responses:
 *        200:
 *          description:  success
 *          schema:
 *            type: string
 *        400:
 *          description: Bad Request
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find the document with the given ID
 *          schema:
 *            type: string
 */

router.get('/search', authMiddleware, documentController.getSearched);

/**
 * @swagger
 * /api/documents/{id}:
 *    get:
 *      summary: returns the document with the passed id
 *      tags: [/api/documents]
 *      consumes:
 *        - application/json
 *      description: This should return an existing document with the given id
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the user requested.
 *        - in: header
 *          name: x-auth-token
 *          description: Token to authenticate the user requesting for a document.
 *      schema:
 *        type: object
 *        required:
 *          - id
 *          - ownerId
 *          - title
 *          - docType
 *          - content
 *          - createdAt
 *      responses:
 *        200:
 *          description:  success
 *          schema:
 *            type: string
 *        400:
 *          description: Bad Request
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find the document with the given ID
 *          schema:
 *            type: string
 */

router.get('/:id', authMiddleware, documentController.getOne);

/**
 * @swagger
 * /api/documents/{id}:
 *    put:
 *      summary: updates a document with the given id.
 *      tags: [/api/documents]
 *      consumes:
 *        - application/json
 *      description: This should update an existing document
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the document to be edited.
 *        - in: body
 *          name: title
 *          description: The name of the document to be updated.
 *        - in: body
 *          name: docType
 *          description: The type of document to be updated.
 *        - in: body
 *          name: content
 *          description: The content of the document.
 *        - in: body
 *          name: modifiedAt
 *          description: Date document was updated / modified.
 *      schema:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          id:
 *            type: ObjectId
 *          title:
 *            type: string
 *          docType:
 *            type: string
 *          content:
 *            type: string
 *          modifiedAt:
 *            type: date
 *      responses:
 *        200:
 *          description: document updated successfully
 *          schema:
 *            type: string
 *        400:
 *          description: Bad Request
 *          schema:
 *            type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find  a document with the given ID
 *          schema:
 *            type: string
 * */

router.put('/:id', authMiddleware, documentController.update);

/**
 * @swagger
 * /api/document/{id}:
 *    delete:
 *      summary: delete a document with the given id.
 *      tags: [/api/documents]
 *      consumes:
 *        - application/json
 *      description: This should delete an existing document
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the document to delete.
 *      schema:
 *        type: object
 *        required:
 *          - id
 *      responses:
 *        200:
 *          description: document deleted successfully
 *          schema:
 *            type: string
 *        400:
 *          description: Bad Request
 *          schema:
 *            type: string
 *        401:
 *          description: Unauthorized
 *          schema:
 *            type: string
 *        404:
 *          description: Could not find the document with the given ID
 *          schema:
 *            type: string
 * */
// ,
router.delete('/:id', authMiddleware, documentController.delete);

export default router;
