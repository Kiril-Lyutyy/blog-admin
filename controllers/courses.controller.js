const coursesModel = require('../models/courses.model.js');

exports.getAllCourses = async (_req, res) => {
  try {
    const courses = await coursesModel.getAllCourses();

    res.status(200).json(courses);  
  } catch (error) {
    console.error('Error fetching courses:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getCourseById = async (req, res) => {
    const courseId = req.params.id;
    
    try {
        const course = await coursesModel.getCourseById(courseId);
    
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        console.error('Error fetching course:', error);
    
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createCourse = async (req, res) => {
    const { title, description } = req.body;
    
    try {
        const newCourse = await coursesModel.createCourse({ title, description });
    
        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error creating course:', error);
    
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    
    try {
        const deletedCourse = await coursesModel.deleteCourse(courseId);
    
        if (deletedCourse) {
            res.status(200).json(deletedCourse);
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        console.error('Error deleting course:', error);
    
        res.status(500).json({ error: 'Internal server error' });
    }
}