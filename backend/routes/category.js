const express = require('express');
const router = express.Router();

// controllers
const categoryController = require('../controllers/category');
const authController = require('../controllers/auth');

// validators
const { runValidation } = require('../validators/index');
const { categoryValidator } = require('../validators/cateogry');

// endpoints
router.post(
    '/category', 
    runValidation,
    categoryValidator,
    authController.requireSignIn, 
    authController.adminMiddleware,
    categoryController.create
);

module.exports = router;