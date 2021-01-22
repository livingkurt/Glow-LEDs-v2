import {
	CONTENT_LIST_REQUEST,
	CONTENT_LIST_SUCCESS,
	CONTENT_LIST_FAIL,
	CONTENT_DETAILS_REQUEST,
	CONTENT_DETAILS_SUCCESS,
	CONTENT_DETAILS_FAIL,
	CONTENT_SAVE_REQUEST,
	CONTENT_SAVE_SUCCESS,
	CONTENT_SAVE_FAIL,
	CONTENT_DELETE_REQUEST,
	CONTENT_DELETE_SUCCESS,
	CONTENT_DELETE_FAIL
} from '../constants/contentConstants';

export const contentListReducer = (state = { contents: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CONTENT_LIST_REQUEST:
			return { loading: true, contents: [] };
		case CONTENT_LIST_SUCCESS:
			return { loading: false, contents: action.payload };
		case CONTENT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const contentDetailsReducer = (state = { content: { reviews: [] } }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CONTENT_DETAILS_REQUEST:
			return { loading: true };
		case CONTENT_DETAILS_SUCCESS:
			return { loading: false, content: action.payload };
		case CONTENT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const contentDeleteReducer = (state = { content: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CONTENT_DELETE_REQUEST:
			return { loading: true };
		case CONTENT_DELETE_SUCCESS:
			return { loading: false, content: action.payload, success: true };
		case CONTENT_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const contentSaveReducer = (state = { content: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CONTENT_SAVE_REQUEST:
			return { loading: true };
		case CONTENT_SAVE_SUCCESS:
			return { loading: false, success: true, content: action.payload };
		case CONTENT_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
