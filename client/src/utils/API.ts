import axios from 'axios';

export default {
	not_paid_email: (order: any, user_data: any) => {
		console.log({ not_paid_email: order });
		console.log({ not_paid_email: user_data });
		return axios.post('/api/emails/notpaid', order, user_data);
	},
	send_announcement_email: (template: string, subject: string, test: boolean) => {
		return axios.post('/api/emails/announcement', { template, subject, test });
	},
	send_order_email: (template: string, subject: string, email: string) => {
		return axios.post('/api/emails/order', { template, subject, email });
	},
	send_order_created_email: (template: string, subject: string, email: string) => {
		return axios.post('/api/emails/order_created', { template, subject, email });
	},
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
	},
	save_user_shipping: (shipping: any, user: any) => {
		console.log({ shipping, user });
		return axios.put(
			`/api/users/shipping`,
			{ shipping, user },
			{
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			}
		);
	},
	save_html: (template: string, email: any, token: any) => {
		console.log({ template, email, token });
		email = { ...email, html: template };
		return axios.put('/api/emails/' + email._id, email, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	},
	not_verified_email: (userInfo: any) => {
		console.log({ not_paid_email: userInfo });
		return axios.post('/api/emails/notverified', userInfo);
	},
	get_category_images: (category: any) => {
		// console.log({ category });
		return axios.get('/api/products/images/' + category);
	},
	// get_product_names: (array: any) => {
	// 	console.log({ not_paid_email: array });
	// 	return axios.post('/api/products/array', array);
	// },
	save_product: (order: any, user_data: any, product: any) => {
		console.log({ save_product: { order, user_data, product } });
		return axios.put('/api/orders/addproduct', { order, user_data, product });
	},
	save_secondary_product: (order: any, user_data: any, secondary_product: any) => {
		console.log({ save_secondary_product: { order, user_data, secondary_product } });
		return axios.put('/api/orders/addsecondaryproduct', { order, user_data, secondary_product });
	},
	get_original_diffuser_caps: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/originalcaps');
	},
	get_mega_diffuser_caps: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/mega_caps');
	},
	print_invoice: (order: any) => {
		// console.log({ not_paid_email: array });
		return axios.post('/api/emails/invoice', order);
	},
	get_occurrences: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/orders/occurrences');
	},
	update_leds: (query_url: string, field: string, value: number) => {
		console.log(`http://${query_url}/${field}?value=${value}`);
		return axios.post(`http://${query_url}/${field}?value=${value}`);
	},
	update_rgb: (query_url: string, red_value: number, green_value: number, blue_value: number) => {
		console.log(`http://${query_url}/rgb?r=${red_value}&g=${green_value}&b=${blue_value}`);
		return axios.post(`http://${query_url}/rgb?r=${red_value}&g=${green_value}&b=${blue_value}`);
	},
	update_hsv: (query_url: string, hue: number, saturation: number, value: number) => {
		console.log(`http://${query_url}/hsv?h=${hue}&s=${saturation}&v=${value}`);
		return axios.post(`http://${query_url}/hsv?h=${hue}&s=${saturation}&v=${value}`);
	},
	get_all_settings: (query_url: string) => {
		return axios.get(`http://${query_url}/all`);
	},
	get_device_name: (query_url: string) => {
		return axios.get(`http://${query_url}/device`);
	},
	reset_device: (query_url: string) => {
		return axios.post(`http://${query_url}/reset`);
	}
};
