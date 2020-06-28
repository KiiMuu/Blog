const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tag');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { smartTrim } = require('../helpers/blog');
const fs = require('fs');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const blog = require('../models/blog');

exports.createBlog = (req, res, next) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }

        const { title, body, categories, tags } = fields;

        if (!title || !title.length) {
            return res.status(400).json({
                error: 'Title is required'
            });
        }

        if (!body || body.length < 200) {
            return res.status(400).json({
                error: 'Content is too short'
            });
        }

        if (!categories || categories.length === 0) {
            return res.status(400).json({
                error: 'At least one category is required'
            });
        }

        if (!tags || tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            });
        }

        const blog = new Blog({
            title,
            body,
            excerpt: smartTrim(body, 320, ' ', ' ...'),
            slug: slugify(title).toLowerCase(),
            mtitle: `${title} | ${process.env.APP_NAME}`,
            mdesc: stripHtml(body.substring(0, 160)),
            postedBy: req.user._id
        });

        // categories and tags
        let arrOfCategories = categories && categories.split(',');
        let arrOfTags = tags && tags.split(',');

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1MB in size'
                });
            }

            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }

        blog.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            Blog.findByIdAndUpdate(result._id, 
                { $push: {
                    categories: arrOfCategories
                }}, 
                { new: true }).exec((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    } else {
                        Blog.findByIdAndUpdate(result._id, 
                            { $push: {
                                tags: arrOfTags
                            }}, { new: true }).exec((err, result) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: errorHandler(err)
                                    });
                                } else {
                                    res.json(result);
                                }
                            });
                    }
                });
        });
    });
}

exports.allBlogs = (req, res, next) => {
    Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    });
}

exports.allCatgeoriesTagsBlogs = (req, res, next) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let blogs, categories, tags;

    Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username profile')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        blogs = data; // blogs

        // get all categories
        Category.find({}).exec((err, c) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            categories = c; // categories

            // get all tags
            Tag.find({}).exec((err, t) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }

                tags = t; // tags

                // return all blogs, categories and tags
                res.json({ 
                    blogs, 
                    categories, 
                    tags,
                    size: blogs.length 
                });
            });
        });
    });
}

exports.readBlog = (req, res, next) => {
    
}

exports.removeBlog = (req, res, next) => {
    
}

exports.updateBlog = (req, res, next) => {
    
}