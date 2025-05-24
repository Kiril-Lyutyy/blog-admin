const db = require('../db.js');

const getAllCourses = async () => {
    const [rows] = await db.query('SELECT * FROM Courses');

    return rows;
}

const getCourseById = async (id) => {
    const [rows] = await db.query('SELECT * FROM Courses WHERE id = ?', [id]);

    return rows[0];
}

const createCourse = async ({ title, description }) => {
    const [result] = await db.query(
        'INSERT INTO Courses (title, description) VALUES (?, ?)',
        [title, description]
    );

    return {
        id: result.insertId,
        title,
        description,
    };
}

const deleteCourse = async (id) => {
    const course = await getCourseById(id);

    if (!course) {
        return null;
    }

    await db.query('DELETE FROM Enrollments WHERE course_id = ?', [id]);
    await db.query('DELETE FROM Courses WHERE id = ?', [id]);

    return course;
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    deleteCourse,
};