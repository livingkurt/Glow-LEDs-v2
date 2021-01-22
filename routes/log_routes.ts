export {};
import express from 'express';
import Log from '../models/log';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();
router.get('/', async (req, res) => {
	const category = req.query.category ? { category: req.query.category } : {};
	const searchKeyword = req.query.searchKeyword
		? {
				file: {
					$regex: req.query.searchKeyword,
					$options: 'i'
				}
			}
		: {};

	let sortOrder = {};
	if (req.query.sortOrder === 'file') {
		sortOrder = { file: 1 };
	} else if (req.query.sortOrder === 'method') {
		sortOrder = { method: 1 };
	} else if (req.query.sortOrder === 'status') {
		sortOrder = { status: -1 };
	} else if (req.query.sortOrder === 'success') {
		sortOrder = { success: -1 };
	} else if (req.query.sortOrder === 'error') {
		sortOrder = { error: -1 };
	} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
		sortOrder = { _id: -1 };
	}

	const logs = await Log.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder).limit(100);
	// console.log(logs);
	res.send(logs);
});

router.get('/:id', async (req, res) => {
	const log = await Log.findOne({ _id: req.params.id });
	// console.log({ log });
	if (log) {
		res.send(log);
	} else {
		res.status(404).send({ message: 'Log Not Found.' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	const logId = req.params.id;
	const log: any = await Log.findById(logId);
	if (log) {
		const updatedLog = await Log.updateOne({ _id: logId }, req.body);
		console.log({ log_routes_post: updatedLog });
		if (updatedLog) {
			return res.status(200).send({ message: 'Log Updated', data: updatedLog });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Log.' });
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const log = await Log.findById(req.params.id);
	const message: any = { message: 'Log Deleted' };
	// const deleted_log = await updated_log.save();
	const deleted_log = await Log.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_log) {
		// await deletedLog.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.post('/', async (req, res) => {
	const newLog = await Log.create(req.body);
	if (newLog) {
		return res.status(201).send({ message: 'New Log Created', data: newLog });
	}
	return res.status(500).send({ message: ' Error in Creating Log.' });
});

// module.exports = router;
export default router;
