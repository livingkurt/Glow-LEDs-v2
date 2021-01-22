import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import { validate_login } from '../../utils/validations';
import { Helmet } from 'react-helmet';
import { Loading } from '../../components/UtilityComponents';

const LoginPage = (props) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const [ email_validations, setEmailValidations ] = useState('');
	const [ password_validations, setPasswordValidations ] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo, error } = userLogin;
	console.log({ userLogin });
	const dispatch = useDispatch();
	const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

	useEffect(
		() => {
			if (userInfo) {
				props.history.push(redirect);
			}
			return () => {
				//
			};
		},
		[ userInfo, props.history, redirect ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		const data = { email, password };
		const request = validate_login(data);

		setEmailValidations(request.errors.email);
		setPasswordValidations(request.errors.password);

		if (request.isValid) {
			dispatch(login(email, password));
		}
	};

	return (
		<div className="form">
			<Helmet>
				<title>Login | Glow LEDs</title>
				<meta property="og:title" content="Login" />
				<meta name="twitter:title" content="Login" />
				<link rel="canonical" href="https://www.glow-leds.com/account/login" />
				<meta property="og:url" content="https://www.glow-leds.com/account/login" />
				<meta
					name="description"
					content="Come in the LEDs are fine. Come into our Glowing realm of wonderfulness. Where you just might find what you have been missing."
				/>
				<meta
					property="og:description"
					content="Come in the LEDs are fine. Come into our Glowing realm of wonderfulness. Where you just might find what you have been missing."
				/>
				<meta
					name="twitter:description"
					content="Come in the LEDs are fine. Come into our Glowing realm of wonderfulness. Where you just might find what you have been missing."
				/>
			</Helmet>

			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li style={{ display: 'flex', flexDirection: 'column' }}>
						<h1>Login </h1>
					</li>
					<Loading loading={loading} error={error} />
					<li>
						<label htmlFor="email">Email</label>
						<input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
					</li>
					<label className="validation_text" style={{ textAlign: 'center' }}>
						{email_validations}
					</label>
					<li>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</li>
					<label className="validation_text" style={{ textAlign: 'center' }}>
						{password_validations}
					</label>

					<li>
						<button type="submit" className="btn primary">
							Login
						</button>
					</li>
					<li>
						<Link to="/account/passwordreset" style={{ fontFamily: 'heading_font' }}>
							<button className="btn secondary w-100per">Forgot Password?</button>
						</Link>
					</li>
					<li>New to Glow LEDs?</li>
					<li>
						<Link
							to={redirect === '/' ? 'register' : 'register?redirect=' + redirect}
							className="btn primary text-center"
						>
							Create Account
						</Link>
					</li>
					{/* <li style={{ marginBottom: '-20px' }}>
							<Link
								to={redirect === '/' ? 'register' : 'register?redirect=' + redirect}
								className="btn secondary text-center"
							>
								New User
							</Link>
						</li> */}
				</ul>
			</form>
		</div>
	);
};
export default LoginPage;
