import {
	AFFILIATE_LIST_REQUEST,
	AFFILIATE_LIST_SUCCESS,
	AFFILIATE_LIST_FAIL,
	AFFILIATE_DETAILS_REQUEST,
	AFFILIATE_DETAILS_SUCCESS,
	AFFILIATE_DETAILS_FAIL,
	AFFILIATE_SAVE_REQUEST,
	AFFILIATE_SAVE_SUCCESS,
	AFFILIATE_SAVE_FAIL,
	AFFILIATE_DELETE_SUCCESS,
	AFFILIATE_DELETE_FAIL,
	AFFILIATE_DELETE_REQUEST
} from '../constants/affiliateConstants';
import axios from 'axios';

export const listAffiliates = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void
) => {
	try {
		dispatch({ type: AFFILIATE_LIST_REQUEST });
		const { data } = await axios.get(
			'/api/affiliates?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase()
		);
		dispatch({ type: AFFILIATE_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: AFFILIATE_LIST_FAIL, payload: error.response.data.message });
	}
};

export const saveAffiliate = (affiliate: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ affiliateActions: affiliate });
	try {
		dispatch({ type: AFFILIATE_SAVE_REQUEST, payload: affiliate });
		const { userLogin: { userInfo } } = getState();
		if (!affiliate._id) {
			const { data } = await axios.post('/api/affiliates', affiliate, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: AFFILIATE_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/affiliates/' + affiliate._id, affiliate, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: AFFILIATE_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: AFFILIATE_SAVE_FAIL, payload: error.response.data.message });
	}
};

export const detailsAffiliate = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	try {
		dispatch({ type: AFFILIATE_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/affiliates/' + pathname);
		dispatch({ type: AFFILIATE_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: AFFILIATE_DETAILS_FAIL, payload: error.response.data.message });
	}
};

export const deleteAffiliate = (affiliateId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: AFFILIATE_DELETE_REQUEST, payload: affiliateId });
		const { data } = await axios.delete('/api/affiliates/' + affiliateId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: AFFILIATE_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: AFFILIATE_DELETE_FAIL, payload: error.response.data.message });
	}
};
