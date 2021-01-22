import {
	LOG_LIST_REQUEST,
	LOG_LIST_SUCCESS,
	LOG_LIST_FAIL,
	LOG_DETAILS_REQUEST,
	LOG_DETAILS_SUCCESS,
	LOG_DETAILS_FAIL,
	LOG_SAVE_REQUEST,
	LOG_SAVE_SUCCESS,
	LOG_SAVE_FAIL,
	LOG_DELETE_SUCCESS,
	LOG_DELETE_FAIL,
	LOG_DELETE_REQUEST
} from '../constants/logConstants';
import axios from 'axios';

export const listLogs = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void
) => {
	try {
		dispatch({ type: LOG_LIST_REQUEST });
		const { data } = await axios.get(
			'/api/logs?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase()
		);
		dispatch({ type: LOG_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: LOG_LIST_FAIL, payload: error.response.data.message });
	}
};

export const saveLog = (log: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ logActions: log });
	try {
		dispatch({ type: LOG_SAVE_REQUEST, payload: log });
		const { userLogin: { userInfo } } = getState();
		if (!log._id) {
			const { data } = await axios.post('/api/logs', log, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: LOG_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/logs/' + log._id, log, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: LOG_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: LOG_SAVE_FAIL, payload: error.response.data.message });
	}
};

export const detailsLog = (pathname: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
	try {
		dispatch({ type: LOG_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/logs/' + pathname);
		dispatch({ type: LOG_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: LOG_DETAILS_FAIL, payload: error.response.data.message });
	}
};

export const deleteLog = (logId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: LOG_DELETE_REQUEST, payload: logId });
		const { data } = await axios.delete('/api/logs/' + logId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: LOG_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: LOG_DELETE_FAIL, payload: error.response.data.message });
	}
};
