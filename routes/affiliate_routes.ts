export {};
import express from 'express';
import { Log } from '../models';
import Affiliate from '../models/affiliate';
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
		if (req.query.sortOrder === 'glover name') {
			sortOrder = { artist_name: 1 };
		} else if (req.query.sortOrder === 'facebook name') {
			sortOrder = { facebook_name: 1 };
		} else if (req.query.sortOrder === 'sponsor') {
			sortOrder = { sponsor: -1 };
		} else if (req.query.sortOrder === 'promoter') {
			sortOrder = { promoter: -1 };
		} else if (req.query.sortOrder === 'active') {
			sortOrder = { active: -1 };
		} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
			sortOrder = { _id: -1 };
		}

		const affiliates = await Affiliate.find({ deleted: false, ...category, ...searchKeyword })
			.sort(sortOrder)
			.populate('user');
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Affiliate',
			data: affiliates,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.send(affiliates);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Affiliate',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Affiliates' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const affiliate = await Affiliate.findOne({ _id: req.params.id }).populate('user');
		console.log({ affiliate });
		console.log(req.params.id);
		if (affiliate) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ affiliate ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(affiliate);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ affiliate ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'Affiliate Not Found.' });
		}
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Affiliate',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Affiliate' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ affiliate_routes_put: req.body });
		const affiliate_id = req.params.id;
		const affiliate: any = await Affiliate.findById(affiliate_id);
		if (affiliate) {
			const updatedAffiliate = await Affiliate.updateOne({ _id: affiliate_id }, req.body);
			if (updatedAffiliate) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Affiliate',
					data: [ affiliate ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(200).send({ message: 'Affiliate Updated', data: updatedAffiliate });
			}
		} else {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ affiliate ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Updating Affiliate.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Affiliate',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Affiliate' });
	}
});

router.delete('/:id', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const message: any = { message: 'Affiliate Deleted' };
		const deleted_affiliate = await Affiliate.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_affiliate) {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ deleted_affiliate ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(message);
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ deleted_affiliate ],
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
			collection: 'Affiliate',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Deleting Affiliate' });
	}
});

router.post('/', isAuth, async (req: any, res: any) => {
	try {
		const newAffiliate = await Affiliate.create(req.body);
		if (newAffiliate) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ newAffiliate ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(201).send({ message: 'New Affiliate Created', data: newAffiliate });
		} else {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ newAffiliate ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Creating Affiliate.' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Affiliate',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating Affiliate' });
	}
});

export default router;
