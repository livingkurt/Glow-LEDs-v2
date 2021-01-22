export {};
import express from 'express';
import Email from '../models/email';
import User from '../models/user';
const { isAuth, isAdmin } = require('../util');
import nodemailer from 'nodemailer';
require('dotenv').config();
import { log_error, log_request } from '../util';
import App from '../email_templates/App';
import {
	account_created,
	password_reset,
	reset_password,
	contact,
	contact_confirmation
} from '../email_templates/pages/index';
const sgMail = require('@sendgrid/mail');
const PHE = require('print-html-element');

const router = express.Router();
router.get('/', async (req, res) => {
	try {
		const email_type = req.query.category ? { email_type: req.query.category } : {};
		console.log(email_type);
		const searchKeyword = req.query.searchKeyword
			? {
					email_type: {
						$regex: req.query.searchKeyword,
						$options: 'i'
					}
				}
			: {};

		let sortOrder = {};
		if (req.query.sortOrder === 'email type') {
			sortOrder = { email_type: 1 };
		} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
			sortOrder = { _id: -1 };
		}

		const emails = await Email.find({ deleted: false, ...email_type, ...searchKeyword }).sort(sortOrder);
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Email',
			data: emails,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.send(emails);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Email',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Emails' });
	}
});

// router.get('/:id', async (req, res) => {
// 	const email = await Email.findOne({ _id: req.params.id });
// 	// console.log({ email });
// 	if (email) {
// 		res.send(email);
// 	} else {
// 		res.status(404).send({ message: 'Email Not Found.' });
// 	}
// });

router.get('/:id', async (req, res) => {
	try {
		const email = await Email.findOne({ _id: req.params.id });
		console.log({ email });
		console.log(req.params.id);
		if (email) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Email',
				data: [ email ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(email);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Email',
				data: [ email ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'Email Not Found.' });
		}
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Email',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Email' });
	}
});

// router.put('/:id', isAuth, isAdmin, async (req, res) => {
// 	console.log({ put: req.body });
// 	const emailId = req.params.id;
// 	const email: any = await Email.findById(emailId);
// 	if (email) {
// 		const updatedEmail = await Email.updateOne({ _id: emailId }, req.body);
// 		console.log({ email_routes_post: updatedEmail });
// 		if (updatedEmail) {
// 			return res.status(200).send({ message: 'Email Updated', data: updatedEmail });
// 		}
// 	}
// 	return res.status(500).send({ message: ' Error in Updating Email.' });
// });

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ email_routes_put: req.body });
		const email_id = req.params.id;
		const email: any = await Email.findById(email_id);
		if (email) {
			const updatedEmail = await Email.updateOne({ _id: email_id }, req.body);
			if (updatedEmail) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Email',
					data: [ email ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(200).send({ message: 'Email Updated', data: updatedEmail });
			}
		} else {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Email',
				data: [ email ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Updating Email.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Email',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Email' });
	}
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const email = await Email.findById(req.params.id);
	const message: any = { message: 'Email Deleted' };
	// const deleted_email = await updated_email.save();
	const deleted_email = await Email.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_email) {
		// await deletedEmail.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.delete('/:id', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const message: any = { message: 'Email Deleted' };
		const deleted_email = await Email.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_email) {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Email',
				data: [ deleted_email ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(message);
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Email',
				data: [ deleted_email ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send('Error in Deletion.');
		}
	} catch (error) {
		log_error({
			method: 'DELETE',
			path: req.originalUrl,
			collection: 'Email',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Deleting Email' });
	}
});

// router.post('/', async (req, res) => {
// 	const newProduct = await Email.create(req.body);
// 	if (newProduct) {
// 		return res.status(201).send({ message: 'New Email Created', data: newProduct });
// 	}
// 	return res.status(500).send({ message: ' Error in Creating Email.' });
// });

router.post('/', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const newEmail = await Email.create(req.body);
		if (newEmail) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Email',
				data: [ newEmail ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(201).send({ message: 'New Email Created', data: newEmail });
		} else {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Email',
				data: [ newEmail ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Creating Email.' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Email',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating Email' });
	}
});

let transporter = nodemailer.createTransport({
	service: 'gmail',
	pool: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});
// let transporter = nodemailer.createTransport({
// 	host: 'mail.domain.com',
// 	port: 465,
// 	secure: true,
// 	auth: {
// 		user: process.env.EMAIL,
// 		pass: process.env.PASSWORD
// 	},
// 	tls: {
// 		rejectUnauthorized: false
// 	}
// });

// var transporter = nodemailer.createTransport(`smtps://${process.env.EMAIL}:${process.env.PASSWORD}@smtp.gmail.com`);

// console.log({
// 	user: process.env.EMAIL,
// 	pass: process.env.PASSWORD
// });

router.post('/announcement', async (req, res) => {
	console.log({ template: req.body.template });
	console.log({ subject: req.body.subject });
	console.log({ test: req.body.test });
	console.log({ chunk: req.body.chunk });
	const users = await User.find({ email_subscription: true });
	const all_emails = users.map((user: any) => user.email).reverse();
	// console.log({ all_emails });
	// const all_emails = users.filter((user: any) => user.email_subscription === true).map((user: any) => user.email);
	const test = [
		[ 'lavacquek@icloud.com', 'lavacquek@gmail.com', 'livingkurt222@gmail.com' ],
		[ 'lavacquek@gmail.com', 'lavacquek@icloud.com', 'livingkurt222@gmail.com' ],
		[ 'lavacquek@icloud.com', 'lavacquek@gmail.com', 'livingkurt222@gmail.com' ]
	];
	// const test = [
	// 	[ 'lavacquek@icloud.com', 'lavacquek@gmail.com', 'livingkurt222@gmail.com' ],
	// 	[ 'lavacquek@icloud.com', 'lavacquek@gmail.com', 'livingkurt222@gmail.com' ],
	// 	[ 'lavacquek@icloud.com', 'lavacquek@gmail.com', 'livingkurt222@gmail.com' ],
	// 	[ 'lavacquek@icloud.com', 'lavacquek@gmail.com', 'livingkurt222@gmail.com' ],
	// 	[ 'lavacquek@icloud.com', 'lavacquek@gmail.com', 'livingkurt222@gmail.com' ]
	// ];
	// const test = [ 'keith.booher@yahoo.com', 'keibooher@gmail.com' ];
	// console.log({ all_emails });
	const emails_split = split_array(all_emails);
	// const all_emails = [ 'destanyesalinas@gmail.com', 'zestanye@gmail.com' ];
	console.log({ emails_split });
	let split_emails: any = req.body.test ? test : emails_split;
	// console.log({ split_emails: split_emails[0] });
	// split_emails[0].forEach((emails: any, index: any) => {
	split_emails[0].forEach((email: any) => {
		let mailOptions = {
			to: email,
			from: process.env.DISPLAY_EMAIL,
			subject: req.body.subject,
			html: req.body.template
		};
		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Announcement Email Sent to ' + email);
			}
		});
	});
	// 	console.log('Email Chunk ' + index);
	// });

	res.send('Announcement Email Sent to ' + all_emails);
});

const split_array = (all_emails: any) => {
	let chunk;
	let array: Array<string> = [];
	console.log(all_emails.length / 4);
	const amount = all_emails.length / 4;
	while (all_emails.length > 0) {
		chunk = all_emails.splice(0, amount);
		array = [ ...array, chunk ];
	}
	return shuffleArray(array);
	// console.log({ chunk });
};
function shuffleArray(array: any) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[ array[i], array[j] ] = [ array[j], array[i] ];
	}
	return array;
}

router.post('/order', async (req, res) => {
	// console.log({ template: req.body.template });
	const test = [ 'lavacquek@icloud.com' ];
	let mailOptions = {
		to: req.body.email,
		from: process.env.DISPLAY_EMAIL,
		subject: req.body.subject,
		html: req.body.template
	};
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log(req.body.subject);
			res.send(req.body.subject);
		}
	});

	// res.send('Order Email Sent to');
});
router.post('/order_created', async (req, res) => {
	// console.log({ template: req.body.template });
	let mailOptions = {
		to: process.env.EMAIL,
		from: process.env.DISPLAY_EMAIL,
		subject: req.body.subject,
		html: req.body.template
	};
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log(req.body.subject);
			res.send(req.body.subject);
		}
	});

	// res.send('Order Email Sent to');
});

router.post('/invoice', async (req, res) => {
	console.log({ invoice: req.body });
	// PHE.printHtml(invoice_view(req.body));
	res.render('./invoice.html');
});

router.post('/contact', async (req, res) => {
	// const data = req.body;
	console.log({ contact: req.body });
	// console.log(process.env.SENDGRID_SECRET);
	// sgMail.setApiKey(process.env.SENDGRID_SECRET);
	let mailOptions = {
		to: process.env.DISPLAY_EMAIL,
		from: req.body.email,
		subject: `New message from ${req.body.first_name} - ${req.body.reason_for_contact}`,
		html: contact(req.body)
	};
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log('Contact Email Sent to ' + req.body.first_name);
			res.status(200).send({ message: 'Email Successfully Sent' });
		}
	});
});

router.post('/contactconfirmation', async (req, res) => {
	// const data = req.body;
	console.log({ contact: req.body });
	// console.log(process.env.SENDGRID_SECRET);
	// sgMail.setApiKey(process.env.SENDGRID_SECRET);
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.email,
		subject: `Thank you for Contacting Glow LEDs Support`,
		html: contact_confirmation(req.body)
	};

	// try {
	// 	sgMail.send(mailOptions);
	// 	res.send(200);
	// } catch (err) {
	// 	res.status(422).send(err);
	// }
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log('Contact Email Sent to ' + req.body.first_name);
			res.status(200).send({ message: 'Email Successfully Sent' });
		}
	});
});

router.post('/password_reset', async (req, res) => {
	console.log({ passwordreset: req.body });

	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.data.email,
		subject: 'Glow LEDs Password Reset',
		html: App({ body: password_reset(req.body), title: 'Glow LEDs Password Reset' })
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log('Password Reset Email Sent to ' + req.body.data.first_name);
			res.status(200).send({ message: 'Email Successfully Sent' });
		}
	});
});
router.post('/reset_password', async (req, res) => {
	console.log({ reset_password: req.body });

	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.email,
		subject: 'Glow LEDs Reset Password',
		html: App({ body: reset_password(req.body), title: 'Glow LEDs Reset Password' })
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log('Reset Password Email Sent to ' + req.body.first_name);
			res.status(200).send({ message: 'Email Successfully Sent' });
		}
	});
});

router.post('/verified', async (req, res) => {
	console.log({ register: req.body });

	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.email,
		subject: 'Glow LEDs Account Created',
		html: App({ body: account_created(req.body), title: 'Glow LEDs Account Created' })
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log('Registration Email Sent to ' + req.body.first_name);
			res.status(200).send({ message: 'Email Successfully Sent' });
		}
	});
});

// router.post('/verify', async (req, res) => {
// 	console.log({ register: req.body });

// 	let mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.email,
// 		subject: 'Glow LEDs Account Verification',
// 		html: main_layout(verify_account_view(req.body), styles())
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Verification Email Sent to ' + req.body.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// });

// router.post('/order', async (req, res) => {
// 	console.log({ order: req.body });
// 	// console.log({ order: req.body.token });
// 	// console.log({ order: req.body.token.card.last4 });

// 	const paid = 'Paid';
// 	const shipped = 'Not Shipped';
// 	// const delivered = "Not Shipped"
// 	let user = {};
// 	let mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.shipping.email,
// 		subject: 'Glow LEDs Order Confirmation',
// 		html: main_layout(order_view({ ...req.body, title: 'Your Order Has Been Placed', paid, shipped }), styles())
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Order Email Sent to ' + req.body.shipping.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// });
// router.post('/refund', async (req, res) => {
// 	console.log({ refund: req.body });
// 	// console.log({ order: req.body.token.card.last4 });

// 	const paid = 'Paid';
// 	const shipped = req.body.isShipped ? 'Shipped' : 'Not Shipped';
// 	const refunded = true;
// 	// const delivered = "Not Shipped"
// 	let user = {};
// 	let mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.shipping.email,
// 		subject: 'Glow LEDs Order Refund',
// 		bcc: process.env.EMAIL,
// 		html: main_layout(
// 			refund_view({ ...req.body, title: 'You have been refunded for your order', paid, shipped, refunded }),
// 			styles()
// 		)
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Order Email Sent to ' + req.body.shipping.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// });
// router.post('/order', async (req, res) => {
// 	console.log({ order: req.body.token });
// 	console.log({ order: req.body.token.card.last4 });

// 	const paid = 'Paid';
// 	const shipped = 'Not Shipped';
// 	// const delivered = "Not Shipped"
// 	let user = {};
// 	let mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.shipping.email,
// 		subject: 'Glow LEDs Order Confirmation',
// 		html: main_layout(order_view({ ...req.body, title: 'Your Order Has Been Placed', paid, shipped }), styles())
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Order Email Sent to ' + req.body.shipping.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// });

// router.post('/sale', async (req, res) => {
// 	// console.log({ sale: req.body });
// 	// console.log({ sale_items: req.body.orderItems });
// 	const paid = 'Paid';
// 	const shipped = 'Not Shipped';
// 	let user = {};
// 	let mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: process.env.EMAIL,
// 		subject: 'New Order from ' + req.body.shipping.first_name,
// 		html: main_layout(
// 			order_view({ ...req.body, title: 'New Order from ' + req.body.shipping.first_name, paid, shipped }),
// 			styles()
// 		)
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('New Order Made by ' + req.body.shipping.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// });

// router.post('/paid', async (req, res) => {
// 	console.log({ paid: req.body });
// 	let user = {};
// 	const paid = 'Paid';
// 	const shipped = 'Not Shipped';
// 	let mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: process.env.EMAIL,
// 		subject: 'Order Paid by ' + req.body.shipping.first_name,
// 		html: main_layout(
// 			order_view({ ...req.body, title: 'Order Paid by ' + req.body.shipping.first_name, paid, shipped }),
// 			styles()
// 		)
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('New Order Paid by ' + req.body.shipping.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// });
// router.post('/notpaid', async (req, res) => {
// 	console.log({ notpaid: req.body });
// 	let user = {};
// 	const paid = 'Not Paid';
// 	const shipped = 'Not Shipped';
// 	// const body = 'You have placed an order but have yet to pay. Would you like assistance completing your order?';
// 	let mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.shipping.email,
// 		bcc: process.env.EMAIL,
// 		subject: 'Glow LEDs Order Not Complete',
// 		html: main_layout(order_view({ ...req.body, title: 'Order Not Complete', paid, shipped }), styles())
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Order Not Complete for ' + req.body.shipping.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// });
// router.post('/notverified', async (req, res) => {
// 	console.log({ notpaid: req.body });
// 	let user = {};

// 	let mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.email,
// 		bcc: process.env.EMAIL,
// 		subject: 'Having Trouble Verifying your Glow LEDs Account',
// 		html: main_layout(not_verified_view(req.body), styles())
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Not Verified Email Sent to ' + req.body.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// });

// // router.post('/orderpaid', async (req, res) => {
// // 	console.log({ orderpaid: req.body });
// // 	let user = {};
// // 	const paid = 'Paid';
// // 	const shipped = 'Not Shipped';
// // 	let mailOptions = {
// // 		from: process.env.DISPLAY_EMAIL,
// // 		to: req.body.shipping.email,
// // 		subject: 'Here is your receipt from Glow LEDs',
// // 		html: main_layout(
// // 			order_view({ ...req.body, title: 'Order Complete! \nHere is your receipt from Glow LEDs', paid, shipped }),
// // 			styles()
// // 		)
// // 	};

// // 	transporter.sendMail(mailOptions, (err, data) => {
// // 		if (err) {
// // 			console.log('Error Occurs', err);
// // 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// // 		} else {
// // 			console.log('New Order Paid by ' + req.body.shipping.first_name);
// // 			res.status(200).send({ message: 'Email Successfully Sent' });
// // 		}
// // 	});
// // });

// router.post('/shipping', async (req, res) => {
// 	console.log({ shipping: req.body });
// 	let user: any = {};
// 	const paid = 'Paid';
// 	const shipped = 'Shipped';
// 	try {
// 		user = await User.findOne({ _id: req.body.user });
// 	} catch (error) {
// 		res.send({ message: error.message });
// 	}

// 	let mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		// from: 'Kurt LaVacque <lavacquek@gmail.com>',
// 		to: req.body.email,
// 		subject: 'Glow LEDs Shipping Confirmation',
// 		html: main_layout(order_view({ ...req.body, title: 'Your Item has Shipped!', paid, shipped }), styles())
// 	};
// 	console.log(req.body);

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Shipping Email Sent to ' + req.body.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// });

// router.post('/delivery', async (req, res) => {
// 	console.log({ delivery: req.body });
// 	let user: any = {};
// 	try {
// 		user = await User.findOne({ _id: req.body.user });
// 	} catch (error) {
// 		res.send({ message: error.message });
// 	}

// 	let mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.email,
// 		subject: 'Glow LEDs Delivery Confirmation',
// 		html: main_layout(order_view({ ...req.body, title: 'Your Item has Been Delivered!' }), styles())
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Delivery Email Sent to ' + req.body.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// });

// module.exports = router;
export default router;
