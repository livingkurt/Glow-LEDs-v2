import mongoose from 'mongoose';
export {};

const expenseSchema = new mongoose.Schema(
	{
		expense_name: { type: String, required: true },
		application: { type: String },
		url: { type: String },
		place_of_purchase: { type: String },
		date_of_purchase: { type: Date },
		category: { type: String },
		card: { type: String },
		amount: { type: Number },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const expenseModel = mongoose.model('Expense', expenseSchema);

export default expenseModel;
