import axios from 'axios';

export default {
	get_each_day_income: (date: any) => {
		return axios.get('/api/orders/each_day_income/' + date);
	},
	get_each_month_income: (date: any) => {
		return axios.get('/api/orders/each_month_income/' + date);
	},
	get_daily_income: () => {
		return axios.get('/api/orders/daily_income');
	},

	get_weekly_income: () => {
		return axios.get('/api/orders/weekly_income');
	},
	get_monthly_income: () => {
		return axios.get('/api/orders/monthly_income');
	},
	post_expense: (expense: any, user: any, card: string) => {
		return axios.post(
			'/api/expenses/post_expense',
			{ expense, card },
			{
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			}
		);
	}
};
