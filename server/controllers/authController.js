const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/emailService');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already registered' 
      });
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    // Save user
    await user.save();

    try {
      // Send verification email
      await sendVerificationEmail(user.email, verificationToken);
    } catch (emailError) {
      // If email sending fails, delete the user and return error
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to send verification email. Please try again.',
        error: emailError.message 
      });
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Registration failed',
      error: error.message 
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check role
    if (user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'You are not allowed to login from here' 
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check email verification
    if (!user.isEmailVerified) {
      return res.status(401).json({ 
        message: 'Please verify your email before logging in' 
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid or expired verification token' 
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check role
    if (user.role !== 'customer') {
      return res.status(403).json({ 
        message: 'You are not allowed to login from here' 
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check email verification
    if (!user.isEmailVerified) {
      return res.status(401).json({ 
        message: 'Please verify your email before logging in' 
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 