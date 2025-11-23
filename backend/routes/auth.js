const express = require('express');
const passport = require('passport');
const { authenticateToken } = require('../middleware/auth');
const {
  register,
  login,
  googleLogin,
  googleCallback,
  setGooglePassword,
  verifyGooglePassword,
  getMe,
  logout
} = require('../controllers/authController');

const router = express.Router();

// Manual registration
router.post('/register', register);

// Manual login
router.post('/login', login);

// Google OAuth routes
router.get('/google', googleLogin);
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  googleCallback
);

// Set password after Google OAuth
router.post('/google/set-password', authenticateToken, setGooglePassword);

// Verify internal password for Google OAuth users
router.post('/google/verify-password', verifyGooglePassword);

// Get current user
router.get('/me', authenticateToken, getMe);

// Logout
router.post('/logout', logout);

module.exports = router;
