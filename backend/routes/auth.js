const express = require('express');
const router = express.Router();

// controllers
const authController = require('../controllers/auth');

// validators
const { runValidation } = require('../validators/index');
const { userSignUpValidator } = require('../validators/auth');

// endpoints
router.post(
    '/signup', 
    userSignUpValidator,
    runValidation, 
    authController.signup
);

module.exports = router;