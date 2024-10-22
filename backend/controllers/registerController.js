const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Register = require('../models/Register'); // Updated to use Register model

// Create a new user and generate a token
const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Email, password, and name are required' });
        }

        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Register({ email, password: hashedPassword, name });
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(201).json({ message: 'User signup successful!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users
const getAllusers = async (req, res) => {
    try {
        const users = await Register.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Searching went wrong', error });
    }
};

// Get a user by ID
const getuserbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Register.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal error' });
    }
};

// Update a user
const updateuser = async (req, res) => {
    const { id } = req.params;
    const { email, password, name } = req.body;
    try {
        const updateData = { email, name };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const userUpdate = await Register.findByIdAndUpdate(id, updateData, { new: true });
        if (!userUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: userUpdate });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user
const deleteuser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await Register.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
};

module.exports = { signup, getAllusers, getuserbyid, updateuser, deleteuser };
