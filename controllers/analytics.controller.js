const model = require('../models/analytics.model');

exports.getStudentsWithAvgGrade = async (_req, res) => {
    const data = await model.getStudentsWithAvgGrade();
    res.json(data);
};

exports.getStudentsInSQLCourse = async (_req, res) => {
    const data = await model.getStudentsInCourse('SQL Basics');
    res.json(data);
};

exports.getTopStudent = async (_req, res) => {
    const data = await model.getTopStudent();
    res.json(data);
};

exports.getStudentCountPerCourse = async (_req, res) => {
    const data = await model.getStudentCountPerCourse();
    res.json(data);
};

exports.getCoursesWithHighAvgGrade = async (_req, res) => {
    const data = await model.getCoursesWithHighAvgGrade(85);
    res.json(data);
};

exports.getStudentsListByCourseTitle = async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: 'Missing course title in query params' });
    }

    try {
        const data = await model.getStudentsInCourse(title);
        res.json(data);
    } catch (error) {
        console.error('Error fetching students by course title:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
