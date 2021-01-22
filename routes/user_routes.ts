export {};
import express from 'express';
import User from '../models/user';
import Log from '../models/log';
const { getToken, isAuth } = require('../util');
import bcrypt from 'bcryptjs';
import { log_error, log_request } from '../util';
require('dotenv');

const router = express.Router();

// router.get('/', isAuth, async (req: any, res: { send: (arg0: any) => void }) => {
// 	const users = await User.find({ deleted: false }).populate('user').sort({ createdAt: -1 });
// 	res.send(users);
// });

router.get('/', async (req, res) => {
	try {
		const category = req.query.category ? { category: req.query.category } : {};
		const searchKeyword = req.query.searchKeyword
			? {
					first_name: {
						$regex: req.query.searchKeyword,
						$options: 'i'
					}
				}
			: {};

		let sortOrder = {};
		if (req.query.sortOrder === 'first name') {
			sortOrder = { first_name: 1 };
		} else if (req.query.sortOrder === 'last name') {
			sortOrder = { last_name: 1 };
		} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
			sortOrder = { _id: -1 };
		}

		const users = await User.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'User',
			data: users,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.send(users);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Users' });
	}
});

router.get('/:id', isAuth, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id }).populate('affiliate');
		if (user) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(user);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send('Order Not Found.');
		}
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting User' });
	}
});

router.delete('/:id', isAuth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'User',
			data: [ user ],
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		const message: any = { message: 'User Deleted' };
		const deleted_user = await User.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_user) {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'User',
				data: [ deleted_user ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(message);
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'User',
				data: [ deleted_user ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send('Error in Deletion.');
		}
	} catch (error) {
		log_error({
			method: 'DELETE',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Deleting User' });
	}
});

router.put('/password_reset', async (req, res) => {
	console.log({ password_reset: req.body });
	try {
		const user: any = await User.findOne({ _id: req.body.user_id });
		if (!user) {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(404).send({ message: 'User Does Not Exist' });
		} else {
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(req.body.password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					user.password = hash;
					await user.save();
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'User',
						data: [ user ],
						status: 202,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					res.status(202).send({ message: 'Password Saved', data: user });
				});
			});
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Resetting User Password' });
	}
});

router.post('/', async (req, res) => {
	try {
		let user: any = {};
		let hashed_password: string = '';
		const temporary_password = '123456';
		bcrypt.genSalt(10, (err: any, salt: any) => {
			bcrypt.hash(temporary_password, salt, async (err: any, hash: any) => {
				if (err) throw err;
				hashed_password = hash;
				user = { ...req.body, password: hashed_password };
				const newUser = await User.create(user);
				if (newUser) {
					log_request({
						method: 'POST',
						path: req.originalUrl,
						collection: 'User',
						data: [ newUser ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(201).send({ message: 'New User Created', data: newUser });
				} else {
					log_request({
						method: 'POST',
						path: req.originalUrl,
						collection: 'User',
						data: [ newUser ],
						status: 500,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(500).send({ message: ' Error in Creating User.' });
				}
			});
		});
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating User' });
	}
});

// router.put('/shipping', async (req, res) => {
// 	try {
// 		console.log({ shipping: req.body });
// 		const user_id = req.body.user._id;
// 		const user: any = await User.findById(user_id);

// 		if (user) {
// 			const updatedUser = await User.updateOne({ _id: user_id }, { shipping: req.body.shipping });
// 			if (updatedUser) {
// 				log_request({
// 					method: 'PUT',
// 					path: req.originalUrl,
// 					collection: 'User',
// 					data: [ user ],
// 					status: 200,
// 					success: true,
// 					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 				});
// 				// return res.status(200).send({ message: 'User Updated', data: updatedUser });
// 				console.log({ updatedUser });
// 				res.send({
// 					_id: updatedUser.id,
// 					first_name: updatedUser.first_name,
// 					last_name: updatedUser.last_name,
// 					email: updatedUser.email,
// 					affiliate: updatedUser.affiliate,
// 					email_subscription: updatedUser.email_subscription,
// 					is_affiliated: updatedUser.is_affiliated,
// 					isVerified: updatedUser.isVerified,
// 					isAdmin: updatedUser.isAdmin,
// 					shipping: updatedUser.shipping,
// 					token: getToken(updatedUser)
// 				});
// 			}
// 		} else {
// 			log_error({
// 				method: 'PUT',
// 				path: req.originalUrl,
// 				collection: 'User',
// 				data: [ user ],
// 				status: 500,
// 				success: false,
// 				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 			});
// 			return res.status(500).send({ message: ' Error in Updating User.' });
// 		}
// 	} catch (error) {
// 		log_error({
// 			method: 'PUT',
// 			path: req.originalUrl,
// 			collection: 'User',
// 			error,
// 			status: 500,
// 			success: false
// 		});
// 		res.status(500).send({ error, message: 'Error Getting User' });
// 	}
// });

router.put('/:id', isAuth, async (req, res) => {
	try {
		console.log({ user_routes_put: req.body });
		const userId = req.params.id;
		const user: any = await User.findById(userId);
		if (user) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			const updatedUser = await User.updateOne({ _id: userId }, req.body);
			if (updatedUser) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'User',
					data: [ updatedUser ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(200).send({ message: 'User Updated', data: updatedUser });
			}
		} else {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Updating User.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating User' });
	}
});

router.post('/reset_password', async (req, res) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email });
		console.log({ user });
		if (user) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(user);
		} else {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'User Not Found' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating User' });
	}
});
router.put('/update/:id', isAuth, async (req, res) => {
	try {
		console.log({ '/update/:id': req.body });
		// try {
		const userId = req.params.id;

		const user: any = await User.findById(userId);
		console.log('/update/:id');
		if (user) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			user.first_name = req.body.first_name || user.first_name;
			user.last_name = req.body.last_name || user.last_name;
			user.email = req.body.email || user.email;
			// user.password = req.body.password || user.password;
			user.isAdmin = req.body.admin || user.isAdmin;
			user.isVerified = req.body.verified || user.isVerified;
			user.affiliate = req.body.affiliate || user.affiliate;
			user.email_subscription = req.body.email_subscription;
			user.shipping = req.body.shipping;
			user.is_affiliated = req.body.is_affiliated || user.is_affiliated;
			user.deleted = req.body.deleted || false;
			const updatedUser = await user.save();
			if (updatedUser) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'User',
					data: [ updatedUser ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				// const updatedUser = await User.updateOne({ _id: userId }, user);
				console.log({ updatedUser });
				res.send({
					_id: updatedUser.id,
					first_name: updatedUser.first_name,
					last_name: updatedUser.last_name,
					email: updatedUser.email,
					affiliate: updatedUser.affiliate,
					email_subscription: updatedUser.email_subscription,
					shipping: updatedUser.shipping,
					is_affiliated: updatedUser.is_affiliated,
					isVerified: updatedUser.isVerified,
					isAdmin: updatedUser.isAdmin,
					token: getToken(updatedUser)
				});
			} else {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Product',
					data: [ updatedUser ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating User.' });
			}
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating User' });
	}
});

// router.put('/update/:id', isAuth, async (req, res) => {
// 	console.log({ user_routes_put: req.body });
// 	const userId = req.params.id;
// 	const user: any = await User.findById(userId);
// 	if (user) {
// 		const updatedUser = await User.updateOne({ _id: userId }, req.body);
// 		if (updatedUser) {
// 			// return res.send({ ...updatedUser, token: getToken(updatedUser) });
// 			return res.send({
// 				_id: updatedUser.id,
// 				first_name: updatedUser.first_name,
// 				last_name: updatedUser.last_name,
// 				email: updatedUser.email,
// 				affiliate: updatedUser.affiliate,
// 				email_subscription: updatedUser.email_subscription,
// 				is_affiliated: updatedUser.is_affiliated,
// 				isVerified: updatedUser.isVerified,
// 				isAdmin: updatedUser.isAdmin,
// 				token: getToken(updatedUser)
// 			});
// 			// res.status(200).send({ message: 'User Updated', data: updatedUser });
// 		}
// 	}
// 	return res.status(500).send({ message: ' Error in Updating User.' });
// });

router.put('/verify/:id', async (req, res) => {
	try {
		const userId = req.params.id;
		console.log({ verify: userId });
		const user: any = await User.findById(userId);
		if (user) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			user.first_name = req.body.first_name || user.first_name;
			user.last_name = req.body.last_name || user.last_name;
			user.email = req.body.email || user.email;
			user.password = req.body.password || user.password;
			user.isAdmin = req.body.isAdmin || user.isAdmin;
			user.email_subscription = req.body.email_subscription || user.email_subscription;
			user.is_affiliated = req.body.is_affiliated || user.is_affiliated;
			user.isVerified = true;
			user.deleted = req.body.deleted || false;
			const updatedUser = await user.save();
			if (updatedUser) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'User',
					data: [ updatedUser ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				// const updatedUser = await User.updateOne({ _id: userId }, user);
				console.log({ updatedUser });
				res.send({
					_id: updatedUser.id,
					first_name: updatedUser.first_name,
					last_name: updatedUser.last_name,
					email: updatedUser.email,
					affiliate: updatedUser.affiliate,
					email_subscription: updatedUser.email_subscription,
					is_affiliated: updatedUser.is_affiliated,
					// isVerified: updatedUser.isVerified,
					shipping: updatedUser.shipping
					// token: getToken(updatedUser)
				});
			} else {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Product',
					data: [ updatedUser ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating User.' });
			}
			// res.status(202).send({ message: 'Verified Account' });
		} else {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Product',
				data: [ user ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'User Not Found' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Verifying User' });
	}
});

router.post('/login', async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		const login_user: any = await User.findOne({ email });
		if (!login_user) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'User',
				data: [ login_user ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(404).send({ message: 'Email not found' });
		}
		if (!login_user.isVerified) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'User',
				data: [ login_user ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(404).send({ message: 'Account not Verified' });
		}
		// Check password
		const isMatch = await bcrypt.compare(password, login_user.password);
		if (isMatch) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'User',
				data: [ isMatch ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send({
				_id: login_user.id,
				first_name: login_user.first_name,
				last_name: login_user.last_name,
				email: login_user.email,
				isAdmin: login_user.isAdmin,
				affiliate: login_user.affiliate,
				is_affiliated: login_user.is_affiliated,
				email_subscription: login_user.email_subscription,
				isVerified: login_user.isVerified,
				shipping: login_user.shipping,
				token: getToken(login_user)
			});
		} else {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'User',
				data: [ isMatch ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(400).send({ message: 'Password incorrect' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Logging User' });
	}
});
router.post('/register', async (req, res) => {
	console.log({ register: req.body });
	try {
		const newUser: any = new User({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			affiliate: req.body.affiliate,
			is_affiliated: req.body.is_affiliated,
			email_subscription: req.body.email_subscription,
			isAdmin: false,
			isVerified: true
		});
		const user = await User.findOne({ email: newUser.email });
		if (user) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 400,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(400).send({ message: 'Email already exists' });
		} else {
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(newUser.password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					newUser.password = hash;
					await newUser.save();
					log_request({
						method: 'POST',
						path: req.originalUrl,
						collection: 'User',
						data: [ newUser ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					res.json({
						_id: newUser.id,
						first_name: newUser.first_name,
						last_name: newUser.last_name,
						email: newUser.email,
						isAdmin: newUser.isAdmin,
						is_affiliated: newUser.is_affiliated,
						email_subscription: newUser.email_subscription,
						isVerified: newUser.isVerified,
						shipping: newUser.shipping,
						token: getToken(newUser)
					});
				});
			});
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Registering User' });
	}
});

router.post('/getuser/:id', async (req, res) => {
	try {
		const user: any = await User.findOne({ _id: req.params.id });
		if (!user) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'User',
				data: [ user ],
				status: 400,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(400).send({ message: "User Doesn't Exist" });
		}
		// Check password
		const isMatch = await bcrypt.compare(req.body.current_password, user.password);
		if (isMatch) {
			// console.log({ user })
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'User',
				data: [ isMatch ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send({
				_id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				password: user.password,
				isAdmin: user.isAdmin,
				affiliate: user.affiliate,
				is_affiliated: user.is_affiliated,
				email_subscription: user.email_subscription,
				shipping: user.shipping,
				token: getToken(user)
			});
		} else {
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'User',
				status: 500,
				data: [ isMatch ],
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: 'Error Getting User' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'User',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting User' });
	}
});
router.post('/checkemail', async (req, res) => {
	try {
		console.log({ email: req.body.email });
		const user: any = await User.findOne({ email: req.body.email });
		console.log(user);
		if (user) {
			return res.status(400).send({ message: 'User Already Exists' });
		}
		// res.json({ message: "User Already Exists" })
		res.status(200).send({ message: 'No User Found' });
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/createadmin', async (req, res) => {
	try {
		const admin: any = new User({
			first_name: 'Kurt',
			last_name: 'LaVacque',
			email: 'lavacquek@icloud.com',
			password: 'admin',
			isVerified: true,
			isAdmin: true
		});
		const user = await User.findOne({ email: admin.email });
		if (user) {
			return res.status(400).send({ message: 'Email already exists' });
		} else {
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(admin.password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					admin.password = hash;
					await admin.save();
					res.json({
						_id: admin.id,
						first_name: admin.first_name,
						last_name: admin.last_name,
						email: admin.email,
						affiliate: admin.affiliate,
						is_affiliated: admin.is_affiliated,
						email_subscription: admin.email_subscription,
						isAdmin: admin.isAdmin,
						isVerified: admin.isVerified,
						shipping: admin.shipping,
						token: getToken(admin)
					});
				});
			});
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

export default router;
