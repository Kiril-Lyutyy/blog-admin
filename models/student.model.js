const db = require('../db.js');

const getAllStudents = async () => {
    const [rows] = await db.query('SELECT * FROM Students');

    return rows;
}

const getStudentById = async (id) => {
    const [rows] = await db.query('SELECT * FROM Students WHERE id = ?', [id]);

    return rows[0];
}

const createStudent = async ({ firstName, lastName, email }) => {
    const [result] = await db.query(
        'INSERT INTO Students (first_name, last_name, email) VALUES (?, ?, ?)',
        [firstName, lastName, email]
    );

    return {
        id: result.insertId,
        firstName,
        lastName,
        email,
    };
}

const deleteStudent = async (id) => {
    const student = await getStudentById(id);

    if (!student) {
        return null;
    }

    await db.query('DELETE FROM Enrollments WHERE student_id = ?', [id]);
    await db.query('DELETE FROM Students WHERE id = ?', [id]);

    return student;
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudent,
};