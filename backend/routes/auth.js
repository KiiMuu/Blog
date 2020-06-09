const express = require('express');
const router = express.Router();

// controllers
const authController = require('../controllers/auth');

// validators
const { runValidation } = require('../validators/index');
const { userSignUpValidator, userSignInValidator } = require('../validators/auth');

// endpoints
router.post(
    '/signup', 
    userSignUpValidator,
    runValidation, 
    authController.signup
);
router.post(
    '/signin', 
    userSignInValidator,
    runValidation, 
    authController.signin
);

module.exports = router;