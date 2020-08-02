const express = require('express');
const router = express.Router();

// controllers
const authController = require('../controllers/auth');

// validators
const { runValidation } = require('../validators/index');
const { 
    userSignUpValidator, 
    userSignInValidator, 
    forgotPasswordValidator ,
    resetPasswordValidator
} = require('../validators/auth');

// endpoints
router.post(
    '/pre-signup', 
    userSignUpValidator,
    runValidation, 
    authController.preSignup
);
router.post(
    '/signup',
    authController.signup
);
router.post(
    '/signin', 
    userSignInValidator,
    runValidation, 
    authController.signin
);
router.get(
    '/signout',
    authController.signout
);
router.put(
    '/forgot-password',
    forgotPasswordValidator,
    runValidation,
    authController.forgotPassword
);
router.put(
    '/reset-password',
    resetPasswordValidator,
    runValidation,
    authController.resetPassword
);

module.exports = router;