import {
	PROMO_LIST_REQUEST,
	PROMO_LIST_SUCCESS,
	PROMO_LIST_FAIL,
	PROMO_DETAILS_REQUEST,
	PROMO_DETAILS_SUCCESS,
	PROMO_DETAILS_FAIL,
	PROMO_SAVE_REQUEST,
	PROMO_SAVE_SUCCESS,
	PROMO_SAVE_FAIL,
	PROMO_DELETE_REQUEST,
	PROMO_DELETE_SUCCESS,
	PROMO_DELETE_FAIL
} from '../constants/promoConstants';

export const promoListReducer = (state = { promos: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PROMO_LIST_REQUEST:
			return { loading: true, promos: [] };
		case PROMO_LIST_SUCCESS:
			return { loading: false, promos: action.payload };
		case PROMO_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const promoDetailsReducer = (state = { promo: { reviews: [] } }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PROMO_DETAILS_REQUEST:
			return { loading: true };
		case PROMO_DETAILS_SUCCESS:
			return { loading: false, promo: action.payload };
		case PROMO_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const promoDeleteReducer = (state = { promo: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PROMO_DELETE_REQUEST:
			return { loading: true };
		case PROMO_DELETE_SUCCESS:
			return { loading: false, promo: action.payload, success: true };
		case PROMO_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const promoSaveReducer = (state = { promo: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PROMO_SAVE_REQUEST:
			return { loading: true };
		case PROMO_SAVE_SUCCESS:
			return { loading: false, success: true, promo: action.payload };
		case PROMO_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
