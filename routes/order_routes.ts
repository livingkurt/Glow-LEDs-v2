// import express from 'express';
// import Order from '../models/orderModel';
// import { isAuth, isAdmin } from '../util';
export {};
const express = require('express');
import { User } from '../models';
import Order from '../models/order';
import { log_error, log_request } from '../util';
import axios from 'axios';
const { isAuth, isAdmin } = require('../util');
const salesTax = require('state-sales-tax');
const scraper = require('table-scraper');

const easy_post_api = require('@easypost/api');

require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

const router = express.Router();

router.get('/occurrences', async (req: any, res: any) => {
	const orders = await Order.find({ deleted: false }).populate('orderItems.secondary_product');
	const products: any = [];
	const ids: any = [];
	orders.forEach((order: any) => {
		order.orderItems.map((item: any) => {
			products.push(item.name);
			ids.push(item._id);
			if (item.secondary_product) {
				products.push(item.secondary_product.name);
				ids.push(item.secondary_product._id);
			}
		});
	});
	// console.log({ ids });
	let result: any = {};
	let ids_result: any = {};
	for (var i = 0; i < products.length; ++i) {
		if (!result[products[i]]) {
			result[products[i]] = 0;
			ids_result[ids[i]] = 0;
		}
		++result[products[i]];
		++ids_result[ids[i]];
	}
	// console.log({ ids_result });
	let final_result = [];
	for (let i in result) {
		const entry = { name: i, occurrence: result[i], id: ids_result[i] };
		final_result.push(entry);
	}
	final_result.sort((a, b) => (a.occurrence > b.occurrence ? -1 : 1));
	res.send(final_result);
});

router.get('/all_shipping', async (req: any, res: any) => {
	const orders = await Order.find({ deleted: false });
	let all_shipping: any = [];
	orders.forEach((order: any) => {
		all_shipping = [ order.shipping, ...all_shipping ];
	});
	// console.log({ all_shipping });
	res.send(all_shipping);
});

router.get('/tax_rates', async (req: any, res: any) => {
	let updatedSalesTaxes = 'http://www.salestaxinstitute.com/resources/rates';
	let result: any = {};

	const tableData = await scraper.get(updatedSalesTaxes);

	let tempData = tableData[0];
	tempData.map((state: any) => {
		let percentage = state['State Rate'];
		result[state['State']] = percentage.slice(0, percentage.indexOf('%') + 1);
	});
	// console.log({ result });
	res.send(result);
});

router.get('/', isAuth, async (req: any, res: any) => {
	try {
		const category = req.query.category ? { category: req.query.category } : {};
		let user: any;
		let searchKeyword: any;
		let last_id = req.query.lastID;
		let direction = req.query.direction;
		// console.log('hello');
		// console.log(req.query);
		let orders: any;
		if (req.query.searchKeyword) {
			const userSearchKeyword = req.query.searchKeyword
				? {
						'shipping.first_name': {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};
			user = await User.findOne({ ...userSearchKeyword });
			searchKeyword = { user: user._id };
		}
		let sortOrder = {};
		if (req.query.sortOrder === 'lowest') {
			sortOrder = { totalPrice: 1 };
		} else if (req.query.sortOrder === 'highest') {
			sortOrder = { totalPrice: -1 };
		} else if (req.query.sortOrder === 'date' || req.query.sortOrder === '') {
			sortOrder = { createdAt: -1 };
		} else if (req.query.sortOrder === 'paid') {
			sortOrder = { isPaid: -1, createdAt: -1 };
		} else if (req.query.sortOrder === 'manufactured') {
			sortOrder = { isManufactured: -1, createdAt: -1 };
		} else if (req.query.sortOrder === 'packaged') {
			sortOrder = { isPackaged: -1, createdAt: -1 };
		} else if (req.query.sortOrder === 'shipped') {
			sortOrder = { isShipped: -1, createdAt: -1 };
		} else if (req.query.sortOrder === 'delivered') {
			sortOrder = { isDelivered: -1, createdAt: -1 };
		}

		// if (category === 'none' || category === 'None' || category === 'all' || category === 'All') {
		if (last_id === 'none') {
			// products = await Product.find({ deleted_at: null }).sort({_id:-1}).limit(10)
			orders = await Order.find({ deleted: false, ...category, ...searchKeyword })
				.limit(10)
				.populate('user')
				.populate('orderItems.product')
				.populate('orderItems.secondary_product')
				.sort(sortOrder);
		} else {
			if (direction === 'next') {
				// products = await Product.find({_id: {$lt: last_id}, deleted_at: null}).sort({_id:-1}).limit(10)
				orders = await Order.find({
					deleted: false,
					...category,
					...searchKeyword,
					_id: { $lt: last_id }
				})
					.limit(10)
					.populate('user')
					.populate('orderItems.product')
					.populate('orderItems.secondary_product')
					.sort(sortOrder);
			} else if (direction === 'previous') {
				// products = await Product.find({_id: {$lte: last_id}, deleted_at: null}).sort({_id:-1}).limit(10)
				orders = await Order.find({
					deleted: false,
					...category,
					...searchKeyword,
					_id: { $gt: last_id }
				})
					.limit(10)
					.populate('user')
					.populate('orderItems.product')
					.populate('orderItems.secondary_product')
					.sort(sortOrder);
			} else if (last_id === 'all') {
				// products = await Product.find({ deleted_at: null }).sort({_id:-1}).limit(10)
				orders = await Order.find({ deleted: false, ...category, ...searchKeyword })
					.populate('user')
					.populate('orderItems.product')
					.populate('orderItems.secondary_product')
					.sort(sortOrder);
			} else {
				// products = await Product.find({_id: {$gt: last_id}, deleted_at: null}).limit(10)
				orders = await Order.find({
					deleted: false,
					...category,
					...searchKeyword,
					_id: { $gt: last_id }
				})
					.limit(10)
					.populate('user')
					.populate('orderItems.product')
					.populate('orderItems.secondary_product')
					.sort(sortOrder);
				orders = orders.reverse();
			}
		}

		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			data: orders,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		// console.log({ orders });
		res.send(orders);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Orders' });
	}
});

// app.get('/api/products/all/:last_product_id/:direction/:category', requireLogin, adminRequired, async (req, res) => {
// 	try {
// 		let last_product_id = req.params.last_product_id;
// 		let direction = req.params.direction;
// 		let category = req.params.category;
// 		let products;
// 		if (category === 'none' || category === 'None' || category === 'all' || category === 'All') {
// 			if (last_product_id === 'none') {
// 				products = await Product.find({ deleted_at: null }).sort({ _id: -1 }).limit(10);
// 			} else {
// 				if (direction === 'next') {
// 					products = await Product.find({ _id: { $lt: last_product_id }, deleted_at: null })
// 						.sort({ _id: -1 })
// 						.limit(10);
// 				} else if (direction === 'previous') {
// 					products = await Product.find({ _id: { $lte: last_product_id }, deleted_at: null })
// 						.sort({ _id: -1 })
// 						.limit(10);
// 				} else {
// 					products = await Product.find({ _id: { $gt: last_product_id }, deleted_at: null }).limit(10);
// 					products = products.reverse();
// 				}
// 			}
// 		} else {
// 			if (last_product_id === 'none') {
// 				products = await Product.find({ deleted_at: null, categories: category }).sort({ _id: -1 }).limit(10);
// 			} else {
// 				if (direction === 'next') {
// 					products = await Product.find({
// 						_id: { $lt: last_product_id },
// 						deleted_at: null,
// 						categories: category
// 					})
// 						.sort({ _id: -1 })
// 						.limit(10);
// 				} else if (direction === 'previous') {
// 					products = await Product.find({
// 						_id: { $lte: last_product_id },
// 						deleted_at: null,
// 						categories: category
// 					})
// 						.sort({ _id: -1 })
// 						.limit(10);
// 				} else {
// 					products = await Product.find({
// 						_id: { $gt: last_product_id },
// 						deleted_at: null,
// 						categories: category
// 					}).limit(10);
// 					products = products.reverse();
// 				}
// 			}
// 		}
// 		res.send(products);
// 	} catch (err) {
// 		req.bugsnag.notify(err);
// 		res.status(422).send(err);
// 	}
// });

router.get('/each_day_income/:date', async (req: any, res: any) => {
	try {
		const date = req.params.date;
		const orders = await Order.find({
			deleted: false,
			createdAt: {
				$gt: new Date(<any>new Date(date).setHours(0, 0, 0)),
				$lt: new Date(<any>new Date(date).setHours(23, 59, 59))
			}
		});
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			data: orders,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.json(orders);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Orders' });
	}
});

const dates_in_year = [
	{ month: 1, number_of_days: 31 },
	{ month: 2, number_of_days: 28 },
	{ month: 3, number_of_days: 31 },
	{ month: 4, number_of_days: 30 },
	{ month: 5, number_of_days: 31 },
	{ month: 6, number_of_days: 30 },
	{ month: 7, number_of_days: 31 },
	{ month: 8, number_of_days: 31 },
	{ month: 9, number_of_days: 30 },
	{ month: 10, number_of_days: 31 },
	{ month: 11, number_of_days: 30 },
	{ month: 12, number_of_days: 31 }
];
router.get('/each_month_income/:date', async (req: any, res: any) => {
	try {
		const start_date = req.params.date;
		const year = start_date.split('-')[0];
		const month = start_date.split('-')[1];
		const day = dates_in_year[parseInt(start_date.split('-')[1]) - 1].number_of_days;
		// console.log({ year, month, day });
		// console.log(dates_in_year[parseInt(start_date.split('-')[1]) - 1].number_of_days);
		const end_date = year + '-' + month + '-' + day;
		console.log({ start_date, end_date });
		const orders = await Order.find({
			deleted: false,
			createdAt: {
				$gt: new Date(<any>new Date(start_date).setHours(0, 0, 0) - 30 * 60 * 60 * 24 * 1000),
				$lt: new Date(<any>new Date(end_date).setHours(23, 59, 59))
			}
		});

		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			data: orders,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.json(orders);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Orders' });
	}
});
router.get('/daily_income', async (req: any, res: any) => {
	try {
		const orders = await Order.find({
			deleted: false,
			createdAt: {
				$gte: new Date(<any>new Date() - 1 * 60 * 60 * 24 * 1000)
			}
		});

		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			data: orders,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.json(orders);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Orders' });
	}
});
router.get('/weekly_income', async (req: any, res: any) => {
	try {
		const orders = await Order.find({
			deleted: false,
			createdAt: {
				$gte: new Date(<any>new Date() - 7 * 60 * 60 * 24 * 1000)
			}
		});

		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			data: orders,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.json(orders);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Orders' });
	}
});
router.get('/monthly_income', async (req: any, res: any) => {
	try {
		const orders = await Order.find({
			deleted: false,
			createdAt: {
				$gte: new Date(<any>new Date() - 30 * 60 * 60 * 24 * 1000)
			}
		});

		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			data: orders,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.json(orders);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Orders' });
	}
});

router.get('/mine', isAuth, async (req: any, res: any) => {
	try {
		const orders = await Order.find({ deleted: false, user: req.user._id }).sort({ _id: -1 });
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Order',
			data: orders,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.send(orders);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Your Orders' });
	}
});
router.get('/user/:id', isAuth, async (req: any, res: any) => {
	try {
		const orders = await Order.find({ deleted: false, user: req.params.id }).sort({ _id: -1 });
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Order',
			data: orders,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.send(orders);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Your Orders' });
	}
});

router.get('/:id', isAuth, async (req: any, res: any) => {
	try {
		const order = await Order.findOne({ _id: req.params.id })
			.populate('orderItems.product')
			.populate('orderItems.secondary_product')
			.populate('user');
		if (order) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Order',
				data: order,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(order);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Order',
				data: order,
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
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Order' });
	}
});
router.get('/track_order/:id', async (req: any, res: any) => {
	try {
		const order = await Order.findOne({ _id: req.params.id })
			.populate('orderItems.product')
			.populate('orderItems.secondary_product')
			.populate('user');
		if (order) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Order',
				data: order,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(order);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Order',
				data: order,
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
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Order' });
	}
});

router.delete('/:id', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const message: any = { message: 'Order Deleted' };
		const deleted_order = await Order.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_order) {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Order',
				data: [ deleted_order ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(message);
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Order',
				data: [ deleted_order ],
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
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Deleting Order' });
	}
});

router.post('/', isAuth, async (req: any, res: any) => {
	try {
		const newOrder = new Order({
			orderItems: req.body.orderItems,
			user: req.body.user ? req.body.user._id : req.user._id,
			shipping: req.body.shipping,
			payment: req.body.payment,
			itemsPrice: req.body.itemsPrice,
			taxPrice: req.body.taxPrice,
			shippingPrice: req.body.shippingPrice,
			totalPrice: req.body.totalPrice,
			order_note: req.body.order_note,
			promo_code: req.body.promo_code,
			deleted: false
		});
		// console.log({ newOrder });
		// console.log({ user: req.body.user });
		const newOrderCreated = await newOrder.save();
		// console.log({ newOrderCreated });

		if (newOrderCreated) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Order',
				data: [ newOrderCreated ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
		} else {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Order',
				data: [ newOrderCreated ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Creating Order.' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating Order' });
	}
});

// router.put('/charges', async (req: { user: { _id: any } }, res: { send: (arg0: any) => void }) => {
// 	const order = await Order.findById('5f88c4c6d82e0e002acae9bf').populate('user');
// 	// const charges = await stripe.charges.list({});
// 	const charge = await stripe.charges.retrieve('ch_1HceYpJUIKBwBp0w69pyljh3');
// 	order.payment = {
// 		paymentMethod: 'stripe',
// 		charge: charge
// 	};
// 	const updatedOrder = await order.save();
// 	res.send(updatedOrder);
// });

// router.put('/update_charge_email', async (req: { user: { _id: any } }, res: { send: (arg0: any) => void }) => {
// 	const charge = await stripe.charges.update('ch_1HhimVJUIKBwBp0wgil79u96', {
// 		metadata: { receipt_email: 'ssdaly1590@gmail.com' }
// 	});

// 	res.send(charge);
// });
// router.get('/refunds', async (req: { user: { _id: any } }, res: { send: (arg0: any) => void }) => {
// 	const refunds = await stripe.refunds.list({});
// 	res.send(refunds);
// });

router.put('/:id/pay', isAuth, async (req: any, res: any) => {
	try {
		const order = await Order.findById(req.params.id).populate('user');
		// console.log({ order });
		const intent = await stripe.paymentIntents.create(
			{
				amount: (order.totalPrice * 100).toFixed(0),
				currency: 'usd',
				payment_method_types: [ 'card' ]
			},
			async (err: any, result: any) => {
				if (err) {
					console.log({ err });
					// return res.status(500).send({ error, message: 'Error Paying for Order' });
					log_error({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Order',
						error: err,
						status: 500,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(500).send({ error: err, message: err.raw.message });
				} else {
					// console.log({ result });
					// if (charge) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Order',
						data: [ result ],
						status: 201,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					// order.isPaid = true;
					// order.paidAt = Date.now();
					// order.payment = {
					// 	paymentMethod: 'stripe',
					// 	charge: result,
					// 	payment: req.body.paymentMethod
					// 	// payment_intent: result
					// };
					// const charge = await stripe.paymentIntents.confirm(result.id, {
					// 	payment_method: 'pm_card_' + req.body.paymentMethod.card.brand
					// });
					console.log({ payment_method: req.body.paymentMethod.id });
					const charge = await stripe.paymentIntents.confirm(
						result.id,
						{
							payment_method:
								process.env.NODE_ENV === 'production'
									? req.body.paymentMethod.id
									: 'pm_card_' + req.body.paymentMethod.card.brand
						},
						// {
						// 	payment_method: req.body.paymentMethod.id
						// },
						async (err: any, result: any) => {
							if (err) {
								console.log({ err });
								// return res.status(500).send({ error, message: 'Error Paying for Order' });
								log_error({
									method: 'PUT',
									path: req.originalUrl,
									collection: 'Order',
									error: err,
									status: 500,
									success: false,
									ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
								});
								return res.status(500).send({ error: err, message: err.raw.message });
							} else {
								// console.log({ result });
								// if (charge) {
								log_request({
									method: 'PUT',
									path: req.originalUrl,
									collection: 'Order',
									data: [ result ],
									status: 201,
									success: true,
									ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
								});
								order.isPaid = true;
								order.paidAt = Date.now();
								order.payment = {
									paymentMethod: 'stripe',
									charge: result,
									payment: req.body.paymentMethod
									// payment_intent: result
								};
								// const charge = await stripe.paymentIntents.confirm(result.id, {
								// 	payment_method: 'pm_card_' + req.body.paymentMethod.card.brand
								// });
								// console.log({ payment_method: req.body.paymentMethod.id });
								// const charge = await stripe.paymentIntents.confirm(result.id, {
								// 	payment_method:
								// 		process.env.NODE_ENV === 'production'
								// 			? req.body.paymentMethod.id
								// 			: 'pm_card_' + req.body.paymentMethod.card.brand
								// });
								const updatedOrder = await order.save();
								if (updatedOrder) {
									log_request({
										method: 'PUT',
										path: req.originalUrl,
										collection: 'Order',
										data: [ updatedOrder ],
										status: 201,
										success: true,
										ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
									});
									res.send({ message: 'Order Paid.', order: updatedOrder });
								}
								// }
							}
						}
					);
					// const updatedOrder = await order.save();
					// if (updatedOrder) {
					// 	log_request({
					// 		method: 'PUT',
					// 		path: req.originalUrl,
					// 		collection: 'Order',
					// 		data: [ updatedOrder ],
					// 		status: 201,
					// 		success: true,
					// 		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					// 	});
					// 	res.send({ message: 'Order Paid.', order: updatedOrder });
					// }
					// }
				}
			}
		);
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		console.log({ error });
		res.status(500).send({ error, message: 'Error Paying for Order' });
	}
});

router.post('/guestcheckout', async (req: any, res: any) => {
	try {
		const newOrderCreated = await Order.create({ ...req.body, guest: true });
		console.log({ newOrderCreated });

		if (newOrderCreated) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Order',
				data: [ newOrderCreated ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(201).send({ message: 'New Order Created', newOrder: newOrderCreated });
		} else {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Order',
				data: [ newOrderCreated ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Creating Order.' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating Order' });
	}
});

router.put('/guestcheckout/:id/pay', async (req: any, res: any) => {
	try {
		const order = await Order.findById(req.params.id);
		console.log({ '/guestcheckout/:id/pay': req.body });
		// console.log({ order });
		// const charge = await stripe.charges.create(
		// 	{
		// 		amount: (order.totalPrice * 100).toFixed(0),
		// 		currency: 'usd',
		// 		description: `Order Paid`,
		// 		source: req.body.token.id
		//   },
		const intent = await stripe.paymentIntents.create(
			{
				amount: (order.totalPrice * 100).toFixed(0),
				currency: 'usd',
				payment_method_types: [ 'card' ]
			},
			async (err: any, result: any) => {
				if (err) {
					console.log({ err });
					// return res.status(500).send({ error, message: 'Error Paying for Order' });
					log_error({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Order',
						error: err,
						status: 500,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(500).send({ error: err, message: err.raw.message });
				} else {
					// console.log({ result });
					// if (charge) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Order',
						data: [ result ],
						status: 201,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					// order.isPaid = true;
					// order.paidAt = Date.now();
					// order.payment = {
					// 	paymentMethod: 'stripe',
					// 	charge: result,
					// 	payment: req.body.paymentMethod
					// 	// payment_intent: result
					// };
					// const charge = await stripe.paymentIntents.confirm(result.id, {
					// 	payment_method: 'pm_card_' + req.body.paymentMethod.card.brand
					// });
					console.log({ payment_method: req.body.paymentMethod.id });
					const charge = await stripe.paymentIntents.confirm(
						result.id,
						{
							payment_method:
								process.env.NODE_ENV === 'production'
									? req.body.paymentMethod.id
									: 'pm_card_' + req.body.paymentMethod.card.brand
						},
						// {
						// 	payment_method: req.body.paymentMethod.id
						// },
						async (err: any, result: any) => {
							if (err) {
								console.log({ err });
								// return res.status(500).send({ error, message: 'Error Paying for Order' });
								log_error({
									method: 'PUT',
									path: req.originalUrl,
									collection: 'Order',
									error: err,
									status: 500,
									success: false,
									ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
								});
								return res.status(500).send({ error: err, message: err.raw.message });
							} else {
								// console.log({ result });
								// if (charge) {
								log_request({
									method: 'PUT',
									path: req.originalUrl,
									collection: 'Order',
									data: [ result ],
									status: 201,
									success: true,
									ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
								});
								order.isPaid = true;
								order.paidAt = Date.now();
								order.payment = {
									paymentMethod: 'stripe',
									charge: result,
									payment: req.body.paymentMethod
									// payment_intent: result
								};
								// const charge = await stripe.paymentIntents.confirm(result.id, {
								// 	payment_method: 'pm_card_' + req.body.paymentMethod.card.brand
								// });
								// console.log({ payment_method: req.body.paymentMethod.id });
								// const charge = await stripe.paymentIntents.confirm(result.id, {
								// 	payment_method:
								// 		process.env.NODE_ENV === 'production'
								// 			? req.body.paymentMethod.id
								// 			: 'pm_card_' + req.body.paymentMethod.card.brand
								// });
								const updatedOrder = await order.save();
								if (updatedOrder) {
									log_request({
										method: 'PUT',
										path: req.originalUrl,
										collection: 'Order',
										data: [ updatedOrder ],
										status: 201,
										success: true,
										ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
									});
									res.send({ message: 'Order Paid.', order: updatedOrder });
								}
								// }
							}
						}
					);
					// const updatedOrder = await order.save();
					// if (updatedOrder) {
					// 	log_request({
					// 		method: 'PUT',
					// 		path: req.originalUrl,
					// 		collection: 'Order',
					// 		data: [ updatedOrder ],
					// 		status: 201,
					// 		success: true,
					// 		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					// 	});
					// 	res.send({ message: 'Order Paid.', order: updatedOrder });
					// }
					// }
				}
			}
		);
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Paying for Order' });
	}
});

router.put('/:id/refund', async (req: any, res: any) => {
	try {
		const order = await Order.findById(req.params.id);
		console.log({ order });
		const refund = await stripe.refunds.create({
			payment_intent: order.payment.charge.id,
			amount: req.body.refund_amount * 100
		});
		console.log({ refund });
		if (refund) {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Order',
				data: [ refund ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			order.isRefunded = true;
			order.refundedAt = Date.now();
			order.payment = {
				paymentMethod: order.payment.paymentMethod,
				charge: order.payment.charge,
				refund: [ ...order.payment.refund, refund ],
				refund_reason: [ ...order.payment.refund_reason, req.body.refund_reason ]
			};
			const updated = await Order.updateOne({ _id: req.params.id }, order);
			if (updated) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Order',
					data: [ updated ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(updated);
			} else {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Product',
					data: [ updated ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Order not Updated.' });
			}
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Refunding Order' });
	}
});

// router.put('/:id/pay', isAuth, async (req: any, res: any) => {
// 	try {
// 		const order = await Order.findById(req.params.id).populate('user');
// 		console.log({ order });

// 		// setTimeout(() => {
// 		// 	console.log({ message: 'Error Paying for Order' });
// 		// 	// return res.status(500).send({ message: 'Error Paying for Order' });
// 		// }, 5000);
// 		const charge = await stripe.charges.create(
// 			{
// 				amount: (order.totalPrice * 100).toFixed(0),
// 				currency: 'usd',
// 				description: `Order Paid`,
// 				source: req.body.token.id
// 			},
// 			async (err: any, result: any) => {
// 				if (err) {
// 					console.log({ err });
// 					// return res.status(500).send({ error, message: 'Error Paying for Order' });
// 					log_error({
// 						method: 'PUT',
// 						path: req.originalUrl,
// 						collection: 'Order',
// 						error: err,
// 						status: 500,
// 						success: false,
// 						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 					});
// 					return res.status(500).send({ error: err, message: err.raw.message });
// 				} else {
// 					console.log({ result });
// 					// if (charge) {
// 					log_request({
// 						method: 'PUT',
// 						path: req.originalUrl,
// 						collection: 'Order',
// 						data: [ result ],
// 						status: 201,
// 						success: true,
// 						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 					});
// 					order.isPaid = true;
// 					order.paidAt = Date.now();
// 					order.payment = {
// 						paymentMethod: 'stripe',
// 						charge: result
// 					};
// 					const updatedOrder = await order.save();
// 					if (updatedOrder) {
// 						log_request({
// 							method: 'PUT',
// 							path: req.originalUrl,
// 							collection: 'Order',
// 							data: [ updatedOrder ],
// 							status: 201,
// 							success: true,
// 							ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 						});
// 						res.send({ message: 'Order Paid.', order: updatedOrder });
// 					}
// 					// }
// 				}
// 			}
// 		);
// 		// 4000000000000002
// 	} catch (error) {
// 		log_error({
// 			method: 'PUT',
// 			path: req.originalUrl,
// 			collection: 'Order',
// 			error,
// 			status: 500,
// 			success: false
// 		});
// 		res.status(500).send({ error, message: 'Error Paying for Order' });
// 	}
// });

// router.post('/guestcheckout', async (req: any, res: any) => {
// 	try {
// 		const newOrderCreated = await Order.create({ ...req.body, guest: true });
// 		console.log({ newOrderCreated });

// 		if (newOrderCreated) {
// 			log_request({
// 				method: 'POST',
// 				path: req.originalUrl,
// 				collection: 'Order',
// 				data: [ newOrderCreated ],
// 				status: 201,
// 				success: true,
// 				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 			});
// 			res.status(201).send({ message: 'New Order Created', newOrder: newOrderCreated });
// 		} else {
// 			log_request({
// 				method: 'POST',
// 				path: req.originalUrl,
// 				collection: 'Order',
// 				data: [ newOrderCreated ],
// 				status: 500,
// 				success: false,
// 				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 			});
// 			return res.status(500).send({ message: ' Error in Creating Order.' });
// 		}
// 	} catch (error) {
// 		log_error({
// 			method: 'POST',
// 			path: req.originalUrl,
// 			collection: 'Order',
// 			error,
// 			status: 500,
// 			success: false
// 		});
// 		res.status(500).send({ error, message: 'Error Creating Order' });
// 	}
// });

// router.put('/guestcheckout/:id/pay', async (req: any, res: any) => {
// 	try {
// 		const order = await Order.findById(req.params.id);
// 		console.log({ '/guestcheckout/:id/pay': req.body });
// 		// console.log({ order });
// 		const charge = await stripe.charges.create(
// 			{
// 				amount: (order.totalPrice * 100).toFixed(0),
// 				currency: 'usd',
// 				description: `Order Paid`,
// 				source: req.body.token.id
// 			},
// 			async (err: any, result: any) => {
// 				if (err) {
// 					console.log({ err });
// 					log_error({
// 						method: 'PUT',
// 						path: req.originalUrl,
// 						collection: 'Order',
// 						error: err,
// 						status: 500,
// 						success: false,
// 						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 					});
// 					return res.status(500).send({ error: err, message: err.raw.message });
// 				} else {
// 					console.log({ result });
// 					// if (charge) {
// 					log_request({
// 						method: 'PUT',
// 						path: req.originalUrl,
// 						collection: 'Order',
// 						data: [ result ],
// 						status: 201,
// 						success: true,
// 						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 					});
// 					order.isPaid = true;
// 					order.paidAt = Date.now();
// 					order.payment = {
// 						paymentMethod: 'stripe',
// 						charge: result
// 					};
// 					const updatedOrder = await order.save();
// 					if (updatedOrder) {
// 						log_request({
// 							method: 'PUT',
// 							path: req.originalUrl,
// 							collection: 'Order',
// 							data: [ updatedOrder ],
// 							status: 201,
// 							success: true,
// 							ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 						});
// 						res.send({ message: 'Order Paid.', order: updatedOrder });
// 					}
// 					// }
// 				}
// 			}
// 		);
// 		// 4000000000000002
// 	} catch (error) {
// 		log_error({
// 			method: 'PUT',
// 			path: req.originalUrl,
// 			collection: 'Order',
// 			error,
// 			status: 500,
// 			success: false
// 		});
// 		res.status(500).send({ error, message: 'Error Paying for Order' });
// 	}
// });

// router.put('/:id/refund', async (req: any, res: any) => {
// 	try {
// 		const order = await Order.findById(req.params.id);
// 		const refund = await stripe.refunds.create({
// 			charge: order.payment.charge.id,
// 			amount: req.body.refund_amount * 100
// 		});
// 		if (refund) {
// 			log_request({
// 				method: 'PUT',
// 				path: req.originalUrl,
// 				collection: 'Order',
// 				data: [ refund ],
// 				status: 201,
// 				success: true,
// 				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 			});
// 			order.isRefunded = true;
// 			order.refundedAt = Date.now();
// 			order.payment = {
// 				paymentMethod: order.payment.paymentMethod,
// 				charge: order.payment.charge,
// 				refund: [ ...order.payment.refund, refund ],
// 				refund_reason: [ ...order.payment.refund_reason, req.body.refund_reason ]
// 			};
// 			const updated = await Order.updateOne({ _id: req.params.id }, order);
// 			if (updated) {
// 				log_request({
// 					method: 'PUT',
// 					path: req.originalUrl,
// 					collection: 'Order',
// 					data: [ updated ],
// 					status: 201,
// 					success: true,
// 					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 				});
// 				res.send(updated);
// 			} else {
// 				log_request({
// 					method: 'PUT',
// 					path: req.originalUrl,
// 					collection: 'Product',
// 					data: [ updated ],
// 					status: 404,
// 					success: false,
// 					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
// 				});
// 				res.status(404).send({ message: 'Order not Updated.' });
// 			}
// 		}
// 	} catch (error) {
// 		log_error({
// 			method: 'PUT',
// 			path: req.originalUrl,
// 			collection: 'Order',
// 			error,
// 			status: 500,
// 			success: false
// 		});
// 		res.status(500).send({ error, message: 'Error Refunding Order' });
// 	}
// });

router.put('/addproduct', async (req: any, res: any) => {
	try {
		const order_id = req.body.order._id;
		const product_id = req.body.product;
		const order = await Order.findById(order_id)
			.populate('orderItems.product')
			.populate('orderItems.secondary_product')
			.populate('user');
		order.orderItems.product._id = product_id;
		const updated = await Order.updateOne({ _id: order_id }, order);
		res.send(updated);
	} catch (err) {
		console.log(err);
	}
});

router.put('/create_label', async (req: any, res: any) => {
	try {
		const EasyPost = new easy_post_api(process.env.EASY_POST);
		const order = req.body.order;

		const toAddress = new EasyPost.Address({
			name: order.shipping.first_name + ' ' + order.shipping.last_name,
			street1: order.shipping.address_1,
			street2: order.shipping.address_2,
			city: order.shipping.city,
			state: order.shipping.state,
			zip: order.shipping.postalCode,
			country: order.shipping.country
		});
		const fromAddress = new EasyPost.Address({
			street1: '404 Kenniston Dr',
			street2: 'Apt D',
			city: 'Austin',
			state: 'TX',
			zip: '78752',
			country: 'United States',
			company: 'Glow LEDs',
			phone: '906-284-2208',
			email: 'info.glowleds@gmail.com'
		});
		const cube_root_volume = Math.cbrt(
			order.orderItems.reduce((a: any, c: { package_length: any }) => a + c.package_length, 0) *
				order.orderItems.reduce((a: any, c: { package_width: any }) => a + c.package_width, 0) *
				order.orderItems.reduce((a: any, c: { package_height: any }) => a + c.package_height, 0)
		);
		let weight = 0;
		order.orderItems.forEach((item: any, index: number) => {
			if (item.weight_pounds) {
				weight += item.weight_pounds * 16 + item.weight_ounces;
			} else {
				weight += item.weight_ounces;
			}
		});
		const parcel = new EasyPost.Parcel({
			length: cube_root_volume,
			width: cube_root_volume,
			height: cube_root_volume,
			weight
		});
		let customsInfo = {};
		if (order.shipping.international) {
			const customs_items = order.orderItems.map((item: any) => {
				const customs_item = new EasyPost.CustomsItem({
					description: '3D Printed Accessories',
					quantity: item.qty,
					value: item.price,
					weight: item.weight,
					origin_country: 'US'
				});
				return customs_item;
			});

			customsInfo = new EasyPost.CustomsInfo({
				eel_pfc: 'NOEEI 30.37(a)',
				customs_certify: true,
				customs_signer: order.shipping.first_name + ' ' + order.shipping.last_name,
				contents_type: 'merchandise',
				restriction_type: 'none',
				non_delivery_option: 'return',
				customs_items
			});
		}

		const shipment = new EasyPost.Shipment({
			to_address: toAddress,
			from_address: fromAddress,
			parcel: parcel,
			customsInfo: order.shipping.international ? customsInfo : {}
		});
		const saved_shipment = await shipment.save();
		// console.log({ saved_shipment });
		const created_shipment = await EasyPost.Shipment.retrieve(saved_shipment.id);
		const label = await created_shipment.buy(created_shipment.lowestRate(), 0);
		// console.log({ label });
		res.send(label);
	} catch (err) {
		console.log(err);
	}
});

router.put('/get_shipping_rates', async (req: any, res: any) => {
	try {
		const EasyPost = new easy_post_api(process.env.EASY_POST);
		const order = req.body.order;
		// console.log(order);

		const toAddress = new EasyPost.Address({
			name: order.shipping.first_name + ' ' + order.shipping.last_name,
			street1: order.shipping.address_1,
			street2: order.shipping.address_2,
			city: order.shipping.city,
			state: order.shipping.state,
			zip: order.shipping.postalCode,
			country: order.shipping.country
		});
		const fromAddress = new EasyPost.Address({
			street1: '404 Kenniston Dr',
			street2: 'Apt D',
			city: 'Austin',
			state: 'TX',
			zip: '78752',
			country: 'United States',
			company: 'Glow LEDs',
			phone: '906-284-2208',
			email: 'info.glowleds@gmail.com'
		});
		const cube_root_volume = Math.cbrt(
			order.orderItems.reduce((a: any, c: { package_length: any }) => a + c.package_length, 0) *
				order.orderItems.reduce((a: any, c: { package_width: any }) => a + c.package_width, 0) *
				order.orderItems.reduce((a: any, c: { package_height: any }) => a + c.package_height, 0)
		);
		let weight = 0;
		order.orderItems.forEach((item: any, index: number) => {
			if (item.weight_pounds) {
				weight += item.weight_pounds * 16 + item.weight_ounces;
			} else {
				weight += item.weight_ounces;
			}
		});

		const parcel = new EasyPost.Parcel({
			length: cube_root_volume,
			width: cube_root_volume,
			height: cube_root_volume,
			weight
		});
		let customsInfo = {};
		if (order.shipping.international) {
			const customs_items = order.orderItems.map((item: any) => {
				const customs_item = new EasyPost.CustomsItem({
					description: '3D Printed Accessories',
					quantity: item.qty,
					value: item.price,
					weight: item.weight,
					origin_country: 'US'
				});
				return customs_item;
			});

			customsInfo = new EasyPost.CustomsInfo({
				eel_pfc: 'NOEEI 30.37(a)',
				customs_certify: true,
				customs_signer: order.shipping.first_name + ' ' + order.shipping.last_name,
				contents_type: 'merchandise',
				restriction_type: 'none',
				non_delivery_option: 'return',
				customs_items
			});
		}

		const shipment = new EasyPost.Shipment({
			to_address: toAddress,
			from_address: fromAddress,
			parcel: parcel,
			customsInfo: order.shipping.international ? customsInfo : {}
		});
		const saved_shipment = await shipment.save();
		// console.log({ saved_shipment });
		res.send(saved_shipment);
	} catch (err) {
		console.log(err);
	}
});
router.put('/buy_label', async (req: any, res: any) => {
	try {
		const EasyPost = new easy_post_api(process.env.EASY_POST);
		const order = req.body.order;
		const created_shipment = await EasyPost.Shipment.retrieve(order.shipping.shipment_id);
		const label = await created_shipment.buy(order.shipping.shipping_rate, 0);
		console.log({ label });
		res.send(label);
	} catch (err) {
		console.log(err);
	}
});

router.put('/tracking_number', async (req: any, res: any) => {
	try {
		console.log(req.body);
		const order = await Order.findById(req.body.order._id);
		if (order) {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Order',
				data: [ order ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			// console.log({req.body})
			order.tracking_number = req.body.tracking_number;
			order.shipping.shipping_label = req.body.label;
			const updated = await Order.updateOne({ _id: req.body.order._id }, order);
			if (updated) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Order',
					data: [ updated ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(updated);
			} else {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Product',
					data: [ updated ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Order not Updated.' });
			}
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Refunding Order' });
	}
});

router.put('/:id/refund', async (req: any, res: any) => {
	try {
		const order = await Order.findById(req.params.id);
		console.log({ order });
		const refund = await stripe.refunds.create({
			payment_intent: order.payment.charge.id,
			amount: req.body.refund_amount * 100
		});
		console.log({ refund });
		if (refund) {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Order',
				data: [ refund ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			order.isRefunded = true;
			order.refundedAt = Date.now();
			order.payment = {
				paymentMethod: order.payment.paymentMethod,
				charge: order.payment.charge,
				refund: [ ...order.payment.refund, refund ],
				refund_reason: [ ...order.payment.refund_reason, req.body.refund_reason ]
			};
			const updated = await Order.updateOne({ _id: req.params.id }, order);
			if (updated) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Order',
					data: [ updated ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(updated);
			} else {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Product',
					data: [ updated ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Order not Updated.' });
			}
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Refunding Order' });
	}
});

router.put('/addsecondaryproduct', async (req: any, res: any) => {
	try {
		const order_id = req.body.order._id;
		const product_id = req.body.secondary_product;
		const order = await Order.findById(order_id)
			.populate('orderItems.product')
			.populate('orderItems.secondary_product')
			.populate('user');
		for (let item of order.orderItems) {
			if (
				item.name === 'Mega Diffuser Caps + Adapters Starter Kit' ||
				item.name === 'Diffuser Caps + Adapters Starter Kit'
			) {
				item.secondary_product = product_id;
			}
		}
		console.log({ order });

		const updated = await Order.updateOne({ _id: order_id }, order);
		res.send(updated);
	} catch (err) {
		console.log(err);
	}
});

router.put('/:id/update', async (req: any, res: any) => {
	try {
		const updated_order = req.body;
		console.log({ updated_order });
		const updated = await Order.updateOne({ _id: req.params.id }, updated_order);
		console.log({ updated });
		if (updated) {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Order',
				data: [ updated ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(updated_order);
		} else {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Product',
				data: [ updated ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'Order not Updated.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Order',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Updating Order' });
	}
});

export default router;
