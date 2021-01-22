import {
	FEATURE_LIST_REQUEST,
	FEATURE_LIST_SUCCESS,
	FEATURE_LIST_FAIL,
	FEATURE_DETAILS_REQUEST,
	FEATURE_DETAILS_SUCCESS,
	FEATURE_DETAILS_FAIL,
	FEATURE_SAVE_REQUEST,
	FEATURE_SAVE_SUCCESS,
	FEATURE_SAVE_FAIL,
	FEATURE_DELETE_SUCCESS,
	FEATURE_DELETE_FAIL,
	FEATURE_DELETE_REQUEST
} from '../constants/featureConstants';
import axios from 'axios';

export const listFeatures = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void
) => {
	try {
		dispatch({ type: FEATURE_LIST_REQUEST });
		const { data } = await axios.get(
			'/api/features?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase()
		);
		dispatch({ type: FEATURE_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FEATURE_LIST_FAIL, payload: error.response.data.message });
	}
};

export const saveFeature = (feature: {
	_id: string;
	feature_name?: string;
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
	console.log({ featureActions: feature });
	try {
		dispatch({ type: FEATURE_SAVE_REQUEST, payload: feature });
		const { userLogin: { userInfo } } = getState();
		if (!feature._id) {
			const { data } = await axios.post('/api/features', feature, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: FEATURE_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/features/' + feature._id, feature, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: FEATURE_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: FEATURE_SAVE_FAIL, payload: error.response.data.message });
	}
};

export const detailsFeature = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	try {
		console.log({ pathname });
		dispatch({ type: FEATURE_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/features/' + pathname);
		dispatch({ type: FEATURE_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FEATURE_DETAILS_FAIL, payload: error.response.data.message });
	}
};

export const deleteFeature = (featureId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: FEATURE_DELETE_REQUEST, payload: featureId });
		const { data } = await axios.delete('/api/features/' + featureId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: FEATURE_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: FEATURE_DELETE_FAIL, payload: error.response.data.message });
	}
};
