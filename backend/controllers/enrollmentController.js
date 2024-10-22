const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Register = require('../models/Register'); // Your user model

// Enroll in a course
exports.enrollInCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Check if the user is already enrolled
        const existingEnrollment = await Enrollment.findOne({ userId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
        }

        // Create new enrollment
        const enrollment = new Enrollment({ userId, courseId });
        await enrollment.save();

        res.status(201).json({ success: true, message: 'Successfully enrolled in the course', enrollment });
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};
