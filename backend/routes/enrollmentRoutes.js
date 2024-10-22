const express = require('express');
const router = express.Router();
const { enrollInCourse } = require('../controllers/enrollmentController');

// Route to enroll in a course
router.post('/enroll', enrollInCourse);

module.exports = router;
