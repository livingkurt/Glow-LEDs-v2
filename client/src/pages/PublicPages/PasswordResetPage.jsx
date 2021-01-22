import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset_password } from '../../actions/userActions';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

const PasswordResetPublicPage = (props) => {
	const [ email, setEmail ] = useState('');
	const userPasswordReset = useSelector((state) => state.userPasswordReset);
	const { loading, userInfo, error } = userPasswordReset;
	const dispatch = useDispatch();

	const [ words, setWords ] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(reset_password(email));
		setWords('Check your Email to Change your Password');
		// props.history.push(redirect);
	};
	return (
		<div className="form">
			<Helmet>
				<title>Password Reset | Glow LEDs</title>
				<meta property="og:title" content="Password Reset" />
				<meta name="twitter:title" content="Password Reset" />
				<link rel="canonical" href="https://www.glow-leds.com/account/passwordreset" />
				<meta property="og:url" content="https://www.glow-leds.com/account/passwordreset" />
			</Helmet>
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						{/* <h2>Login</h2> */}
						<h1>Password Reset</h1>
					</li>
					<li>
						<Loading loading={loading} error={error}>
							{words && <h3 styles={{ textAlign: 'center' }}>{words}</h3>}
						</Loading>
					</li>
					<li>
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
					</li>

					<li>
						<button type="submit" className="btn primary">
							Verify Email
						</button>
					</li>
				</ul>
			</form>
		</div>
	);
};
export default PasswordResetPublicPage;
