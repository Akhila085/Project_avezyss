const Course = require('../models/Course'); // Adjust the path as needed

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create a new course
const createCourse = async (req, res) => {
    const { title, description, category, trainerId } = req.body;

    if (!title || !description || !category) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const newCourse = new Course({
            title,
            description,
            category,
            trainerId, // Assuming the trainer's ID is sent in the request body
        });

        await newCourse.save();
        res.status(201).json({ success: true, course: newCourse });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update a course by its ID
const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const { title, description, category } = req.body;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { title, description, category },
            { new: true } // Return the updated course
        );

        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, course: updatedCourse });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete a course by its ID
const deleteCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
};
