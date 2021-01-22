import {
	EXPENSE_LIST_REQUEST,
	EXPENSE_LIST_SUCCESS,
	EXPENSE_LIST_FAIL,
	EXPENSE_DETAILS_REQUEST,
	EXPENSE_DETAILS_SUCCESS,
	EXPENSE_DETAILS_FAIL,
	EXPENSE_SAVE_REQUEST,
	EXPENSE_SAVE_SUCCESS,
	EXPENSE_SAVE_FAIL,
	EXPENSE_DELETE_REQUEST,
	EXPENSE_DELETE_SUCCESS,
	EXPENSE_DELETE_FAIL
} from '../constants/expenseConstants';

export const expenseListReducer = (state = { expenses: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case EXPENSE_LIST_REQUEST:
			return { loading: true, expenses: [] };
		case EXPENSE_LIST_SUCCESS:
			return { loading: false, expenses: action.payload };
		case EXPENSE_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const expenseDetailsReducer = (state = { expense: { reviews: [] } }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case EXPENSE_DETAILS_REQUEST:
			return { loading: true };
		case EXPENSE_DETAILS_SUCCESS:
			return { loading: false, expense: action.payload };
		case EXPENSE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const expenseDeleteReducer = (state = { expense: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case EXPENSE_DELETE_REQUEST:
			return { loading: true };
		case EXPENSE_DELETE_SUCCESS:
			return { loading: false, expense: action.payload, success: true };
		case EXPENSE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const expenseSaveReducer = (state = { expense: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case EXPENSE_SAVE_REQUEST:
			return { loading: true };
		case EXPENSE_SAVE_SUCCESS:
			return { loading: false, success: true, expense: action.payload };
		case EXPENSE_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
