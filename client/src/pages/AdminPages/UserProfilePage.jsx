import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../../actions/userActions';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { API_Emails } from '../../utils';

const UserProfilePage = (props) => {
	const history = useHistory();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, user, error } = userDetails;

	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ verified, set_verified ] = useState();
	const [ admin, set_admin ] = useState();

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	const userUpdateUser = useSelector((state) => state.userUpdateUser);
	const { userInfo: userUpdate } = userUpdateUser;

	useEffect(
		() => {
			stableDispatch(detailsUser(props.match.params.id));
			return () => {};
		},
		[ stableDispatch ]
	);

	useEffect(
		() => {
			if (user) {
				setEmail(user.email);
				set_first_name(user.first_name);
				set_last_name(user.last_name);
				set_verified(user.isVerified);
				set_admin(user.isAdmin);
			}
			return () => {};
		},
		[ user ]
	);

	useEffect(
		() => {
			if (userUpdate) {
				setEmail(userUpdate.email);
				set_first_name(userUpdate.first_name);
				set_last_name(userUpdate.last_name);
				set_verified(userUpdate.isVerified);
				set_admin(userUpdate.isAdmin);
				// setPassword(userUpdate.password);
			}
			return () => {};
		},
		[ userUpdate ]
	);

	const container_styles = {
		marginBottom: '20px'
	};

	const send_not_verified_email = async () => {
		const request = await API_Emails.not_verified_email(user);

		console.log(request);
	};
	return (
		<div className="column p-20px inner_content">
			<Helmet>
				<title>Admin User Profile | Glow LEDs</title>
			</Helmet>
			<button className="btn secondary" onClick={() => history.goBack()}>
				Back to Users
			</button>
			<div className="row">
				<h1 style={{ textAlign: 'center', width: '100%' }}>{first_name}'s Profile</h1>
			</div>
			<Loading loading={loading} error={error}>
				{user && (
					<div className="profile_container row jc-b wrap">
						<div className="column">
							<div className="column" style={container_styles}>
								<h3>First Name</h3>
								<label>{first_name}</label>
							</div>
							<div className="column" style={container_styles}>
								<h3>Last Name</h3>
								<label>{last_name}</label>
							</div>
							<div className="column" style={container_styles}>
								<h3>Email</h3>
								<label>{email}</label>
							</div>
							<div className="column" style={container_styles}>
								<h3>Password</h3>
								<label>**********</label>
							</div>
							<div className="column" style={container_styles}>
								<h3>Verified</h3>
								<label>{verified === true ? 'Verified' : 'Not Verified'}</label>
							</div>
							<div className="column" style={container_styles}>
								<h3>Admin</h3>
								<label>{admin === true ? 'Admin' : 'Not Admin'}</label>
							</div>
						</div>
						<div className="row">
							<div style={{ height: 50 }}>
								<Link to={'/secure/glow/edituser/' + props.match.params.id}>
									<button style={{ marginRight: '10px', maxWidth: '225px' }} className="btn primary">
										Edit Profile
									</button>
								</Link>
							</div>
							<div style={{ height: 50 }}>
								<Link to={'/account/changepassword'}>
									<button style={{ marginRight: '10px', maxWidth: '210px' }} className="btn primary">
										Change Password
									</button>
								</Link>
							</div>
							<div style={{ height: 50 }}>
								<Link to={'/secure/glow/userorders/' + props.match.params.id}>
									<button style={{ maxWidth: '225px', marginRight: '10px' }} className="btn primary">
										View Orders
									</button>
								</Link>
							</div>
							<div style={{ height: 50 }}>
								{/* <Link to={'/secure/account/orders'}> */}
								<button
									style={{ maxWidth: '225px' }}
									onClick={send_not_verified_email}
									className="btn primary"
								>
									Still Not Verified
								</button>
								{/* </Link> */}
							</div>
						</div>
					</div>
				)}
			</Loading>
		</div>
	);
};

export default UserProfilePage;
