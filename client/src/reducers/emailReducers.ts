import {
	EMAIL_LIST_REQUEST,
	EMAIL_LIST_SUCCESS,
	EMAIL_LIST_FAIL,
	EMAIL_DETAILS_REQUEST,
	EMAIL_DETAILS_SUCCESS,
	EMAIL_DETAILS_FAIL,
	EMAIL_SAVE_REQUEST,
	EMAIL_SAVE_SUCCESS,
	EMAIL_SAVE_FAIL,
	EMAIL_DELETE_REQUEST,
	EMAIL_DELETE_SUCCESS,
	EMAIL_DELETE_FAIL
} from '../constants/emailConstants';

export const emailListReducer = (state = { emails: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case EMAIL_LIST_REQUEST:
			return { loading: true, emails: [] };
		case EMAIL_LIST_SUCCESS:
			return { loading: false, emails: action.payload };
		case EMAIL_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const emailDetailsReducer = (state = { email: { reviews: [] } }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case EMAIL_DETAILS_REQUEST:
			return { loading: true };
		case EMAIL_DETAILS_SUCCESS:
			return { loading: false, email: action.payload };
		case EMAIL_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const emailDeleteReducer = (state = { email: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case EMAIL_DELETE_REQUEST:
			return { loading: true };
		case EMAIL_DELETE_SUCCESS:
			return { loading: false, email: action.payload, success: true };
		case EMAIL_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const emailSaveReducer = (state = { email: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case EMAIL_SAVE_REQUEST:
			return { loading: true };
		case EMAIL_SAVE_SUCCESS:
			return { loading: false, success: true, email: action.payload };
		case EMAIL_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
