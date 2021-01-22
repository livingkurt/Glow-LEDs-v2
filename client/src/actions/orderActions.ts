import axios from 'axios';
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_REMOVE_STATE,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	MY_ORDER_LIST_REQUEST,
	MY_ORDER_LIST_SUCCESS,
	MY_ORDER_LIST_FAIL,
	ORDER_DELETE_REQUEST,
	ORDER_DELETE_SUCCESS,
	ORDER_DELETE_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_UPDATE_REQUEST,
	ORDER_UPDATE_SUCCESS,
	ORDER_UPDATE_FAIL,
	ORDER_SAVE_REQUEST,
	ORDER_SAVE_SUCCESS,
	ORDER_SAVE_FAIL,
	ORDER_REFUND_REQUEST,
	ORDER_REFUND_SUCCESS,
	ORDER_REFUND_FAIL,
	ORDER_DETAILS_PUBLIC_REQUEST,
	ORDER_DETAILS_PUBLIC_SUCCESS,
	ORDER_DETAILS_PUBLIC_FAIL
} from '../constants/orderConstants';
import Cookie from 'js-cookie';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstants';

export const createPayOrder = (
	order: {
		orderItems: object;
		shipping: object;
		payment: any;
		itemsPrice: number;
		shippingPrice: number;
		taxPrice: number;
		totalPrice: number;
		user_data: object;
		order_note: string;
		promo_code: string;
		// product: string;
	},
	paymentMethod: any
	// token: any
) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
		const { userLogin: { userInfo: user_data } } = getState();
		const { data: { data: newOrder } } = await axios.post('/api/orders', order, {
			headers: {
				Authorization: ' Bearer ' + user_data.token
			}
		});

		dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });

		const { data } = await axios.put(
			'/api/orders/' + newOrder._id + '/pay',
			{ paymentMethod },
			{
				headers: { Authorization: 'Bearer ' + user_data.token }
			}
		);
		dispatch({ type: ORDER_PAY_SUCCESS, payload: data });

		// axios.post('/api/emails/order', { ...newOrder, token });
		// axios.post('/api/emails/sale', { ...newOrder, token });
		Cookie.remove('shipping');
		Cookie.remove('diffuser_cap');
		dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
	} catch (error) {
		console.log({ error_message: error.response.data.message });
		console.log({ error: error });
		console.log({ error_response: error.response });
		dispatch({ type: ORDER_CREATE_FAIL, payload: error.response.data.message });
	}
};

export const createPayOrderGuest = (
	order: {
		orderItems: object;
		shipping: any;
		payment: any;
		itemsPrice: number;
		shippingPrice: number;
		taxPrice: number;
		totalPrice: number;
		order_note: string;
		promo_code: string;
	},
	create_account: boolean,
	password: string,
	paymentMethod: any
) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		if (create_account) {
			dispatch({
				type: USER_REGISTER_REQUEST,
				payload: {
					first_name: order.shipping.first_name,
					last_name: order.shipping.last_name,
					email: order.shipping.email,
					password: password
				}
			});
			const { data } = await axios.post('/api/users/register', {
				first_name: order.shipping.first_name,
				last_name: order.shipping.last_name,
				email: order.shipping.email,
				password: password
			});
			dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
			axios.post('/api/emails/verified', data);
			dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
			const { data: { newOrder } } = await axios.post('/api/orders/guestcheckout', { ...order, user: data._id });
			console.log({ newOrder });

			dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });

			const paid = await axios.put('/api/orders/guestcheckout/' + newOrder._id + '/pay', { paymentMethod });
			console.log({ paid });
			dispatch({ type: ORDER_PAY_SUCCESS, payload: paid.data });

			// axios.post('/api/emails/order', { ...newOrder, token });
			// axios.post('/api/emails/sale', { ...newOrder, token });
			Cookie.remove('shipping');
			Cookie.remove('diffuser_cap');
			dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
		} else {
			dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
			const { data: { newOrder } } = await axios.post('/api/orders/guestcheckout', order);
			console.log({ newOrder });

			dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });

			const paid = await axios.put('/api/orders/guestcheckout/' + newOrder._id + '/pay', { paymentMethod });
			console.log({ paid });
			dispatch({ type: ORDER_PAY_SUCCESS, payload: paid.data });

			// axios.post('/api/emails/order', { ...newOrder, token });
			// axios.post('/api/emails/sale', { ...newOrder, token });
			Cookie.remove('shipping');
			Cookie.remove('diffuser_cap');
			dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
		}
	} catch (error) {
		console.log({ error_message: error.response.data.message });
		console.log({ error: error });
		console.log({ error_response: error.response });
		dispatch({ type: ORDER_CREATE_FAIL, payload: error.response.data.message });
	}
};
export const createOrderGuest = (order: {
	orderItems: object;
	shipping: any;
	payment: any;
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	order_note: string;
	promo_code: string;
}) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
		const { data: { newOrder } } = await axios.post('/api/orders/guestcheckout', order);
		console.log({ newOrder });
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
		Cookie.remove('shipping');
		Cookie.remove('diffuser_cap');
		dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
	} catch (error) {
		console.log({ error_message: error.response.data.message });
		console.log({ error: error });
		console.log({ error_response: error.response });
		dispatch({ type: ORDER_CREATE_FAIL, payload: error.response.data.message });
	}
};

export const createOrder = (order: {
	orderItems: object;
	shipping: object;
	payment: any;
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	user_data: object;
	order_note: string;
	promo_code: string;
}) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
		const { userLogin: { userInfo: user_data } } = getState();
		const { data: { data: newOrder } } = await axios.post('/api/orders', order, {
			headers: {
				Authorization: ' Bearer ' + user_data.token
			}
		});

		dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
		Cookie.remove('shipping');
		Cookie.remove('diffuser_cap');
		dispatch({ type: ORDER_REMOVE_STATE, payload: {} });
	} catch (error) {
		dispatch({ type: ORDER_CREATE_FAIL, payload: error.response.data.message });
	}
};

export const payOrder = (order: any, paymentMethod: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST, payload: paymentMethod });
		const { userLogin: { userInfo: user_data } } = getState();
		const { data } = await axios.put(
			'/api/orders/' + order._id + '/pay',
			{ paymentMethod },
			{
				headers: { Authorization: 'Bearer ' + user_data.token }
			}
		);
		// const res = await axios.post('api/stripe', user_data.token);
		dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
		console.log({ order: data.order });
		// axios.post('/api/emails/paid', { ...data.order, user_data, token });
		// axios.post('/api/emails/orderpaid', { ...data.order, user_data, token });
	} catch (error) {
		console.log({ error_message: error.response.data.message });
		console.log({ error: error });
		console.log({ error_response: error.response });
		dispatch({ type: ORDER_PAY_FAIL, payload: error.response.data.message });
	}
};
export const payOrderGuest = (order: any, paymentMethod: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST, payload: paymentMethod });
		const { data } = await axios.put('/api/orders/guestcheckout/' + order._id + '/pay', { paymentMethod });
		dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
		console.log({ order: data.order });
	} catch (error) {
		console.log({ error_message: error.response.data.message });
		console.log({ error: error });
		console.log({ error_response: error.response });
		dispatch({ type: ORDER_PAY_FAIL, payload: error.response.data.message });
	}
};

export const listMyOrders = () => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: MY_ORDER_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/orders/mine', {
			headers: { Authorization: 'Bearer ' + userInfo.token }
		});
		console.log({ Orders: data });
		dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.response.data.message });
	}
};
export const listUserOrders = (user_id: string) => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: MY_ORDER_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/orders/user/' + user_id, {
			headers: { Authorization: 'Bearer ' + userInfo.token }
		});
		console.log({ Orders: data });
		dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.response.data.message });
	}
};

export const listOrders = (category = '', searchKeyword = '', sortOrder = '', lastID = '', direction = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		console.log({ direction });
		dispatch({ type: ORDER_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		// const { data } = await axios.get('/api/orders', {
		// 	headers: { Authorization: 'Bearer ' + userInfo.token }
		// });
		const { data } = await axios.get(
			'/api/orders?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase() +
				'&lastID=' +
				lastID +
				'&direction=' +
				direction,
			{
				headers: { Authorization: 'Bearer ' + userInfo.token }
			}
		);
		dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_LIST_FAIL, payload: error.response.data.message });
	}
};

export const detailsOrder = (orderId: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/orders/' + orderId, {
			headers: { Authorization: 'Bearer ' + userInfo.token }
		});
		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message });
	}
};
export const detailsOrderPublic = (orderId: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_DETAILS_PUBLIC_REQUEST, payload: orderId });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/orders/track_order/' + orderId);
		dispatch({ type: ORDER_DETAILS_PUBLIC_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_DETAILS_PUBLIC_FAIL, payload: error.response.data.message });
	}
};

export const deleteOrder = (orderId: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.delete('/api/orders/' + orderId, {
			headers: { Authorization: 'Bearer ' + userInfo.token }
		});
		dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_DELETE_FAIL, payload: error.response.data.message });
	}
};

export const refundOrder = (
	order: { _id: string },
	refundResult: boolean,
	refund_amount: number,
	refund_reason: string
) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ ...order, isRefunded: refundResult });
	try {
		dispatch({ type: ORDER_REFUND_REQUEST, payload: refundResult });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.put(
			'/api/orders/' + order._id + '/refund',
			{
				...order,
				refund_amount: refund_amount,
				isRefunded: refundResult,
				RefundedAt: refundResult ? Date.now() : '',
				refund_reason: refund_reason
			},
			{
				headers: { Authorization: 'Bearer ' + userInfo.accessToken }
			}
		);
		console.log({ data });
		dispatch({ type: ORDER_REFUND_SUCCESS, payload: data });
		axios.post('/api/emails/refund', data);
	} catch (error) {
		dispatch({ type: ORDER_REFUND_FAIL, payload: error.response.data.message });
	}
};

export const update_order = (order: { _id: string }, result: boolean, is_action: string, action_at: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ ...order, [is_action]: result });
	try {
		dispatch({ type: ORDER_UPDATE_REQUEST, payload: result });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.put(
			'/api/orders/' + order._id + '/update',
			{
				...order,
				[is_action]: result,
				[action_at]: result ? Date.now() : ''
			},
			{
				headers: { Authorization: 'Bearer ' + userInfo.accessToken }
			}
		);
		console.log({ data });
		dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_UPDATE_FAIL, payload: error.response.data.message });
	}
};
export const update_payment = (order: { _id: string }, result: boolean, payment_method: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: ORDER_UPDATE_REQUEST, payload: result });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.put(
			'/api/orders/' + order._id + '/update',
			{
				...order,
				isPaid: result,
				paidAt: result ? Date.now() : '',
				payment: {
					paymentMethod: payment_method ? payment_method : 'stripe'
				}
			},
			{
				headers: { Authorization: 'Bearer ' + userInfo.accessToken }
			}
		);
		console.log({ data });
		dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_UPDATE_FAIL, payload: error.response.data.message });
	}
};

export const saveOrder = (order: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ saveOrder: order });
	try {
		dispatch({ type: ORDER_SAVE_REQUEST, payload: order });
		const { userLogin: { userInfo } } = getState();
		if (!order._id) {
			const { data } = await axios.post('/api/orders', order, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: ORDER_SAVE_SUCCESS, payload: data });
		} else {
			console.log({ order });
			const { data } = await axios.put('/api/orders/' + order._id + '/update', order, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: ORDER_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: ORDER_SAVE_FAIL, payload: error.response.data.message });
	}
};
