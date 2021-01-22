import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGOUT,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_CONTACT_REQUEST,
	USER_CONTACT_SUCCESS,
	USER_CONTACT_REMOVE_SUCCESS,
	USER_CONTACT_FAIL,
	USER_PASSWORD_RESET_REQUEST,
	USER_PASSWORD_RESET_SUCCESS,
	USER_PASSWORD_RESET_FAIL,
	USER_RESET_PASSWORD_REQUEST,
	USER_RESET_PASSWORD_SUCCESS,
	USER_RESET_PASSWORD_FAIL,
	USER_VERIFY_REQUEST,
	USER_VERIFY_SUCCESS,
	USER_VERIFY_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_UPDATE_USER_REQUEST,
	USER_UPDATE_USER_SUCCESS,
	USER_UPDATE_USER_FAIL,
	USER_SAVE_REQUEST,
	USER_SAVE_SUCCESS,
	USER_SAVE_FAIL
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			console.log({ payload: action.payload });
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userPasswordResetReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case USER_PASSWORD_RESET_REQUEST:
			return { loading: true };
		case USER_PASSWORD_RESET_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_PASSWORD_RESET_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userResetPasswordReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case USER_RESET_PASSWORD_REQUEST:
			return { loading: true };
		case USER_RESET_PASSWORD_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_RESET_PASSWORD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userVerifyReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case USER_VERIFY_REQUEST:
			return { loading: true };
		case USER_VERIFY_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_VERIFY_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userUpdateReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true };
		case USER_UPDATE_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userSaveReducer = (state = { user: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case USER_SAVE_REQUEST:
			return { loading: true };
		case USER_SAVE_SUCCESS:
			return { loading: false, success: true, user: action.payload };
		case USER_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userUpdateUserReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case USER_UPDATE_USER_REQUEST:
			return { loading: true };
		case USER_UPDATE_USER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_UPDATE_USER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userContactReducer = (state = {}, action: { type: any; payload: any }) => {
	switch (action.type) {
		case USER_CONTACT_REQUEST:
			return { loading: true };
		case USER_CONTACT_SUCCESS:
			return { loading: false, completed: action.payload };
		case USER_CONTACT_FAIL:
			return { loading: false, error: action.payload };
		case USER_CONTACT_REMOVE_SUCCESS:
			return { loading: false, completed: false };
		default:
			return state;
	}
};

export const userListReducer = (
	state = {
		users: []
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true };
		case USER_LIST_SUCCESS:
			return { loading: false, users: action.payload };
		case USER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userDeleteReducer = (
	state = {
		user: {}
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return { loading: true };
		case USER_DELETE_SUCCESS:
			return { loading: false, success: true };
		case USER_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userDetailsReducer = (
	state = {
		user: {}
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { loading: true };
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
