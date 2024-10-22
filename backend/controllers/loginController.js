const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Signup = require('../models/Register'); 
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const loginController = async (req, res) => {
    const { email, password ,token:setToken} = req.body;

    try {
        const user = await Signup.findOne({ email }); 
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a new token with a 30 seconds expiration time
const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30s' });

// Step 2: Validate the token if provided in body, params, or headers
const tokenToValidate = setToken

if (tokenToValidate) {
    try {
        const decoded = jwt.verify(tokenToValidate, JWT_SECRET);
        return res.json({ message: "Token is valid", user: decoded });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: "Token expired." });
        }
        return res.status(400).json({ message: "Invalid token." });
    }
}

return res.json({ token, message: "Login successful" });


    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { loginController };

