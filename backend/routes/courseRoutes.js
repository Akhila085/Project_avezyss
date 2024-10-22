const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} = require('../controllers/coursesController'); // Adjust the path as needed

// Route to get all courses
router.get('/', getAllCourses);

// Route to create a new course
router.post('/', createCourse);

// Route to update a course by its ID
router.put('/:courseId', updateCourse);

// Route to delete a course by its ID
router.delete('/:courseId', deleteCourse);

module.exports = router;
