import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {
	productListReducer,
	productDetailsReducer,
	productSaveReducer,
	productDeleteReducer,
	productImagesReducer,
	productReviewSaveReducer,
	productReviewDeleteReducer
} from './reducers/productReducers';
import {
	expenseListReducer,
	expenseDetailsReducer,
	expenseSaveReducer,
	expenseDeleteReducer
} from './reducers/expenseReducers';
import {
	featureListReducer,
	featureDetailsReducer,
	featureSaveReducer,
	featureDeleteReducer
} from './reducers/featureReducers';
import {
	deviceListReducer,
	deviceDetailsReducer,
	deviceSaveReducer,
	deviceDeleteReducer,
	myDeviceListReducer
} from './reducers/deviceReducers';
import {
	cartDeleteReducer,
	cartDetailsReducer,
	cartListReducer,
	cartReducer,
	cartSaveReducer
} from './reducers/cartReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userUpdateReducer,
	userContactReducer,
	userPasswordResetReducer,
	userResetPasswordReducer,
	userVerifyReducer,
	userDeleteReducer,
	userListReducer,
	userDetailsReducer,
	userUpdateUserReducer
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	myOrderListReducer,
	orderListReducer,
	orderDeleteReducer,
	orderRefundReducer,
	orderDetailsPublicReducer
} from './reducers/orderReducers';
import { promoDeleteReducer, promoDetailsReducer, promoListReducer, promoSaveReducer } from './reducers/promoReducers';
import {
	affiliateDeleteReducer,
	affiliateDetailsReducer,
	affiliateListReducer,
	affiliateSaveReducer
} from './reducers/affiliateReducers';
import {
	contentDeleteReducer,
	contentDetailsReducer,
	contentListReducer,
	contentSaveReducer
} from './reducers/contentReducers';
import { emailDeleteReducer, emailDetailsReducer, emailListReducer, emailSaveReducer } from './reducers/emailReducers';
import { logDeleteReducer, logDetailsReducer, logListReducer, logSaveReducer } from './reducers/logReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;
console.log({ userInfo });

const initialState: object = { cart: { cartItems, shipping: {}, payment: {} }, userLogin: { userInfo } };
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	cartList: cartListReducer,
	cartDetails: cartDetailsReducer,
	cartSave: cartSaveReducer,
	cartDelete: cartDeleteReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	productSave: productSaveReducer,
	productImages: productImagesReducer,
	productDelete: productDeleteReducer,
	productReviewSave: productReviewSaveReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderDetailsPublic: orderDetailsPublicReducer,
	orderPay: orderPayReducer,
	userUpdate: userUpdateReducer,
	myOrderList: myOrderListReducer,
	orderList: orderListReducer,
	orderDelete: orderDeleteReducer,
	orderRefund: orderRefundReducer,
	userContact: userContactReducer,
	userPasswordReset: userPasswordResetReducer,
	userResetPassword: userResetPasswordReducer,
	userVerify: userVerifyReducer,
	productReviewDelete: productReviewDeleteReducer,
	userDelete: userDeleteReducer,
	userList: userListReducer,
	userDetails: userDetailsReducer,
	userUpdateUser: userUpdateUserReducer,
	expenseList: expenseListReducer,
	expenseDetails: expenseDetailsReducer,
	expenseSave: expenseSaveReducer,
	expenseDelete: expenseDeleteReducer,
	featureList: featureListReducer,
	featureDetails: featureDetailsReducer,
	featureSave: featureSaveReducer,
	featureDelete: featureDeleteReducer,
	deviceList: deviceListReducer,
	deviceDetails: deviceDetailsReducer,
	deviceSave: deviceSaveReducer,
	deviceDelete: deviceDeleteReducer,
	myDeviceList: myDeviceListReducer,
	promoList: promoListReducer,
	promoDetails: promoDetailsReducer,
	promoSave: promoSaveReducer,
	promoDelete: promoDeleteReducer,
	affiliateList: affiliateListReducer,
	affiliateDetails: affiliateDetailsReducer,
	affiliateSave: affiliateSaveReducer,
	affiliateDelete: affiliateDeleteReducer,
	contentList: contentListReducer,
	contentDetails: contentDetailsReducer,
	contentSave: contentSaveReducer,
	contentDelete: contentDeleteReducer,
	emailList: emailListReducer,
	emailDetails: emailDetailsReducer,
	emailSave: emailSaveReducer,
	emailDelete: emailDeleteReducer,
	logList: logListReducer,
	logDetails: logDetailsReducer,
	logSave: logSaveReducer,
	logDelete: logDeleteReducer
});

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
