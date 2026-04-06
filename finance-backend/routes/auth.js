const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  getUsers
} = require('../controllers/authController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', [
  body('name').notEmpty().trim().escape(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], registerUser);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], loginUser);

// Protected routes
router.get('/users', authenticate, authorizeRoles('admin'), getUsers);

module.exports = router;

