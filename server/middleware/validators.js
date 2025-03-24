const validateRegistration = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check for required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      });
    }

    // Name validation
    if (firstName.length < 2 || lastName.length < 2) {
      return res.status(400).json({ 
        success: false,
        message: 'First name and last name must be at least 2 characters long' 
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation error',
      error: error.message 
    });
  }
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation error',
      error: error.message 
    });
  }
};

module.exports = {
  validateRegistration,
  validateLogin
}; 