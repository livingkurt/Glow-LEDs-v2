import mongoose from 'mongoose';
export {};
// const mongoose = require('mongoose');

const cartSchema = {
	cartItems: { type: Array },
	deleted: { type: Boolean, default: false }
};

// const settingsSchema = {
// 	brightness: { type: Number, default: 255 },
// 	motion_speed: { type: Number },
// 	autoplay_pattern: { type: Boolean, default: true },
// 	palette: { type: Number },
// 	blend_palette: { type: Boolean, default: true },
// 	autoplay_palette: { type: Boolean, default: false },
// 	color_density: { type: Number },
// 	color_speed: { type: Number },
// 	color_fade: { type: Number }
// };

// const deviceSettingsSchema = {
// 	strobe_settings: settingsSchema,
// 	pulse_settings: settingsSchema,
// 	sparkle_settings: settingsSchema,
// 	shooting_star_settings: settingsSchema,
// 	cycling_desaturated_settings: settingsSchema,
// 	color_waves_settings: settingsSchema,
// 	beat_settings: settingsSchema,
// 	juggle_settings: settingsSchema,
// 	twinkle_settings: settingsSchema,
// 	hsv_settings: settingsSchema
// };

// const deviceSchema = {
// 	device_name: { type: String },
// 	query_url: { type: String },
// 	location: { type: String },
// 	pathname: { type: String },
// 	device_settings: deviceSettingsSchema,
// 	pattern_order: { type: Array },
// 	palette_order: { type: Array },
// 	deleted: { type: Boolean, default: false }
// };

const shippingSchema = {
	first_name: { type: String },
	last_name: { type: String },
	address_1: { type: String },
	address_2: { type: String },
	city: { type: String },
	state: { type: String },
	postalCode: { type: String },
	international: { type: Boolean },
	country: { type: String }
};

const userSchema = new mongoose.Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String },
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
			dropDups: true
		},
		shipping: shippingSchema,
		password: { type: String, required: true },

		isAdmin: { type: Boolean, required: true, default: false },
		isVerified: { type: Boolean, required: true, default: false },
		is_affiliated: { type: Boolean, required: true, default: false },
		devices: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Device' } ],
		cart: cartSchema,
		affiliate: { type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' },
		email_subscription: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const userModel = mongoose.model('User', userSchema);

export default userModel;

// module.exports = userModel;
