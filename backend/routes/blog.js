const express = require('express');

// controllers
const blogController = require('../controllers/blog');
const authController = require('../controllers/auth');

const router = express.Router();

router.post(
    '/blog',
    authController.requireSignIn, 
    authController.adminMiddleware, 
    blogController.createBlog
);
router.get('/blogs', blogController.allBlogs);
router.post('/blogs-categories-tags', blogController.allCatgeoriesTagsBlogs);
router.get('/blog/:slug', blogController.readBlog);
router.delete(
    '/blog/:slug',
    authController.requireSignIn, 
    authController.adminMiddleware,  
    blogController.removeBlog
);
router.put(
    '/blog/:slug',
    authController.requireSignIn, 
    authController.adminMiddleware,  
    blogController.updateBlog
);
router.get('/blog/photo/:slug', blogController.blogPhoto);
router.post('/blogs/related', blogController.relatedBlogs);
router.get('/blogs/search', blogController.blogsSearch);

module.exports = router;