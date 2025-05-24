/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Enrollment management
 */

const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: List of enrollments
 */
router.get('/', enrollmentController.getAllEnrollments);

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Enroll a student to a course
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - course_id
 *             properties:
 *               student_id:
 *                 type: integer
 *               course_id:
 *                 type: integer
 *               grade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Enrollment created
 */
router.post('/', enrollmentController.createEnrollment);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   get:
 *     summary: Get a single enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment found
 *       404:
 *         description: Enrollment not found
 */
router.get('/:id', enrollmentController.getEnrollmentById);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   delete:
 *     summary: Delete an enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *       404:
 *         description: Enrollment not found
 */
router.delete('/:id', enrollmentController.deleteEnrollment);

module.exports = router;
