const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the trainer
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
