// import mongoose from 'mongoose';
export {};
const mongoose = require('mongoose');

const shippingSchema = {
	shipment_id: { type: String },
	shipping_rate: { type: Object },
	shipping_label: { type: Object },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	address: { type: String },
	address_1: { type: String, required: true },
	address_2: { type: String },
	city: { type: String, required: true },
	state: { type: String, required: true },
	postalCode: { type: String, required: true },
	international: { type: Boolean },
	country: { type: String, required: true }
};

const paymentSchema = {
	paymentMethod: { type: String, required: true },
	payment: { type: Object },
	charge: { type: Object },
	refund: { type: Array },
	refund_reason: { type: Array }
};

const orderItemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		qty: { type: Number, required: true },
		display_image: { type: String, required: true },
		diffuser_cap_color: { type: String },
		diffuser_cap_name: { type: String },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		pathname: { type: String, required: true },
		sale_price: { type: Number },
		package_volume: { type: Number },
		weight_pounds: { type: Number },
		weight_ounces: { type: Number },
		length: { type: Number },
		width: { type: Number },
		height: { type: Number },
		package_length: { type: Number },
		package_width: { type: Number },
		package_height: { type: Number },
		reviewed: { type: Boolean, default: false },
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true
		},
		secondary_product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		}
	},
	{
		timestamps: true
	}
);

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		orderItems: [ orderItemSchema ],
		shipping: shippingSchema,
		payment: paymentSchema,
		itemsPrice: { type: Number },
		taxPrice: { type: Number },
		shippingPrice: { type: Number },
		totalPrice: { type: Number },
		guest: { type: Boolean, default: false },
		isPaid: { type: Boolean, default: false },
		paidAt: { type: Date },
		isReassured: { type: Boolean, default: false },
		reassuredAt: { type: Date },
		isManufactured: { type: Boolean, default: false },
		manufacturedAt: { type: Date },
		isPackaged: { type: Boolean, default: false },
		packagedAt: { type: Date },
		isShipped: { type: Boolean, default: false },
		shippedAt: { type: Date },
		isDelivered: { type: Boolean, default: false },
		deliveredAt: { type: Date },
		isRefunded: { type: Boolean, default: false },
		refundedAt: { type: Date },
		order_note: { type: String },
		promo_code: { type: String },
		tracking_number: { type: String },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
// module.exports = Order;
