import mongoose from 'mongoose';
export {};

const home_page_schema = {
	h1: { type: String },
	image: { type: String },
	video: { type: String },
	show_image: { type: Boolean, default: true },
	show_video: { type: Boolean, default: false },
	h2: { type: String },
	p: { type: String },
	button: { type: String },
	link: { type: String }
};

const banner_schema = {
	label: { type: String },
	button: { type: String },
	link: { type: String }
};

const about_schema = {
	kurt_p: { type: String },
	destanye_p: { type: String }
};

const contentSchema = new mongoose.Schema(
	{
		home_page: home_page_schema,
		banner: banner_schema,
		about_page: about_schema,
		active: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const contentModel = mongoose.model('Content', contentSchema);

export default contentModel;
