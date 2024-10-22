const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const Register = mongoose.model('Register', RegisterSchema);

module.exports = Register;
