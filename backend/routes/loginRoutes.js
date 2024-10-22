const express = require('express');
const router = express.Router();
const {  loginController } = require('../controllers/loginController');

// POST route for user login
router.post('/login', loginController);

module.exports = router;
