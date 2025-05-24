const db = require('../db');

const getStudentsWithAvgGrade = async () => {
    const [rows] = await db.query(`
        SELECT s.id, s.first_name, s.last_name, AVG(e.grade) AS average_grade
        FROM Students s
        JOIN Enrollments e ON s.id = e.student_id
        GROUP BY s.id
    `);
    return rows;
};

const getStudentsInCourse = async (courseTitle) => {
    const [rows] = await db.query(`
        SELECT s.id, s.first_name, s.last_name
        FROM Students s
        JOIN Enrollments e ON s.id = e.student_id
        JOIN Courses c ON e.course_id = c.id
        WHERE c.title = ?
    `, [courseTitle]);
    return rows;
};

const getTopStudent = async () => {
    const [rows] = await db.query(`
        SELECT s.id, s.first_name, s.last_name, AVG(e.grade) AS average_grade
        FROM Students s
        JOIN Enrollments e ON s.id = e.student_id
        GROUP BY s.id
        ORDER BY average_grade DESC
        LIMIT 1
    `);
    return rows[0];
};

const getStudentCountPerCourse = async () => {
    const [rows] = await db.query(`
        SELECT c.title, COUNT(e.student_id) AS student_count
        FROM Courses c
        LEFT JOIN Enrollments e ON c.id = e.course_id
        GROUP BY c.id
    `);
    return rows;
};

const getCoursesWithHighAvgGrade = async (threshold = 85) => {
    const [rows] = await db.query(`
        SELECT c.title, AVG(e.grade) AS average_grade
        FROM Courses c
        JOIN Enrollments e ON c.id = e.course_id
        GROUP BY c.id
        HAVING average_grade > ?
    `, [threshold]);
    return rows;
};

module.exports = {
    getStudentsWithAvgGrade,
    getStudentsInCourse,
    getTopStudent,
    getStudentCountPerCourse,
    getCoursesWithHighAvgGrade
};
