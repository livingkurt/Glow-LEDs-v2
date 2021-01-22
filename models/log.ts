import mongoose from 'mongoose';
export {};

const logSchema = new mongoose.Schema(
	{
		outcome: { type: String },
		method: { type: String },
		path: { type: String },
		file: { type: String },
		status: { type: Number },
		success: { type: Boolean },
		error: { type: Object },
		ip: { type: String },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const logModel = mongoose.model('Log', logSchema);

export default logModel;
