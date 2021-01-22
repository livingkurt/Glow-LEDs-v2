import axios from 'axios';

export default {
	get_category_images: (category: any) => {
		// console.log({ category });
		return axios.get('/api/products/images/' + category);
	},
	get_categories: () => {
		return axios.get('/api/products/categories');
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
		return axios.get('/api/products/caps');
	},
	get_mega_diffuser_caps: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/mega_caps');
	},
	get_occurrences: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/orders/occurrences');
	},
	get_best_sellers: (occurences: any) => {
		// console.log({ not_paid_email: array });
		return axios.post('/api/products/best_sellers', { occurences });
	},
	get_essentials: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/essentials');
	},
	promo_code_used: (promo_code: any) => {
		console.log({ promo_code_used: promo_code });
		return axios.put('/api/promos/used', { promo_code });
	},
	// get_product_pictures: (category: string) => {
	// 	return axios.get('/api/products/category/' + category);
	// },
	get_product_pictures: (category: string, subcategory: string) => {
		return axios.get('/api/products/category/' + category + '/subcategory/' + subcategory);
	},
	batch_request: (
		method: string,
		collection: string,
		search_parameter_field: string,
		search_parameter: string,
		action: string,
		property: string,
		value: string,
		user: any
	) => {
		return axios.put(
			'/api/all/' + collection,
			{
				method,
				collection,
				search_parameter_field,
				search_parameter,
				action,
				property,
				value
			},
			{
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			}
		);
	},
	set_sale_price: (discount_percentage: any) => {
		console.log({ set_sale_price: discount_percentage });
		return axios.put('/api/all/product_sale_price', { discount_percentage });
	}
};
