import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listMyOrders } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const ProfilePage = (props) => {
	const user_data = props.userInfo;
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ shipping, set_shipping ] = useState({});
	const [ password, setPassword ] = useState('');
	const [ is_affiliated, set_is_affiliated ] = useState();
	const [ email_subscription, set_email_subscription ] = useState(true);
	const [ email, setEmail ] = useState('');
	const dispatch = useDispatch();

	const userUpdate = useSelector((state) => state.userUpdate);

	useEffect(
		() => {
			if (user_data) {
				setEmail(user_data.email);
				set_first_name(user_data.first_name);
				set_last_name(user_data.last_name);
				set_shipping(user_data.shipping);
				setPassword(user_data.password);
				set_is_affiliated(user_data.is_affiliated);
				set_email_subscription(user_data.email_subscription);
			}
			dispatch(listMyOrders());
			return () => {};
		},
		[ user_data ]
	);

	useEffect(
		() => {
			if (userUpdate.userInfo) {
				setEmail(userUpdate.userInfo.email);
				set_first_name(userUpdate.userInfo.first_name);
				set_last_name(userUpdate.userInfo.last_name);
				set_shipping(userUpdate.userInfo.shipping);
				setPassword(userUpdate.userInfo.password);
				set_is_affiliated(user_data.userInfo.is_affiliated);
				set_email_subscription(userUpdate.email_subscription);
			}
			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	const container_styles = {
		marginBottom: '20px'
	};

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
						<label>{first_name}</label>
					</div>
					<div className="column mb-20px">
						<h3>Last Name</h3>
						<label>{last_name}</label>
					</div>
					<div className="column mb-20px">
						<h3>Email</h3>
						<label>{email}</label>
					</div>
					<div className="column mb-20px">
						<h3>Password</h3>
						<label>**********</label>
					</div>
					<div className="label">
						<h3>Shipping Address</h3>
						<div>
							{shipping.first_name} {shipping.last_name}
						</div>
						<div>
							{shipping.address_1} {shipping.address_2}
						</div>
						<div>
							{shipping.city}, {shipping.state} {shipping.postalCode} {shipping.country}
						</div>
						<div>{shipping.international && 'International'}</div>
						<div>{shipping.email}</div>
					</div>
					<div className="column mb-20px">
						<h3>Promotional Emails</h3>
						{console.log({ email_subscription })}
						<label>{email_subscription ? 'Subscribed' : 'Not Subscribed'}</label>
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
					{is_affiliated && user_data.affiliate ? (
						<div className="h-20px ml-1rem">
							<Link
								to={'/secure/account/edit_affiliate/' + user_data.affiliate || user_data.affiliate._id}
							>
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
									{user_data.affiliate ? 'Edit Affiliate Profile' : 'Affiliate Sign Up'}
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
