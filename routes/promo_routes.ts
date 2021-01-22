export {};
import express from 'express';
import Promo from '../models/promo';
import { log_error, log_request } from '../util';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const category = req.query.category ? { category: req.query.category } : {};
		const searchKeyword = req.query.searchKeyword
			? {
					facebook_name: {
						$regex: req.query.searchKeyword,
						$options: 'i'
					}
				}
			: {};

		let sortOrder = {};
		if (req.query.sortOrder === 'admin only') {
			sortOrder = { admin_only: -1 };
		} else if (req.query.sortOrder === 'affiliate only') {
			sortOrder = { affiliate_only: -1 };
		} else if (req.query.sortOrder === 'active') {
			sortOrder = { active: -1 };
		} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
			sortOrder = { _id: -1 };
		}

		const promos = await Promo.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Promo',
			data: promos,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.send(promos);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Promo',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Promos' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const promo = await Promo.findOne({ _id: req.params.id }).populate('sponsor').populate('user');
		console.log({ promo });
		console.log(req.params.id);
		if (promo) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Promo',
				data: [ promo ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(promo);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Promo',
				data: [ promo ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'Promo Not Found.' });
		}
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Promo',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Promo' });
	}
});

// router.put('/:id', isAuth, isAdmin, async (req, res) => {
// 	console.log({ promo_routes_put: req.body });
// 	const promoId = req.params.id;
// 	const promo: any = await Promo.findById(promoId);
// 	if (promo) {
// 		const updatedPromo = await Promo.updateOne({ _id: promoId }, req.body);
// 		if (updatedPromo) {
// 			return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
// 		}
// 	}
// 	return res.status(500).send({ message: ' Error in Updating Promo.' });
// });

router.put('/used', async (req, res) => {
	try {
		console.log({ used: req.body.promo_code });
		console.log('Promo_Routes');
		const promo: any = await Promo.findOne({ promo_code: req.body.promo_code });
		promo.used_once = true;
		console.log({ promo });
		if (promo) {
			const updatedPromo = await Promo.updateOne({ _id: promo._id }, promo);

			if (updatedPromo) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ promo ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
			}
		} else {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Promo',
				data: [ promo ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Updating Promo.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Promo',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Promo' });
	}
});
router.put('/:id', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ promo_routes_put: req.body });
		const promo_id = req.params.id;
		const promo: any = await Promo.findById(promo_id);
		if (promo) {
			const updatedPromo = await Promo.updateOne({ _id: promo_id }, req.body);
			if (updatedPromo) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ promo ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
			}
		} else {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Promo',
				data: [ promo ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Updating Promo.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Promo',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Promo' });
	}
});

// router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
// 	const promo = await Promo.findById(req.params.id);
// 	const updated_promo = { ...promo, deleted: true };
// 	const message: any = { message: 'Promo Deleted' };
// 	// const deleted_promo = await updated_promo.save();
// 	const deleted_promo = await Promo.updateOne({ _id: req.params.id }, { deleted: true });
// 	if (deleted_promo) {
// 		// await deletedPromo.remove();
// 		res.send(message);
// 	} else {
// 		res.send('Error in Deletion.');
// 	}
// });

router.delete('/:id', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const message: any = { message: 'Promo Deleted' };
		const deleted_promo = await Promo.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_promo) {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Promo',
				data: [ deleted_promo ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(message);
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Promo',
				data: [ deleted_promo ],
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
			collection: 'Promo',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Deleting Promo' });
	}
});

// router.post('/', async (req, res) => {
// 	const newPromo = await Promo.create(req.body);
// 	if (newPromo) {
// 		return res.status(201).send({ message: 'New Promo Created', data: newPromo });
// 	}
// 	return res.status(500).send({ message: ' Error in Creating Promo.' });
// });

router.post('/', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const newPromo = await Promo.create(req.body);
		if (newPromo) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Promo',
				data: [ newPromo ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(201).send({ message: 'New Promo Created', data: newPromo });
		} else {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Promo',
				data: [ newPromo ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Creating Promo.' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Promo',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating Promo' });
	}
});

export default router;
