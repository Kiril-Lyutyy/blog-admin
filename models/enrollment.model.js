const db = require('../db');

const getAllEnrollments = async () => {
    const [rows] = await db.query(
        `SELECT Enrollments.*, Students.first_name, Students.last_name, Courses.title
         FROM Enrollments
         JOIN Students ON Enrollments.student_id = Students.id
         JOIN Courses ON Enrollments.course_id = Courses.id`
    );
    
    return rows;
};

const getEnrollmentById = async (id) => {
    const [rows] = await db.query('SELECT * FROM Enrollments WHERE id = ?', [id]);
    
    return rows[0];
};

const createEnrollment = async ({ student_id, course_id, grade }) => {
    const [result] = await db.query(
        'INSERT INTO Enrollments (student_id, course_id, grade) VALUES (?, ?, ?)',
        [student_id, course_id, grade]
    );

    return { id: result.insertId, student_id, course_id, grade };
};

const deleteEnrollment = async (id) => {
    const [result] = await db.query('DELETE FROM Enrollments WHERE id = ?', [id]);

    return result.affectedRows > 0;
};

module.exports = {
    getAllEnrollments,
    getEnrollmentById,
    createEnrollment,
    deleteEnrollment
};
