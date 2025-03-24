const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Generate verification token
const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Send verification email
const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        html: `
            <h1>Email Verification</h1>
            <p>Please click the link below to verify your email:</p>
            <a href="${verificationUrl}">${verificationUrl}</a>
            <p>This link will expire in 24 hours.</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

// Customer Registration
router.post('/register/customer', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            role: 'customer'
        });

        // Generate verification token
        user.emailVerificationToken = generateVerificationToken();
        user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

        await user.save();

        // Send verification email
        await sendVerificationEmail(email, user.emailVerificationToken);

        res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.'
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// Admin Registration
router.post('/register/admin', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new admin user
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            role: 'admin'
        });

        // Generate verification token
        user.emailVerificationToken = generateVerificationToken();
        user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

        await user.save();

        // Send verification email
        await sendVerificationEmail(email, user.emailVerificationToken);

        res.status(201).json({
            message: 'Admin registration successful. Please check your email to verify your account.'
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// Admin Login
router.post('/login/admin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if user is admin
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not allowed to login from here' });
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
            return res.status(401).json({ message: 'Please verify your email first' });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Email Verification
router.get('/verify-email/:token', async (req, res) => {
    try {
        const user = await User.findOne({
            emailVerificationToken: req.params.token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;

        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Email verification failed', error: error.message });
    }
});

module.exports = router; 