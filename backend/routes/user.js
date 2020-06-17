const express = require('express');
const router = express.Router();

// controllers
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

// endpoints
router.get(
    '/profile', 
    authController.requireSignIn, 
    authController.authMiddleware,
    userController.read
);

module.exports = router;