import { Router } from 'express';

import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from '../controllers/post.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API endpoints for managing blog posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve a list of blog posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 totalCount:
 *                   type: integer
 *                   example: 42
 */
router.get('/', getPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Blog post data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.get('/:id', getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post created
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input
 */
router.post('/', authMiddleware, createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post updated
 *       403:
 *         description: Forbidden - insufficient permissions or not the author
 *       404:
 *         description: Post not found
 */
router.put('/:id', authMiddleware, updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted
 *       404:
 *         description: Post not found
 */
router.delete('/:id', authMiddleware, deletePost);

export default router;
