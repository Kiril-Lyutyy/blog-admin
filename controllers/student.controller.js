const studentModel = require('../models/student.model.js');

exports.getAllStudents = async (_req, res) => {
    try {
        const students = await studentModel.getAllStudents();

        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);

        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getStudentById = async (req, res) => {
    const studentId = req.params.id;

    try {
        const student = await studentModel.getStudentById(studentId);

        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error fetching student:', error);

        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createStudent = async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        const newStudent = await studentModel.createStudent({ firstName, lastName, email });

        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error creating student:', error);

        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteStudent = async (req, res) => {
    const studentId = req.params.id;

    try {
        const deletedStudent = await studentModel.deleteStudent(studentId);

        if (deletedStudent) {
            res.status(200).json(deletedStudent);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error deleting student:', error);

        res.status(500).json({ error: 'Internal server error' });
    }
}