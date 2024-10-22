const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register', // Referencing the 'Register' model, which is your user model
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Referencing the 'Course' model
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
