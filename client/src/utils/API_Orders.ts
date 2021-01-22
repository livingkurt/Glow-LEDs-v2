import axios from 'axios';

export default {
	get_all_shipping: () => {
		return axios.get('/api/orders/all_shipping');
	},
	create_label: (order: any, shipping_rate: number) => {
		return axios.put('/api/orders/create_label', { order, shipping_rate });
	},
	get_shipping_rates: (order: any) => {
		return axios.put('/api/orders/get_shipping_rates', { order });
	},
	buy_label: (order: any, shipping_rate: any) => {
		return axios.put('/api/orders/buy_label', { order, shipping_rate });
	},
	add_tracking_number: (order: any, tracking_number: any, label: any) => {
		return axios.put('/api/orders/tracking_number', { order, tracking_number, label });
	}
	// save_shipment_id: (order: any, shipment_id: string) => {
	// 	return axios.put('/api/orders/shipment_id', { order, shipment_id });
	// }
};
