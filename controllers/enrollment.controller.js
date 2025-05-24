const enrollmentModel = require('../models/enrollment.model');

exports.getAllEnrollments = async (_req, res) => {
    try {
        const enrollments = await enrollmentModel.getAllEnrollments();
        res.status(200).json(enrollments);
    } catch (err) {
        console.error('Error fetching enrollments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await enrollmentModel.getEnrollmentById(req.params.id);
        if (enrollment) {
            res.status(200).json(enrollment);
        } else {
            res.status(404).json({ error: 'Enrollment not found' });
        }
    } catch (err) {
        console.error('Error fetching enrollment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createEnrollment = async (req, res) => {
    const { student_id, course_id, grade } = req.body;
    
    try {
        const newEnrollment = await enrollmentModel.createEnrollment({ student_id, course_id, grade });
        res.status(201).json(newEnrollment);
    } catch (err) {
        console.error('Error creating enrollment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteEnrollment = async (req, res) => {
    try {
        const deleted = await enrollmentModel.deleteEnrollment(req.params.id);

        if (deleted) {
            res.status(200).json({ message: 'Enrollment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Enrollment not found' });
        }
    } catch (err) {
        console.error('Error deleting enrollment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
