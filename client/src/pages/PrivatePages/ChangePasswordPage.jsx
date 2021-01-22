import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { password_reset } from '../../actions/userActions';
import { listMyOrders } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { validate_password_change } from '../../utils/validations';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

const ChangePasswordPage = (props) => {
	const history = useHistory();
	const [ current_password, setCurrentPassword ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');

	const dispatch = useDispatch();

	const [ current_password_validations, setCurrentPasswordValidations ] = useState('');
	const [ password_validations, setPasswordValidations ] = useState('');
	const [ re_password_validations, setRePasswordValidations ] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const submitHandler = async (e) => {
		e.preventDefault();
		const validation_data = { id: userInfo._id, current_password, password, rePassword };
		const request = await validate_password_change(validation_data);
		console.log({ request });
		setCurrentPasswordValidations(request.errors.current_password);
		setPasswordValidations(request.errors.password);
		setRePasswordValidations(request.errors.rePassword);

		if (request.isValid) {
			dispatch(password_reset(userInfo._id, password, rePassword));
			history.push('/secure/account/profile');
		}
	};

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, success, error } = userUpdate;

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (userInfo) {
				setPassword(userInfo.password);
			}
			stableDispatch(listMyOrders());
			return () => {};
		},
		[ userInfo, stableDispatch ]
	);

	useEffect(
		() => {
			if (userUpdate.userInfo) {
				setPassword(userUpdate.userInfo.password);
			}

			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	return (
		<div className="profile_container column p-20px">
			<Helmet>
				<title>Change Password | Glow LEDs</title>
				<meta property="og:title" content="Change Password" />
				<meta name="twitter:title" content="Change Password" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/account/changepassword" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/account/changepassword" />
			</Helmet>
			<div className="mb-10px">
				<button className="btn secondary" onClick={() => history.goBack()}>
					Back to Profile
				</button>
			</div>
			<div className="profile-info">
				<div className="form">
					<form onSubmit={submitHandler} style={{ width: '100%' }}>
						<ul className="form-container">
							<li>
								<h1 style={{ textAlign: 'center' }}>Change Password</h1>
							</li>
							<li>
								<Loading loading={loading} error={error}>
									<div className="jc-c">{success && <h3>Profile Saved Successfully</h3>}</div>
								</Loading>
							</li>
							<li>
								<label htmlFor="current_password">Current Password</label>
								<input
									className="form_input"
									defaultValue={current_password}
									type="password"
									id="current_password"
									name="current_password"
									onChange={(e) => setCurrentPassword(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{current_password_validations}
							</label>
							<li>
								<label htmlFor="password">Password</label>
								<input
									className="form_input"
									type="password"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{password_validations}
							</label>
							<li>
								<label htmlFor="rePassword">Re-Enter Password</label>
								<input
									className="form_input"
									type="password"
									id="rePassword"
									name="rePassword"
									onChange={(e) => setRePassword(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{re_password_validations}
							</label>
							<li>
								<button type="submit" className="btn primary">
									Update
								</button>
							</li>
							<li>
								<Link to="/secure/account/profile">
									<button type="button" className="btn secondary w-100per">
										Cancel
									</button>
								</Link>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChangePasswordPage;
