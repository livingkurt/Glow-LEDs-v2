import Axios from 'axios';
import Cookie from 'js-cookie';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING,
	CART_SAVE_PAYMENT,
	CART_LIST_REQUEST,
	CART_LIST_SUCCESS,
	CART_LIST_FAIL,
	CART_DETAILS_REQUEST,
	CART_DETAILS_SUCCESS,
	CART_DETAILS_FAIL,
	CART_SAVE_REQUEST,
	CART_SAVE_SUCCESS,
	CART_SAVE_FAIL,
	CART_DELETE_SUCCESS,
	CART_DELETE_FAIL,
	CART_DELETE_REQUEST
} from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (
	pathname: string,
	qty: number,
	diffuser_cap_color: string,
	diffuser_cap: any,
	cart: any
) => async (
	dispatch: (
		arg0: {
			type: string;
			payload: {
				product: object;
				secondary_product: string;
				name: string;
				display_image: string;
				diffuser_cap: any;
				diffuser_cap_name: string;
				diffuser_cap_color: string;
				price: number;
				sale_price: number;
				countInStock: number;
				package_package_volume: number;
				weight_pounds: number;
				weight_ounces: number;
				package_length: number;
				package_width: number;
				package_height: number;
				qty: number;
				pathname: number;
				category: string;
			};
		}
	) => void,
	getState: () => { cart: { cartItems: any }; userLogin: { userInfo: any } }
) => {
	try {
		console.log('Add To Cart Before');
		const { data } = await Axios.get('/api/products/' + pathname);

		let cartItem: any = {
			product: data._id,
			name: data.name,
			display_image: data.images[0],
			price: data.price,
			sale_price: data.sale_price,
			countInStock: data.countInStock,
			package_volume: data.package_volume,
			weight_pounds: data.weight_pounds,
			weight_ounces: data.weight_ounces,
			package_length: data.package_length,
			package_width: data.package_width,
			package_height: data.package_height,
			pathname: data.pathname,
			category: data.category,
			qty
		};
		console.log({ cartItem });
		if (diffuser_cap_color) {
			cartItem = {
				product: data._id,
				name: data.name,
				display_image: data.images[0],
				diffuser_cap_color,
				diffuser_cap,
				price: data.price,
				sale_price: data.sale_price,
				countInStock: data.countInStock,
				package_volume: data.package_volume,
				weight_pounds: data.weight_pounds,
				weight_ounces: data.weight_ounces,
				package_length: data.package_length,
				package_width: data.package_width,
				package_height: data.package_height,
				pathname: data.pathname,
				category: data.category,
				qty
			};
			console.log({ diffuser_cap_color: cartItem });
		}
		if (diffuser_cap) {
			cartItem = {
				product: data._id,
				secondary_product: diffuser_cap._id ? diffuser_cap._id : '',
				name: data.name,
				display_image: data.images[0],
				diffuser_cap_color,
				diffuser_cap,
				diffuser_cap_name: diffuser_cap.name ? diffuser_cap.name : '',
				price: data.price,
				sale_price: data.sale_price,
				countInStock: data.countInStock,
				package_volume: data.package_volume,
				weight_pounds: data.weight_pounds,
				weight_ounces: data.weight_ounces,
				package_length: data.package_length,
				package_width: data.package_width,
				package_height: data.package_height,
				pathname: data.pathname,
				category: data.category,
				qty
			};
			console.log({ diffuser_cap: cartItem });
		}
		dispatch({
			type: CART_ADD_ITEM,
			payload: cartItem
		});

		const { cart: { cartItems } } = getState();
		Cookie.set('cartItems', JSON.stringify(cartItems));
		// dispatch({ type: CART_SAVE_REQUEST, payload: cart });
		// const { userLogin: { userInfo } } = getState();
		// if (!cart._id) {
		// 	const { data } = await axios.post('/api/carts', cart, {
		// 		headers: {
		// 			Authorization: 'Bearer ' + userInfo.token
		// 		}
		// 	});
		// 	dispatch({ type: CART_SAVE_SUCCESS, payload: data });
		// } else {
		// 	const { data } = await axios.put('/api/carts/' + cart._id, cart, {
		// 		headers: {
		// 			Authorization: 'Bearer ' + userInfo.token
		// 		}
		// 	});
		// 	dispatch({ type: CART_SAVE_SUCCESS, payload: data });
		// }
	} catch (error) {
		console.log({ error });
	}
};

export const removeFromCart = (productId: string) => (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { cart: { cartItems: object } }
) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: productId });

	const { cart: { cartItems } } = getState();
	Cookie.set('cartItems', JSON.stringify(cartItems));
};
export const saveShipping = (data: {
	first_name: string;
	last_name: string;
	address_1: string;
	address_2: string;
	city: string;
	state: string;
	postalCode: string;
	international: boolean;
	country: string;
}) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
	dispatch({ type: CART_SAVE_SHIPPING, payload: data });
	Cookie.set('shipping', JSON.stringify(data));
};

export const savePayment = (data: { paymentMethod: any }) => (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export const listCarts = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void
) => {
	try {
		dispatch({ type: CART_LIST_REQUEST });
		const { data } = await axios.get(
			'/api/carts?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase()
		);
		dispatch({ type: CART_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: CART_LIST_FAIL, payload: error.response.data.message });
	}
};

export const saveCart = (cart: {
	_id: string;
	cart_name?: string;
	application?: number;
	url?: string;
	place_of_purchase?: string;
	date_of_purchase?: string;
	category?: string;
	card?: number;
	amount?: string;
}) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ cartActions: cart });
	try {
		dispatch({ type: CART_SAVE_REQUEST, payload: cart });
		const { userLogin: { userInfo } } = getState();
		if (!cart._id) {
			const { data } = await axios.post('/api/carts', cart, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: CART_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/carts/' + cart._id, cart, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: CART_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: CART_SAVE_FAIL, payload: error.response.data.message });
	}
};

export const detailsCart = (cart_id: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: CART_DETAILS_REQUEST, payload: cart_id });
		const { data } = await axios.get('/api/carts/' + cart_id);
		dispatch({ type: CART_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: CART_DETAILS_FAIL, payload: error.response.data.message });
	}
};

export const deleteCart = (cartId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: CART_DELETE_REQUEST, payload: cartId });
		const { data } = await axios.delete('/api/carts/' + cartId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: CART_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: CART_DELETE_FAIL, payload: error.response.data.message });
	}
};
