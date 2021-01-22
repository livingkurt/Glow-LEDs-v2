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
	AFFILIATE_DELETE_REQUEST,
	AFFILIATE_DELETE_SUCCESS,
	AFFILIATE_DELETE_FAIL
} from '../constants/affiliateConstants';

export const affiliateListReducer = (state = { affiliates: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case AFFILIATE_LIST_REQUEST:
			return { loading: true, affiliates: [] };
		case AFFILIATE_LIST_SUCCESS:
			return { loading: false, affiliates: action.payload };
		case AFFILIATE_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const affiliateDetailsReducer = (
	state = { affiliate: { reviews: [] } },
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case AFFILIATE_DETAILS_REQUEST:
			return { loading: true };
		case AFFILIATE_DETAILS_SUCCESS:
			return { loading: false, affiliate: action.payload };
		case AFFILIATE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const affiliateDeleteReducer = (state = { affiliate: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case AFFILIATE_DELETE_REQUEST:
			return { loading: true };
		case AFFILIATE_DELETE_SUCCESS:
			return { loading: false, affiliate: action.payload, success: true };
		case AFFILIATE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const affiliateSaveReducer = (state = { affiliate: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case AFFILIATE_SAVE_REQUEST:
			return { loading: true };
		case AFFILIATE_SAVE_SUCCESS:
			return { loading: false, success: true, affiliate: action.payload };
		case AFFILIATE_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
