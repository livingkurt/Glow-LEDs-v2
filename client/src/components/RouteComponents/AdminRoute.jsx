import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookie from 'js-cookie';
// import { isLogin } from '../utils';

const AdminRoute = ({ component: Component, ...rest }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				userInfo.isAdmin ? <Component {...props} /> : <Redirect to="/collections/all/products" />}
		/>
	);
};

export default AdminRoute;
