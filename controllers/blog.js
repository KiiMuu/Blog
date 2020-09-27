const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tag');
const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { smartTrim } = require('../helpers/blog');
const fs = require('fs');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');

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
    const slug = req.params.slug.toLowerCase();
    
    Blog.findOne({ slug })
    // .select('-photo')
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select('_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt')
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    });
}

exports.removeBlog = (req, res, next) => {
    const slug = req.params.slug.toLowerCase();

    Blog.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: 'Blog deleted successfully'
        });
    });
}

exports.updateBlog = (req, res, next) => {
    const slug = req.params.slug.toLowerCase();

    Blog.findOne({ slug }).exec((err, oldBlog) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        let form = new formidable.IncomingForm();  
        
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }
    
            let slugBeforeMerge = oldBlog.slug;
            oldBlog = _.merge(oldBlog, fields);
            oldBlog.slug = slugBeforeMerge;

            const { body, mdesc, categories, tags } = fields;
    
            if (body) {
                oldBlog.excerpt = smartTrim(body, 320, ' ', ' ...');
                oldBlog.mdesc = stripHtml(body.substring(0, 160));
            }

            if (categories) {
                oldBlog.categories = categories.split(',')
            }

            if (tags) {
                oldBlog.tags = tags.split(',')
            }
    
            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 1MB in size'
                    });
                }
    
                oldBlog.photo.data = fs.readFileSync(files.photo.path);
                oldBlog.photo.contentType = files.photo.type;
            }
    
            oldBlog.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }

                // result.photo = undefined;
                res.json(result);
            });
        });
    });
}

exports.blogPhoto = (req, res, next) => {
    const slug = req.params.slug.toLowerCase();

    Blog.findOne({ slug })
    .select('photo')
    .exec((err, blog) => {
        if (err || !blog) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.set('Content-Type', blog.photo.contentType);
        return res.send(blog.photo.data);
    });
}


exports.relatedBlogs = (req, res, next) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 3;
    const { _id, categories } = req.body.blog;

    Blog.find({ 
        _id: {
            $ne: _id, // ne => not equa
        },
        categories: {
            $in: categories
        }
    })
    .limit(limit)
    .populate('postedBy', '_id name username profile')
    .select('title slug excerpt postedBy createdAt updatedAt')
    .exec((err, blogs) => {
        if (err) {
            return res.status(400).json({
                error: 'Blog not found'
            });
        }

        res.json(blogs);
    });
}

exports.blogsSearch = (req, res, next) => {
    const { search } = req.query;

    if (search) {
        Blog.find({
            $or: [
                {
                    title: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    body: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ]
        }, (err, blogs) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(blogs);
        }).select('-photo -body');
    }
}

exports.blogsByUser = (req, res, next) => {
    const username = req.params.username;

    User.findOne({ username }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        let userId = user._id;
        
        // list all blogs by this user
        Blog.find({ postedBy: userId })
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(data);
        });
    });
}