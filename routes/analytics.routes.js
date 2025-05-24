/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics endpoints
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/analytics.controller.js');

/**
 * @swagger
 * /api/analytics/avg-grades:
 *   get:
 *     summary: Get all students with their average grades
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: List of students with average grades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   avg_grade:
 *                     type: number
 *                     format: float
 */
router.get('/avg-grades', controller.getStudentsWithAvgGrade);

/**
 * @swagger
 * /api/analytics/students-by-course:
 *   get:
 *     summary: Get students enrolled in a specific course by title
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Course title
 *     responses:
 *       200:
 *         description: List of students in the specified course
 */
router.get('/students-by-course', controller.getStudentsListByCourseTitle);

/**
 * @swagger
 * /api/analytics/top-student:
 *   get:
 *     summary: Get the student with the highest average grade
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Top-performing student
 */
router.get('/top-student', controller.getTopStudent);

/**
 * @swagger
 * /api/analytics/students-per-course:
 *   get:
 *     summary: Get the number of students per course
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: List of courses with student counts
 */
router.get('/students-per-course', controller.getStudentCountPerCourse);

/**
 * @swagger
 * /api/analytics/courses-high-grade:
 *   get:
 *     summary: Get courses with average grades greater than 85
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: List of high-performing courses
 */
router.get('/courses-high-grade', controller.getCoursesWithHighAvgGrade);

module.exports = router;
