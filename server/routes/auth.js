const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validators');

// Registration routes
router.post('/register/customer', validateRegistration, (req, res) => {
  req.body.role = 'customer';
  authController.registerUser(req, res);
});

router.post('/register/admin', validateRegistration, (req, res) => {
  req.body.role = 'admin';
  authController.registerUser(req, res);
});

// Login routes
router.post('/login/admin', validateLogin, authController.adminLogin);
router.post('/login/customer', validateLogin, authController.customerLogin);

// Email verification
router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router; 