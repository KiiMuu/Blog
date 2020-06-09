const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken 🌚'
            });
        }

        const { name, email, password } = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({
            name,
            email,
            password,
            profile,
            username
        });

        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            // res.json({
            //     user: success
            // });
            res.json({
                message: 'SignUp success! Please SignIn.'
            });
        });
    });
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
            {_id: user._id}, 
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