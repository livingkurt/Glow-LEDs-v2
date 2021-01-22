import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { updateUser } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { validate_profile } from '../../utils/validations';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

const EditUserPage = (props) => {
	const userDetails = useSelector((state) => state.userDetails);
	const { loading: loadingUser, user, error: errorUser } = userDetails;

	const history = useHistory();
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ email, set_email ] = useState('');
	const [ is_affiliated, set_is_affiliated ] = useState('');
	const [ affiliate, set_affiliate ] = useState('');
	const [ verified, set_verified ] = useState('');
	const [ admin, set_admin ] = useState('');

	const [ first_name_validations, setFirstnameValidations ] = useState('');
	const [ last_name_validations, setLastNameValidations ] = useState('');
	const [ email_validations, set_email_validations ] = useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const submitHandler = (e) => {
		e.preventDefault();
		const data = { first_name, last_name, email, verified, admin };
		const request = validate_profile(data);

		setFirstnameValidations(request.errors.first_name);
		setLastNameValidations(request.errors.last_name);
		set_email_validations(request.errors.email);

		console.log(request);
		if (request.isValid) {
			dispatch(
				updateUser({
					userId: user._id,
					email,
					first_name,
					last_name,
					is_affiliated,
					affiliate,
					verified,
					admin
				})
			);
			history.push('/secure/glow/userprofile/' + user._id);
		}
	};

	const userUpdateUser = useSelector((state) => state.userUpdateUser);
	const { loading, userInfo: userUpdate, error } = userUpdateUser;

	console.log({ userUpdateUser });
	useEffect(
		() => {
			if (user) {
				console.log({ user });
				set_email(user.email);
				set_first_name(user.first_name);
				set_last_name(user.last_name);
				set_is_affiliated(user.isAffiliated);
				set_affiliate(user.affiliate);
				set_verified(user.isVerified);
				set_admin(user.isAdmin);
				// setPassword(user.password);
			}
			return () => {};
		},
		[ user ]
	);

	useEffect(
		() => {
			console.log({ userUpdate });
			if (userUpdate) {
				console.log({ userUpdate: userUpdate });
				set_email(userUpdate.email);
				set_first_name(userUpdate.first_name);
				set_last_name(userUpdate.last_name);
				set_is_affiliated(userUpdate.isAffiliated);
				set_affiliate(userUpdate.affiliate);
				set_verified(userUpdate.isVerified);
				set_admin(userUpdate.isAdmin);
				// setPassword(userUpdate.password);
			}

			return () => {};
		},
		[ userUpdate ]
	);

	return (
		<div className="profile_container column p-20px">
			<Helmet>
				<title>Edit {first_name}'s Profile | Glow LEDs</title>
			</Helmet>
			<div className="m-10px">
				<Link to={'/secure/glow/userprofile/' + user._id}>
					<button className="btn primary">Back to {user.first_name}'s Profile</button>
				</Link>
			</div>
			<div className="profile-info">
				<div className="form">
					<form onSubmit={submitHandler} style={{ width: '100%' }}>
						<ul className="form-container">
							<li>
								<h1 style={{ textAlign: 'center' }}>{user.first_name}'s Profile</h1>
							</li>
							<li>
								<div className="jc-c">
									<Loading loading={loading} error={error}>
										{/* {success && <h3 style={{ textAlign: 'center' }}>Profile Saved Successfully</h3>} */}
									</Loading>
								</div>
							</li>
							<Loading loading={loading} error={error}>
								<li>
									<label htmlFor="first_name">First Name</label>
									<input
										defaultValue={first_name}
										type="first_name"
										name="first_name"
										id="first_name"
										onChange={(e) => set_first_name(e.target.value)}
									/>
								</li>
								<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
									{first_name_validations}
								</label>
								<li>
									<label htmlFor="last_name">Last Name</label>
									<input
										defaultValue={last_name}
										type="last_name"
										name="last_name"
										id="last_name"
										onChange={(e) => set_last_name(e.target.value)}
									/>
								</li>
								<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
									{last_name_validations}
								</label>
								<li>
									<label htmlFor="email">Email</label>
									<input
										defaultValue={email}
										type="text"
										name="email"
										id="email"
										onChange={(e) => set_email(e.target.value)}
									/>
								</li>
								<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
									{email_validations}
								</label>
								{console.log({ verified })}

								<li>
									<label htmlFor="is_affiliated"> Affiliated</label>
									<input
										type="checkbox"
										name="is_affiliated"
										// defaultChecked={is_affiliated === true ? 'checked' : 'unchecked'}
										defaultChecked={is_affiliated}
										// checked={is_affiliated}
										id="is_affiliated"
										onChange={(e) => {
											set_is_affiliated(e.target.checked);
										}}
									/>
								</li>
								<li>
									<label htmlFor="affiliate">Affiliate</label>
									<input
										defaultValue={affiliate}
										type="text"
										name="affiliate"
										id="affiliate"
										onChange={(e) => set_affiliate(e.target.value)}
									/>
								</li>
								<li>
									<label htmlFor="verified"> Verified</label>
									<input
										type="checkbox"
										name="verified"
										// defaultChecked={verified === true ? 'checked' : 'unchecked'}
										defaultChecked={verified}
										// checked={verified}
										id="verified"
										onChange={(e) => {
											set_verified(e.target.checked);
										}}
									/>
								</li>
								{console.log({ admin })}
								<li>
									<label htmlFor="admin"> Admin</label>
									<input
										type="checkbox"
										name="admin"
										// defaultChecked={admin === true ? 'checked' : 'unchecked'}
										defaultChecked={admin}
										// checked={admin}
										id="admin"
										onChange={(e) => {
											set_admin(e.target.checked);
										}}
									/>
								</li>
							</Loading>
							<li>
								<button type="submit" className="btn primary">
									Update
								</button>
							</li>
							<li>
								<Link to={'/secure/glow/userprofile/' + user._id}>
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

export default EditUserPage;
