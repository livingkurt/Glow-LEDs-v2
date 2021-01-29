const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('./config');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
// const User = require('../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post(
	'/register',
	(
		req: { body: { email: any; first_name: any; last_name: any; password: any } },
		res: {
			status: (arg0: number) => { (): any; new (): any; json: { (arg0: { email: string }): any; new (): any } };
			json: (arg0: any) => any;
		}
	) => {
		// Form validation

		const { errors, isValid } = validateRegisterInput(req.body);

		// Check validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		User.findOne({ email: req.body.email }).then((user: any) => {
			if (user) {
				return res.status(400).json({ email: 'Email already exists' });
			} else {
				const newUser = new User({
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: req.body.password
				});

				// Hash password before saving in database
				bcrypt.genSalt(10, (err: any, salt: any) => {
					bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
						if (err) throw err;
						newUser.password = hash;
						newUser.save().then((user: any) => res.json(user)).catch((err: any) => console.log(err));
					});
				});
			}
		});
	}
);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post(
	'/login',
	(
		req: { body: { email: any; password: any } },
		res: {
			status: (
				arg0: number
			) => {
				(): any;
				new (): any;
				json: { (arg0: { emailnotfound?: string; passwordincorrect?: string }): any; new (): any };
			};
			json: (arg0: { success: boolean; token: string }) => void;
		}
	) => {
		// Form validation

		const { errors, isValid } = validateLoginInput(req.body);

		// Check validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const email = req.body.email;
		const password = req.body.password;

		// Find user by email
		User.findOne({ email }).then((user: { password: any; id: any; first_name: any }) => {
			// Check if user exists
			if (!user) {
				return res.status(404).json({ emailnotfound: 'Email not found' });
			}

			// Check password
			bcrypt.compare(password, user.password).then((isMatch: any) => {
				if (isMatch) {
					// User matched
					// Create JWT Payload
					const payload = {
						id: user.id,
						first_name: user.first_name
					};

					// Sign token
					jwt.sign(
						payload,
						config.JWT_SECRET,
						{
							expiresIn: '48hr' // 1 year in seconds
						},
						(err: any, token: string) => {
							res.json({
								success: true,
								token: 'Bearer ' + token
							});
						}
					);
				} else {
					return res.status(400).json({ passwordincorrect: 'Password incorrect' });
				}
			});
		});
	}
);

module.exports = router;
