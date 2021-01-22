import axios from 'axios';

export default {
	get_tax_rates: () => {
		return axios.get('/api/orders/tax_rates');
	}
};
