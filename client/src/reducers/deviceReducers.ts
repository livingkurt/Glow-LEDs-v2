import {
	DEVICE_LIST_REQUEST,
	DEVICE_LIST_SUCCESS,
	DEVICE_LIST_FAIL,
	DEVICE_DETAILS_REQUEST,
	DEVICE_DETAILS_SUCCESS,
	DEVICE_DETAILS_FAIL,
	DEVICE_SAVE_REQUEST,
	DEVICE_SAVE_SUCCESS,
	DEVICE_SAVE_FAIL,
	DEVICE_DELETE_REQUEST,
	DEVICE_DELETE_SUCCESS,
	DEVICE_DELETE_FAIL,
	MY_DEVICE_LIST_REQUEST,
	MY_DEVICE_LIST_SUCCESS,
	MY_DEVICE_LIST_FAIL
} from '../constants/deviceConstants';

export const deviceListReducer = (state = { devices: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case DEVICE_LIST_REQUEST:
			return { loading: true, devices: [] };
		case DEVICE_LIST_SUCCESS:
			return { loading: false, devices: action.payload };
		case DEVICE_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const myDeviceListReducer = (
	state = {
		devices: []
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case MY_DEVICE_LIST_REQUEST:
			return { loading: true };
		case MY_DEVICE_LIST_SUCCESS:
			return { loading: false, devices: action.payload };
		case MY_DEVICE_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const deviceDetailsReducer = (state = { device: { reviews: [] } }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case DEVICE_DETAILS_REQUEST:
			return { loading: true };
		case DEVICE_DETAILS_SUCCESS:
			return { loading: false, device: action.payload };
		case DEVICE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const deviceDeleteReducer = (state = { device: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case DEVICE_DELETE_REQUEST:
			return { loading: true };
		case DEVICE_DELETE_SUCCESS:
			return { loading: false, device: action.payload, success: true };
		case DEVICE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const deviceSaveReducer = (state = { device: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case DEVICE_SAVE_REQUEST:
			return { loading: true };
		case DEVICE_SAVE_SUCCESS:
			return { loading: false, success: true, device: action.payload };
		case DEVICE_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
