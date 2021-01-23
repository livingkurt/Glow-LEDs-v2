import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listMyOrders } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const ProfilePage = (props) => {
	// const userInfo = props.userInfo;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	console.log({ userInfo });
	// const [ first_name, set_first_name ] = useState('');
	// const [ last_name, set_last_name ] = useState('');
	// const [ shipping, set_shipping ] = useState({});
	// const [ password, setPassword ] = useState('');
	// const [ is_affiliated, set_is_affiliated ] = useState();
	// const [ email_subscription, set_email_subscription ] = useState(true);
	// const [ email, setEmail ] = useState('');
	// const dispatch = useDispatch();

	// const userUpdate = useSelector((state) => state.userUpdate);

	// useEffect(
	// 	() => {

	// 		return () => {};
	// 	},
	// 	[ userInfo ]
	// );
	// useEffect(
	// 	() => {
	// 		// if (userInfo) {
	// 		// 	setEmail(userInfo.email);
	// 		// 	set_first_name(userInfo.first_name);
	// 		// 	set_last_name(userInfo.last_name);
	// 		// 	set_shipping(userInfo.shipping);
	// 		// 	setPassword(userInfo.password);
	// 		// 	set_is_affiliated(userInfo.is_affiliated);
	// 		// 	set_email_subscription(userInfo.email_subscription);
	// 		// }
	// 		dispatch(listMyOrders());
	// 		return () => {};
	// 	},
	// 	[ userInfo ]
	// );

	// useEffect(
	// 	() => {
	// 		if (userUpdate.userInfo) {
	// 			setEmail(userUpdate.userInfo.email);
	// 			set_first_name(userUpdate.userInfo.first_name);
	// 			set_last_name(userUpdate.userInfo.last_name);
	// 			set_shipping(userUpdate.userInfo.shipping);
	// 			setPassword(userUpdate.userInfo.password);
	// 			set_is_affiliated(userUpdate.userInfo.is_affiliated);

	// 			set_email_subscription(userUpdate.email_subscription);
	// 		}
	// 		return () => {};
	// 	},
	// 	[ userUpdate.userInfo ]
	// );

	return (
		<div className="column p-20px inner_content">
			<Helmet>
				<title>Profile | Glow LEDs</title>
				<meta property="og:title" content="Profile" />
				<meta name="twitter:title" content="Profile" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/account/profile" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/account/profile" />
			</Helmet>
			<div>
				<h1 style={{ textAlign: 'center', width: '100%' }}>User Profile</h1>
			</div>
			<div className="row jc-b wrap profile_container">
				<div column>
					<div className="column mb-20px">
						<h3>First Name</h3>
						<label>{userInfo.first_name}</label>
					</div>
					<div className="column mb-20px">
						<h3>Last Name</h3>
						<label>{userInfo.last_name}</label>
					</div>
					<div className="column mb-20px">
						<h3>Email</h3>
						<label>{userInfo.email}</label>
					</div>
					<div className="column mb-20px">
						<h3>Password</h3>
						<label>**********</label>
					</div>
					<div className="label">
						<h3>Shipping Address</h3>
						<div>
							{userInfo.shipping.first_name} {userInfo.shipping.last_name}
						</div>
						<div>
							{userInfo.shipping.address_1} {userInfo.shipping.address_2}
						</div>
						<div>
							{userInfo.shipping.city}, {userInfo.shipping.state} {userInfo.shipping.postalCode}{' '}
							{userInfo.shipping.country}
						</div>
						<div>{userInfo.shipping.international && 'International'}</div>
						<div>{userInfo.shipping.email}</div>
					</div>
					<div className="column mb-20px">
						<h3>Promotional Emails</h3>
						<label>{userInfo.email_subscription ? 'Subscribed' : 'Not Subscribed'}</label>
					</div>
				</div>
				<div className="row">
					<div className="h-20px">
						<Link to={'/secure/account/editprofile'}>
							<button style={{ marginRight: '10px', maxWidth: '150px' }} className="btn primary">
								Edit Profile
							</button>
						</Link>
					</div>
					<div className="h-20px">
						<Link to={'/account/changepassword'}>
							<button style={{ marginRight: '10px', maxWidth: '210px' }} className="btn primary">
								Change Password
							</button>
						</Link>
					</div>
					<div className="h-20px">
						<Link to={'/secure/account/orders'}>
							<button style={{ maxWidth: '150px' }} className="btn primary">
								View Orders
							</button>
						</Link>
					</div>
					{userInfo.is_affiliated && userInfo.affiliate ? (
						<div className="h-20px ml-1rem">
							<Link to={'/secure/account/edit_affiliate/' + userInfo.affiliate || userInfo.affiliate._id}>
								<button className="btn primary">Edit Affiliate Profile</button>
							</Link>
						</div>
					) : (
						<div className="h-20px ml-1rem">
							<Link to={'/secure/account/edit_affiliate'}>
								<button className="btn primary">Affiliate Sign Up</button>
							</Link>
						</div>
					)}
					{/* {is_affiliated && (
						<div className="h-20px ml-1rem">
							<Link to={'/secure/account/affiliate_signup'}>
								<button className="btn primary">
									{userInfo.affiliate ? 'Edit Affiliate Profile' : 'Affiliate Sign Up'}
								</button>
							</Link>
						</div>
					)} */}
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
