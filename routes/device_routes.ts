export {};
import express from 'express';
import Device from '../models/device';
const { isAuth, isAdmin } = require('../util');
import axios from 'axios';
const fetch = require('node-fetch');

const router = express.Router();

router.post('/update_leds', async (req: any, res: any) => {
	try {
		const response = await fetch(`http://${req.body.query_url}/${req.body.field}?value=${req.body.value}`, {
			method: 'POST'
		});
		const settings = await response.json();
		console.log({ settings });
		if (settings) {
			return res.status(201).send({ message: 'LEDs Updated', data: settings });
		}
		return res.status(500).send({ message: ' Error Updating LEDs' });
	} catch (error) {
		console.log(error);
	}
});
router.post('/update_rgb', async (req: any, res: any) => {
	try {
		const response = await fetch(
			`http://${req.body.query_url}/rgb?r=${req.body.red_value}&g=${req.body.green_value}&b=${req.body
				.blue_value}`,
			{ method: 'POST' }
		);
		const settings = await response.json();
		console.log({ settings });
		if (settings) {
			return res.status(201).send({ message: 'LEDs Updated', data: settings });
		}
		return res.status(500).send({ message: ' Error Updating LEDs' });
	} catch (error) {
		console.log(error);
	}
});
router.post('/update_hsv', async (req: any, res: any) => {
	try {
		const response = await fetch(
			`http://${req.body.query_url}/hsv?h=${req.body.hue}&s=${req.body.saturation}&v=${req.body.value}`,
			{ method: 'POST' }
		);
		// console.log({ response });
		// const settings = await response.json();
		// console.log({ settings });
		// if (settings) {
		return res.status(201).send({ message: 'LEDs Updated', data: 'complete' });
		// }
		// return res.status(500).send({ message: ' Error Updating LEDs' });
	} catch (error) {
		console.log(error);
	}
});
router.post('/settings', async (req: any, res: any) => {
	console.log({ query_url: req.body.query_url });
	try {
		const response = await fetch(`http://${req.body.query_url}/all`);
		const settings = await response.json();
		console.log({ settings });
		if (settings) {
			return res.status(201).send({ message: 'LEDs Updated', data: settings });
		}
		return res.status(500).send({ message: ' Error Updating LEDs' });
	} catch (error) {
		console.log(error);
	}
});
router.post('/device_name', async (req: any, res: any) => {
	try {
		const response = await fetch(`http://${req.body.query_url}/device`);
		const settings = await response.json();
		console.log({ settings });
		if (settings) {
			return res.status(201).send({ message: 'LEDs Updated', data: settings });
		}
		return res.status(500).send({ message: ' Error Updating LEDs' });
	} catch (error) {
		console.log(error);
	}
});
router.post('/reset', async (req: any, res: any) => {
	try {
		const response = await fetch(`http://${req.body.query_url}/reset`);
		const settings = await response.json();
		console.log({ settings });
		if (settings) {
			return res.status(201).send({ message: 'LEDs Updated', data: settings });
		}
		return res.status(500).send({ message: ' Error Updating LEDs' });
	} catch (error) {
		console.log(error);
	}
});

router.get('/', async (req, res) => {
	const category = req.query.category ? { category: req.query.category } : {};
	const searchKeyword = req.query.searchKeyword
		? {
				device_name: {
					$regex: req.query.searchKeyword,
					$options: 'i'
				}
			}
		: {};

	// let sortOrder = {};
	// if (req.query.sortOrder === 'glover name') {
	// 	sortOrder = { artist_name: 1 };
	// } else if (req.query.sortOrder === 'facebook name') {
	// 	sortOrder = { facebook_name: 1 };
	// } else if (req.query.sortOrder === 'song id') {
	// 	sortOrder = { song_id: 1 };
	// } else if (req.query.sortOrder === 'product') {
	// 	sortOrder = { product: 1 };
	// } else if (req.query.sortOrder === 'instagram handle') {
	// 	sortOrder = { instagram_handle: 1 };
	// } else if (req.query.sortOrder === 'release_date' || req.query.sortOrder === '') {
	// 	sortOrder = { release_date: -1 };
	// } else if (req.query.sortOrder === 'newest') {
	// 	sortOrder = { _id: -1 };
	// }

	const devices = await Device.find({ deleted: false, ...category, ...searchKeyword });
	// console.log(devices);
	res.send(devices);
});

router.get('/mine', isAuth, async (req: any, res: any) => {
	const devices = await Device.find({ deleted: false, user: req.user._id }).sort({ _id: -1 });
	res.send(devices);
});

router.get('/:id', async (req, res) => {
	const device = await Device.findOne({ _id: req.params.id });
	console.log({ device });
	console.log(req.params.id);
	if (device) {
		res.send(device);
	} else {
		res.status(404).send({ message: 'Device Not Found.' });
	}
});

router.post('/', async (req, res) => {
	console.log('Post New Device');
	const newDevice = await Device.create(req.body);
	if (newDevice) {
		return res.status(201).send({ message: 'New Device Created', data: newDevice });
	}
	return res.status(500).send({ message: ' Error in Creating Device.' });
});

router.put('/:id', isAuth, async (req, res) => {
	console.log({ device_routes_put: req.body });
	const deviceId = req.params.id;
	const device: any = await Device.findById(deviceId);
	if (device) {
		const updatedDevice = await Device.updateOne({ _id: deviceId }, req.body);
		if (updatedDevice) {
			return res.status(200).send({ message: 'Device Updated', data: updatedDevice });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Device.' });
});

router.delete('/:id', isAuth, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const device = await Device.findById(req.params.id);
	const updated_device = { ...device, deleted: true };
	const message: any = { message: 'Device Deleted' };
	// const deleted_device = await updated_device.save();
	const deleted_device = await Device.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_device) {
		// await deletedDevice.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

// module.exports = router;
export default router;
