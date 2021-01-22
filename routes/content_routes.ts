export {};
import express from 'express';
import { Log } from '../models';
import Content from '../models/content';
import { log_error, log_request } from '../util';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();
router.get('/', async (req, res) => {
	try {
		const category = req.query.category ? { category: req.query.category } : {};
		const searchKeyword = req.query.searchKeyword
			? {
					p: {
						$regex: req.query.searchKeyword,
						$options: 'i'
					}
				}
			: {};

		let sortOrder = {};
		if (req.query.sortOrder === 'glover name') {
			sortOrder = { image: 1 };
		} else if (req.query.sortOrder === 'facebook name') {
			sortOrder = { p: 1 };
		} else if (req.query.sortOrder === 'song id') {
			sortOrder = { link: 1 };
		} else if (req.query.sortOrder === 'button') {
			sortOrder = { button: 1 };
		} else if (req.query.sortOrder === 'instagram handle') {
			sortOrder = { h2: 1 };
		} else if (req.query.sortOrder === 'release_date' || req.query.sortOrder === '') {
			sortOrder = { release_date: -1 };
		} else if (req.query.sortOrder === 'newest') {
			sortOrder = { _id: -1 };
		}

		const contents = await Content.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Content',
			data: contents,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.send(contents);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Content',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Contents' });
	}
});

// router.get('/:id', async (req, res) => {
// 	const content = await Content.findOne({ _id: req.params.id });
// 	// console.log({ content });
// 	if (content) {
// 		res.send(content);
// 	} else {
// 		res.status(404).send({ message: 'Content Not Found.' });
// 	}
// });

router.get('/:id', async (req, res) => {
	try {
		const content = await Content.findOne({ _id: req.params.id });
		// console.log({ content });
		// console.log(req.params.id);
		if (content) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Content',
				data: [ content ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(content);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Content',
				data: [ content ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'Content Not Found.' });
		}
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Content',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Content' });
	}
});

// router.put('/:id', isAuth, isAdmin, async (req, res) => {
// 	const contentId = req.params.id;
// 	const content: any = await Content.findById(contentId);
// 	if (content) {
// 		const updatedContent = await Content.updateOne({ _id: contentId }, req.body);
// 		console.log({ content_routes_post: updatedContent });
// 		if (updatedContent) {
// 			return res.status(200).send({ message: 'Content Updated', data: updatedContent });
// 		}
// 	}
// 	return res.status(500).send({ message: ' Error in Updating Content.' });
// });

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	try {
		// console.log({ content_routes_put: req.body });
		const content_id = req.params.id;
		const content: any = await Content.findById(content_id);
		if (content) {
			const updatedContent = await Content.updateOne({ _id: content_id }, req.body);
			if (updatedContent) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Content',
					data: [ content ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(200).send({ message: 'Content Updated', data: updatedContent });
			}
		} else {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Content',
				data: [ content ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Updating Content.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Content',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Content' });
	}
});

// router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
// 	const content = await Content.findById(req.params.id);
// 	const message: any = { message: 'Content Deleted' };
// 	// const deleted_content = await updated_content.save();
// 	const deleted_content = await Content.updateOne({ _id: req.params.id }, { deleted: true });
// 	if (deleted_content) {
// 		// await deletedContent.remove();
// 		res.send(message);
// 	} else {
// 		res.send('Error in Deletion.');
// 	}
// });

router.delete('/:id', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const message: any = { message: 'Content Deleted' };
		const deleted_content = await Content.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_content) {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ deleted_content ],
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
				data: [ deleted_content ],
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
			collection: 'Content',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Deleting Content' });
	}
});

// router.post('/', async (req, res) => {
// 	const newProduct = await Content.create(req.body);
// 	if (newProduct) {
// 		return res.status(201).send({ message: 'New Content Created', data: newProduct });
// 	}
// 	return res.status(500).send({ message: ' Error in Creating Content.' });
// });

router.post('/', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const newContent = await Content.create(req.body);
		if (newContent) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Content',
				data: [ newContent ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(201).send({ message: 'New Content Created', data: newContent });
		} else {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Content',
				data: [ newContent ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Creating Content.' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Content',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating Content' });
	}
});

// module.exports = router;
export default router;
