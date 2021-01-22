// import mongoose from 'mongoose';
export {};
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		first_name: { type: String },
		last_name: { type: String },
		rating: { type: Number, default: 0 },
		comment: { type: String, required: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		// display_image: { type: String, required: true },
		images: { type: Array },
		video: { type: String },
		brand: { type: String, required: true },
		price: { type: Number, default: 0, required: true },
		category: { type: String, required: true },
		// subcategories: { type: Array },
		subcategory: { type: String },
		countInStock: { type: Number, default: 0, required: true },
		facts: { type: String },
		included_items: { type: String },
		description: { type: String },
		rating: { type: Number, default: 0 },
		numReviews: { type: Number, default: 0 },
		reviews: [ reviewSchema ],
		hidden: { type: Boolean, default: false },
		sale_price: { type: Number, default: 0 },
		sale_start_date: { type: Date },
		sale_end_date: { type: Date },
		deleted: { type: Boolean, default: false },
		pathname: { type: String },
		meta_title: { type: String },
		meta_description: { type: String },
		meta_keywords: { type: String },
		length: { type: Number },
		width: { type: Number },
		height: { type: Number },
		volume: { type: Number },
		package_length: { type: Number },
		package_width: { type: Number },
		package_height: { type: Number },
		package_volume: { type: Number },
		product_length: { type: Number },
		product_width: { type: Number },
		product_height: { type: Number },
		weight_pounds: { type: Number },
		weight_ounces: { type: Number },
		order: { type: Number }
	},
	{
		timestamps: true
	}
);

const productModel = mongoose.model('Product', productSchema);

export default productModel;
