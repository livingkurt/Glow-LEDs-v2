import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, update } from '../../actions/userActions';
import { listMyOrders } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

const ProfilePage = (props) => {
	const history = useHistory();
	const [ name, setName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const handleLogout = () => {
		dispatch(logout());
		props.history.push('/account/login');
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(update({ userId: userInfo._id, email, name, password }));
		history.push('/secure/account/profile');
	};
	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, success, error } = userUpdate;

	const myOrderList = useSelector((state) => state.myOrderList);
	const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

	useEffect(
		() => {
			if (userInfo) {
				console.log(userInfo.name);
				setEmail(userInfo.email);
				setName(userInfo.name);
				console.log(name);
				setPassword(userInfo.password);
			}
			// else {
			//   setEmail(email);
			//   setName(name);
			//   setPassword(password);
			// }
			dispatch(listMyOrders());
			return () => {};
		},
		[ userInfo ]
	);

	return (
		<div className="profile_container wrap p-20px">
			<Helmet>
				<title>Edit Shipping | Glow LEDs</title>
				<meta property="og:title" content="Edit Shipping" />
				<meta name="twitter:title" content="Edit Shipping" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/account/editshipping" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/account/editshipping" />
			</Helmet>
			<div className="profile-info">
				<div className="form">
					<form onSubmit={submitHandler} style={{ width: '100%' }}>
						<ul className="form-container">
							<li>
								<h1 style={{ textAlign: 'center' }}>User Profile</h1>
							</li>
							<li>
								<div className="jc-c">
									<Loading loading={loading} error={error}>
										{success && <h3 style={{ textAlign: 'center' }}>Profile Saved Successfully</h3>}
									</Loading>
								</div>
							</li>
							<li>
								<label htmlFor="name">Name</label>
								<input
									defaultValue={name}
									type="name"
									name="name"
									id="name"
									onChange={(e) => setName(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor="email">Email</label>
								<input
									defaultValue={email}
									type="email"
									name="email"
									id="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor="password">Password</label>
								<input
									defaultValue={password}
									type="password"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</li>

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

export default ProfilePage;
