"use strict";
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// const config = require('./config');
var passport = require('passport');
// Load input validation
var validateRegisterInput = require('../validation/register');
var validateLoginInput = require('../validation/login');
// Load User model
// const User = require('../models/User');
// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', function (req, res) {
    // Form validation
    var _a = validateRegisterInput(req.body), errors = _a.errors, isValid = _a.isValid;
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(function (user) {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        }
        else {
            var newUser_1 = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser_1.password, salt, function (err, hash) {
                    if (err)
                        throw err;
                    newUser_1.password = hash;
                    newUser_1.save().then(function (user) { return res.json(user); }).catch(function (err) { return console.log(err); });
                });
            });
        }
    });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', function (req, res) {
    // Form validation
    var _a = validateLoginInput(req.body), errors = _a.errors, isValid = _a.isValid;
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    var email = req.body.email;
    var password = req.body.password;
    // Find user by email
    User.findOne({ email: email }).then(function (user) {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
        }
        // Check password
        bcrypt.compare(password, user.password).then(function (isMatch) {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                var payload = {
                    id: user.id,
                    first_name: user.first_name
                };
                // Sign token
                jwt.sign(payload, config.JWT_SECRET, {
                    expiresIn: '48hr' // 1 year in seconds
                }, function (err, token) {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            }
            else {
                return res.status(400).json({ passwordincorrect: 'Password incorrect' });
            }
        });
    });
});
module.exports = router;
