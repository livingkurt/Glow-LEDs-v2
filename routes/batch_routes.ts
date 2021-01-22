export {};
import express from 'express';
import { Affiliate, Email, Expense, Feature, Content, Product, Order, User } from '../models';
require('dotenv');
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.put('/users', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ users: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const users = await User.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ users });
			res.send(users);
		} else {
			const users = await User.find(parameter);
			console.log({ users_get: users });
			res.send(users);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/expenses', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ expenses: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const expenses = await Expense.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ expenses });
			res.send(expenses);
		} else {
			const expenses = await Expense.find(parameter);
			console.log({ expenses_get: expenses });
			res.send(expenses);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/products', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ products: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const products = await Product.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ products });
			res.send(products);
		} else {
			const products = await Product.find(parameter);
			console.log({ products_get: products });
			res.send(products);
		}
	} catch (error) {
		console.log({ error });
	}
});
// Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
router.put('/product_sale_price', async (req, res) => {
	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
	const products = await Product.find({});
	console.log({ discount_percentage: req.body.discount_percentage });

	products.forEach(async (product: any) => {
		const discount = product.price * req.body.discount_percentage;
		console.log({ discount });
		product.sale_price = product.price - discount;
		const result = await product.save();
		console.log({ result });
	});
	// console.log({ products });
	res.send(products);
});

router.put('/features', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ features: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const features = await Feature.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ features });
			res.send(features);
		} else {
			const features = await Feature.find(parameter);
			console.log({ features_get: features });
			res.send(features);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/orders', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ orders: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const orders = await Order.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ orders });
			res.send(orders);
		} else {
			const orders = await Order.find(parameter);
			console.log({ orders_get: orders });
			res.send(orders);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/emails', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ emails: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const emails = await Email.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ emails });
			res.send(emails);
		} else {
			const emails = await Email.find(parameter);
			console.log({ emails_get: emails });
			res.send(emails);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/affiliates', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ affiliates: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const affiliates = await Affiliate.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ affiliates });
			res.send(affiliates);
		} else {
			const affiliates = await Affiliate.find(parameter);
			console.log({ affiliates_get: affiliates });
			res.send(affiliates);
		}
	} catch (error) {
		console.log({ error });
	}
});
router.put('/contents', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ contents: req.body });
		const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
		let parameter: any = {};
		if (search_parameter_field && search_parameter) {
			parameter = { [search_parameter_field]: search_parameter };
		}
		if (method === 'updateMany') {
			const contents = await Content.updateMany(parameter, {
				[action]: { [property]: value }
			});
			console.log({ contents });
			res.send(contents);
		} else {
			const contents = await Content.find(parameter);
			console.log({ contents_get: contents });
			res.send(contents);
		}
	} catch (error) {
		console.log({ error });
	}
});

// router.get('/address_1', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	// const order = await Order.updateMany(
// 	//   {},{$rename:
// 	//     {shipping: { address: 'address_1' }},
// 	// }

// 	// );
// 	const order = await Order.updateMany(
// 		{
// 			// 'orderItems.name': {
// 			// 	$regex: 'Diffuser Caps',
// 			// 	$options: 'i'
// 			// }
// 		},
// 		{
// 			$set: {
// 				'shipping.address_2': '',
// 				'shipping.shipping_rate': {},
// 				'shipping.shipment_id': ''
// 			}
// 		},
// 		// {
// 		// 	$rename: {
// 		// 		'shipping.address': 'shipping.address_1'
// 		// 	}
// 		// },
// 		{ multi: true }
// 		// { upsert: true },
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// router.get('/address_1', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	// const order = await Order.updateMany(
// 	//   {},{$rename:
// 	//     {shipping: { address: 'address_1' }},
// 	// }

// 	// );
// 	const order = await Order.updateMany(
// 		{
// 			// 'orderItems.name': {
// 			// 	$regex: 'Diffuser Caps',
// 			// 	$options: 'i'
// 			// }
// 		},
// 		{
// 			$set: {
// 				'shipping.address_2': '',
// 				'shipping.shipping_rate': {},
// 				'shipping.shipment_id': ''
// 			}
// 		},
// 		// {
// 		// 	$rename: {
// 		// 		'shipping.address': 'shipping.address_1'
// 		// 	}
// 		// },
// 		{ multi: true }
// 		// { upsert: true },
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

// router.put('/products', async (req, res) => {
// 	// const products = await Product.find({});
// 	// for (let product of products) {
// 	// }
// 	// res.send(products);
// 	const product = await Product.updateMany(
// 		{ category: 'diffuser_caps' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				description:
// 					'Take your light shows to a new dimension with Diffuser Caps! This new gloving tech puts patterns and designs on the outside of your glove to add a mesmerizing and unique effect to your lightshows. These Diffuser Adapters are the secret to the technology. Simply place the Diffuser Adapters (sold separately) on your microlight inside of the glove and then twist on the cap to the Diffuser Adapter from the outside of the glove! Diffuser caps are about the size of a classic dome diffuser. 15mm in Diameter. People will be speechless at your tracers and effects! 100% facemelt guarantee. Lights not included. Patent pending. The Diffuser Caps are compatible with the Mini Diffuser Caps purchased before 12/3/20. View the graphic below for visual representation of what we mean.'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		}
// 	);
// 	res.send(product);
// });

// router.put('/expenses', async (req, res) => {
// 	// const products = await Product.find({});

// 	// for (let product of products) {
// 	// }
// 	// res.send(products);
// 	const expenses = await Expense.updateMany(
// 		{ category: 'frosted_diffusers' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				expense_name: '',
// 				application: '',
// 				url: '',
// 				category: 'Supplies',
// 				place_of_purchase: 'Amazon',
// 				card: 'AMZNK',
// 				date_of_purchase: '',
// 				amount: 0,
// 				deleted: false
// 			}
// 			// $unset: { shipping_price: 1 }
// 		}
// 	);
// 	res.send(expenses);
// });
// router.put('/errors_test', async (req, res) => {
// 	try {
// 		const products = await Product.find({});
// 		if (products.length > 0) {
// 			res.send(products);
// 		} else {
// 			res.status(404).send('Products Not Found.');
// 		}
// 	} catch (error) {
// 		console.log({ error });
// 		res.send({ error });
// 	}
// });

// router.get('/products', async (req, res) => {
// 	// const products = await Product.find({});

// 	// for (let product of products) {
// 	// }
// 	// res.send(products);
// 	const products = await Product.find();
// 	console.log({ products });
// 	console.log(products);
// 	let array = [];
// 	for (let product of products) {
// 		console.log(product);
// 		array.push(product);
// 	}
// 	res.send(array);
// });

// // // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// // router.put('/add_reviewed_false', async (req, res) => {
// // 	// const orders = await Order.find({ createdAt: { $lte: new Date(), $gte: new Date(Date() + 14) } });
// // 	const order = await Order.updateMany(
// // 		{
// // 			createdAt: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
// // 		},
// // 		{
// // 			// $rename: { shipping_price: 'volume' }
// // 			$set: {
// // 				'orderItems.$.reviewed': false
// // 			}
// // 			// $unset: { shipping_price: 1 }
// // 		},
// // 		{ upsert: true }
// // 	);
// // 	console.log({ order });

// // 	res.send(order);
// // 	// console.log({ orders });
// // 	// res.send(orders);
// // });

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color_string_lights', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.category': 'glow_strings' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': ''
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.category': 'frosted_diffusers' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Translucent White'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color_dome', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Frosted Dome Diffusers' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Translucent White'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color_adapters', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Diffuser Adapters (No Caps)' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Translucent White'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color_dome_15', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Original 15mm Frosted Dome Diffusers' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Translucent White',
// 				'orderItems.$.name': 'Frosted Dome Diffusers'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_remove_color_large_domes', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Large Frosted Dome Diffusers' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Translucent White',
// 				'orderItems.$.name': 'Frosted Mega Dome Diffusers'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });

// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_original', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Black',
// 				'orderItems.$.secondary_product': '5eff4ab907deec002a7c4392',
// 				'orderItems.$.category': 'diffuser_caps'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_mini', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{ 'orderItems.name': 'Mega Diffuser Caps + Adapters Starter Kit' },
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Black',
// 				'orderItems.$.secondary_product': '5eff4ab907deec002a7c4392',
// 				'orderItems.$.category': 'mega_diffuser_caps'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// router.put('/product_color', async (req, res) => {
// 	// const order = await Order.find({}, { diffuser_cap_color: 1 });
// 	const order = await Order.updateMany(
// 		{},
// 		{ diffuser_cap_color: 1 },
// 		{
// 			$rename: { diffuser_cap_color: 'product_color' }
// 		}
// 		// { upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_original_caps', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// 	const order = await Order.updateMany(
// 		{
// 			'orderItems.name': {
// 				$regex: 'Diffuser Caps',
// 				$options: 'i'
// 			}
// 		},
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				// 'orderItems.$.diffuser_cap_color': 'Black',
// 				'orderItems.$.category': 'diffuser_caps'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ multi: true }
// 		// { upsert: true },
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // Adding Black to each Diffuser Adapter Starter kit Diffuser cap Color field
// router.put('/orders_mini_caps', async (req, res) => {
// 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });

// 	// const order = await   Order.find()
// 	// .forEach(function(item){
// 	//   Order.update(
// 	//     {
// 	//       orderItems: {
// 	//         name: item.name, {
// 	//           $regex: 'Mega Diffuser Caps',
// 	//           $options: 'i'
// 	//         }
// 	//       }
// 	//     },
// 	//         {$set: {
// 	//           'orderItems.$.diffuser_cap_color': 'Black',
// 	//           'orderItems.$.category': 'mega_diffuser_caps'
// 	//         }}
// 	//     )
// 	// });
// 	diffuser_cap_color: 'Black';
// 	category: 'diffuser_caps';

// 	const order = await Order.updateMany(
// 		{
// 			'orderItems.name': {
// 				$regex: 'Mega Diffuser Caps',
// 				$options: 'i'
// 			}
// 		},
// 		{
// 			// $rename: { shipping_price: 'volume' }
// 			$set: {
// 				'orderItems.$.diffuser_cap_color': 'Black',
// 				'orderItems.$.category': 'mega_diffuser_caps'
// 			}
// 			// $unset: { shipping_price: 1 }
// 		},
// 		{ multi: true }
// 		// { upsert: true }
// 	);
// 	console.log({ order });
// 	res.send(order);
// });
// // router.put('/orders_mini_caps', async (req, res) => {
// // 	// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// // 	const order = await Order.updateMany(
// // 		{ 'orderItems.name': 'Mega Diffuser Caps + Adapters Starter Kit' },
// // 		{
// // 			// $rename: { shipping_price: 'volume' }
// // 			$set: {
// // 				'orderItems.$.diffuser_cap_color': 'Black',
// // 				'orderItems.$.secondary_product': '5eff4ab907deec002a7c4392'
// // 			}
// // 			// $unset: { shipping_price: 1 }
// // 		},
// // 		{ upsert: true }
// // 	);
// // 	console.log({ order });
// // 	res.send(order);
// // });

// // router.put('/orders_mini', async (req, res) => {
// // 	const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
// // 	const order = await Order.updateMany(
// // 		{ 'orderItems.name': 'Mega Diffuser Caps + Adapters Starter Kit' },
// // 		{
// // 			// $rename: { shipping_price: 'volume' }
// // 			$set: {
// // 				'orderItems.$.secondary_product': 'Black'
// // 			}
// // 			// $unset: { shipping_price: 1 }
// // 		},
// // 		{ upsert: true }
// // 	);
// // 	console.log({ order });
// // 	res.send(order);
// // });

export default router;
