import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update, reset_password } from '../../actions/userActions';
import { Helmet } from 'react-helmet';

const GuestCheckoutPage = (props) => {
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');
	// const userRegister = useSelector((state) => state.userRegister);
	// const { loading, userInfo, error } = userRegister;
	const dispatch = useDispatch();

	// const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(reset_password(props.match.params.id, password, rePassword));
		// dispatch(email_registration(name, email, password));
		props.history.push('/account/login');
	};
	return (
		<div className="form">
			<Helmet>
				<title>Guest Decision | Glow LEDs</title>
				<meta property="og:title" content="Guest Decision" />
				<meta name="twitter:title" content="Guest Decision" />
				<link rel="canonical" href="https://www.glow-leds.com/account/decision" />
				<meta property="og:url" content="https://www.glow-leds.com/account/decision" />
			</Helmet>
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						<h2>Continue as User</h2>
						<p>Track Orders with Ease!</p>
						<Link to="/account/login?redirect=/secure/checkout/placeorder">
							<button className="btn primary w-100per">Login</button>
						</Link>
					</li>
					<li>
						<h2>Continue as Guest</h2>
						<Link to="/checkout/placeorder">
							<button className="btn primary w-100per">Guest Checkout</button>
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
};
export default GuestCheckoutPage;
