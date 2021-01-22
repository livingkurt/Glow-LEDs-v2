import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { isLogin } from '../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// console.log({ userInfo });

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route {...rest} render={(props) => (userInfo ? <Component {...props} /> : <Redirect to="/account/login" />)} />
	);
};

export default PrivateRoute;
