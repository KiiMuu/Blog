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
    categoryController.createCategory
);
router.get('/categories', categoryController.categoriesList);
router.get('/category/:slug', categoryController.readCategory);
router.delete(
    '/category/:slug', 
    authController.requireSignIn, 
    authController.adminMiddleware,
    categoryController.removeCategory
);

module.exports = router;