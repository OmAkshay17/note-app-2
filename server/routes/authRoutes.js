// server/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in' });
    }
});

// Logout route
router.post('/logout', authMiddleware, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
