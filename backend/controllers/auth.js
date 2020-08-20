const User = require('../models/user');
const Blog = require('../models/blog');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { google } = require('googleapis');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.preSignup = (req, res, next) => {
    const { name, email, password } = req.body;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken 🌚'
            });
        }

        const token = jwt.sign(
            { name, email, password }, 
            process.env.JWT_ACCOUNT_ACTIVATION, 
            { expiresIn: '10m' }
        );

        nodemailer.createTestAccount((err, account) => {
            const htmlEmail = `
                <p>Please use the following link to activate your account:</p>
                <p>${process.env.CLIENT_URL}/auth/account/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>https://bloggawy.com</p>
            `
    
            let transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                port: 123,
                secure: true,
                auth: {
                    user: `${process.env.EMAIL_TO}`,
                    pass: `${process.env.EMAIL_PASS}`
                }
            }));
    
            let mailOptions = {
                to: email,
                from: process.env.EMAIL_FROM,
                subject: `Account activation link`,
                html: htmlEmail
            }
    
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(400).json({ 
                        errors: [{ 
                            message: err 
                        }] 
                    });
                }
    
                res.json({ 
                    message: `Email has been sent to ${email}. Follow the instructions to activate your account. Link expires in 10-min.`
                });
            });
        });
    });
}

// exports.signup = (req, res, next) => {
//     User.findOne({ email: req.body.email }).exec((err, user) => {
//         if (user) {
//             return res.status(400).json({
//                 error: 'Email is taken 🌚'
//             });
//         }

//         const { name, email, password } = req.body;
//         let username = shortId.generate();
//         let profile = `${process.env.CLIENT_URL}/profile/${username}`;

//         let newUser = new User({
//             name,
//             email,
//             password,
//             profile,
//             username
//         });

//         newUser.save((err, success) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: err
//                 });
//             }

//             res.json({
//                 message: 'Signup success! Please Signin.'
//             });
//         });
//     });
// }

exports.signup = (req, res, next) => {
    const token = req.body.token;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Signup again'
                });
            }

            const { name, email, password } = jwt.decode(token);

            let username = shortId.generate();
            let profile = `${process.env.CLIENT_URL}/profile/${username}`;

            let user = new User({
                name,
                email,
                password,
                profile,
                username
            });
    
            user.save((err, success) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }

                return res.json({
                    message: 'Signup success! Please Signin.'
                });
            });
        });
    } else {
        return res.json({
            message: 'Something went wrong. Try again'
        });
    }
}

exports.signin = (req, res, next) => {
    const { email, password } = req.body;

    // check existing of user
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with this Email does not exist'
            });
        }

        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            });
        }

        // generate token and send to client
        const token = jwt.sign(
            { _id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.cookie('token', token, { expiresIn: '1d' });

        const { _id, username, email, name, role } = user;

        return res.json({
            token,
            user: { _id, username, email, name, role }
        });
    });
}

exports.signout = (req, res, next) => {
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
}

// protect routes
exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET
});

exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;

    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        req.profile = user;
        next();
    });
}

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;

    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        // if user not admin
        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }

        req.profile = user;
        next();
    });
}

exports.canUpdateDeleteBlog = (req, res, next) => {
    const slug = req.params.slug.toLowerCase();

    Blog.findOne({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        let authorizedUser = data.postedBy._id.toString() === req.profile._id.toString();

        if (!authorizedUser) {
            return res.status(400).json({
                error: 'You are not authorized'
            });
        }

        next();
    });
}

exports.forgotPassword = (req, res, next) => {
    const { email } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'User does not exist'
            });
        }

        const token = jwt.sign(
            { _id: user._id }, 
            process.env.JWT_RESET_PASSWORD, 
            { expiresIn: '10m' }
        );

        // email
        // populating the db > user > resetPasswordLink
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.status(400).json({ 
                    error: errorHandler(err)
                });
            } else {
                nodemailer.createTestAccount((err, account) => {
                    const htmlEmail = `
                        <p>Please use the following link to reset your password:</p>
                        <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                        <hr />
                        <p>This email may contain sensetive information</p>
                        <p>https://bloggawy.com</p>
                    `
            
                    let transporter = nodemailer.createTransport(smtpTransport({
                        service: 'gmail',
                        port: 123,
                        secure: true,
                        auth: {
                            user: `${process.env.EMAIL_TO}`,
                            pass: `${process.env.EMAIL_PASS}`
                        }
                    }));
            
                    let mailOptions = {
                        to: email,
                        from: process.env.EMAIL_FROM,
                        subject: `Password reset link`,
                        html: htmlEmail
                    }
            
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            return res.status(400).json({ 
                                errors: [{ 
                                    message: err 
                                }] 
                            });
                        }
            
                        res.json({ 
                            message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10-min.`
                        });
                    });
                });
            }
        });
    });
}

exports.resetPassword = (req, res, next) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(401).json({ 
                    error: 'Expired link. Try again'
                });
            }

            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        error: 'Something went wrong. Try later'
                    });
                }

                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                }

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }

                    res.json({
                        message: 'Done. Now you can login with your new password'
                    });
                });
            });
        });
    }
}

exports.googleSignin = (req, res, next) => {
    const idToken = req.body.tokenId;
    var Oauth2 = google.auth.OAuth2;
    var client = new Oauth2(process.env.GOOGLE_CLIENT_ID);

    client.verifyIdToken({ idToken, audiance: process.env.GOOGLE_CLIENT_ID}).then(response => {
        const { email_verified, name, email, jti } = response.payload;

        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (user) {
                    // console.log(user);
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
                    res.cookie('token', token, { expiresIn: '1d' });

                    const { _id, email, name, role, username } = user;

                    return res.json({
                        token,
                        user: {
                            _id,
                            email,
                            name,
                            role,
                            username
                        }
                    });
                } else {
                    let username = shortId.generate();
                    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
                    let password = jti + process.env.JWT_SECRET;
                    user = new User({
                        name,
                        email,
                        profile,
                        username,
                        password
                    });

                    user.save((err, data) => {
                        if (err) {
                            return res.status(400).json({
                                err: errorHandler(err)
                            });
                        }

                        const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
                        res.cookie('token', token, { expiresIn: '1d' });

                        const { _id, email, name, role, username } = data;

                        return res.json({
                            token,
                            user: {
                                _id,
                                email,
                                name,
                                role,
                                username
                            }
                        });
                    });
                }
            });
        } else {
            return res.status(400).json({
                err: 'Google signin failed. Try again'
            });
        }
    });
}