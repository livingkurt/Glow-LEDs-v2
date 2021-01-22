import axios from 'axios';

export default {
	not_paid_email: (order: any, user_data: any) => {
		console.log({ not_paid_email: order });
		console.log({ not_paid_email: user_data });
		return axios.post('/api/emails/notpaid', order, user_data);
	},
	send_announcement_email: (template: string, subject: string, test: boolean, chunk: number) => {
		return axios.post('/api/emails/announcement', { template, subject, test, chunk });
	},
	send_order_email: (template: string, subject: string, email: string) => {
		return axios.post('/api/emails/order', { template, subject, email });
	},
	send_order_created_email: (template: string, subject: string) => {
		return axios.post('/api/emails/order_created', { template, subject });
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
	print_invoice: (order: any) => {
		// console.log({ not_paid_email: array });
		return axios.post('/api/emails/invoice', order);
	}
};
