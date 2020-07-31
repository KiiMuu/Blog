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
router.get('/user/:username', userController.publicProfile);
router.put(
    '/user/update', 
    authController.requireSignIn, 
    authController.authMiddleware,
    userController.updateProfile
);
router.get('/user/photo/:username', userController.userPhoto);

module.exports = router;