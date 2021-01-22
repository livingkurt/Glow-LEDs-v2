import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { password_reset } from '../../actions/userActions';
import { Helmet } from 'react-helmet';

const ResetPasswordPage = (props) => {
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');
	// const userRegister = useSelector((state) => state.userRegister);
	// const { loading, userInfo, error } = userRegister;
	const dispatch = useDispatch();

	// const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(password_reset(props.match.params.id, password, rePassword));
		// dispatch(email_registration(name, email, password));
		props.history.push('/account/login');
	};
	return (
		<div className="form">
			<Helmet>
				<title>Reset Password | Glow LEDs</title>
				<meta property="og:title" content="Reset Password" />
				<meta name="twitter:title" content="Reset Password" />
				<link rel="canonical" href="https://www.glow-leds.com/account/resetpassword" />
				<meta property="og:url" content="https://www.glow-leds.com/account/resetpassword" />
			</Helmet>
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						<div className="row">
							<h1 styles={{ width: '100%' }}>Reset Password</h1>{' '}
						</div>
					</li>
					<li />
					<li>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="rePassword">Re-Enter Password</label>
						<input
							type="password"
							id="rePassword"
							name="rePassword"
							onChange={(e) => setRePassword(e.target.value)}
						/>
					</li>
					<li>
						<button type="submit" className="btn primary">
							Reset Password
						</button>
					</li>
				</ul>
			</form>
		</div>
	);
};
export default ResetPasswordPage;
