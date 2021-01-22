import mongoose from 'mongoose';
export {};

// const email_schema = {
// 	h1: { type: String, default: '' },
// 	image: { type: String, default: '' },
// 	show_image: { type: Boolean, default: true },
// 	h2: { type: String, default: '' },
// 	p: { type: String, default: '' },
// 	button: { type: String, default: '' },
// 	link: { type: String, default: '' }
// };

const emailSchema = new mongoose.Schema(
	{
		email_type: { type: String },
		h1: { type: String },
		image: { type: String },
		show_image: { type: Boolean, default: true },
		h2: { type: String },
		p: { type: String },
		button: { type: String },
		link: { type: String },
		html: { type: String },
		active: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const emailModel = mongoose.model('Email', emailSchema);

export default emailModel;

// import mongoose from 'mongoose';
// export {};

// const email_schema = {
// 	h1: { type: String, default: '' },
// 	image: { type: String, default: '' },
// 	show_image: { type: Boolean, default: true },
// 	h2: { type: String, default: '' },
// 	p: { type: String, default: '' },
// 	button: { type: String, default: '' },
// 	link: { type: String, default: '' }
// };

// const emailSchema = new mongoose.Schema(
// 	{
// 		announcement: email_schema,
// 		order: email_schema,
// 		account_created: email_schema,
// 		review: email_schema,
// 		reset_password: email_schema,
// 		password_changed: email_schema,
// 		active: { type: Boolean, default: true },
// 		deleted: { type: Boolean, default: false }
// 	},
// 	{
// 		timestamps: true
// 	}
// );

// const emailModel = mongoose.model('Email', emailSchema);

// export default emailModel;
