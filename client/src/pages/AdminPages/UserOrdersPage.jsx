import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { listUserOrders } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Order, OrderListItem, OrderSmallScreen } from '../../components/SpecialtyComponents';

const UserOrderPage = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [ block_list_view, set_block_list_view ] = useState(false);
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	console.log({ user_orders_page: userInfo });

	const myOrderList = useSelector((state) => state.myOrderList);
	const { loading, orders, error } = myOrderList;

	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			stableDispatch(listUserOrders(props.match.params.id));
		},
		[ userInfo, stableDispatch ]
	);
	const change_view = (e) => {
		if (e.target.value === 'Block View') {
			set_block_list_view(true);
		} else {
			set_block_list_view(false);
		}
	};

	const colors = [
		{ name: 'Not Paid', color: '#6d3e3e' },
		{ name: 'Paid', color: '#3e4c6d' },
		{ name: 'Manufactured', color: '#4b7188' },
		{ name: 'Packaged', color: '#6f5f7d' },
		{ name: 'Shipped', color: '#636363' },
		{ name: 'Delivered', color: '#333333' },
		{ name: 'Refunded', color: '#a9a9a9' }
	];

	const determine_color = (order) => {
		let result = '';
		if (!order.isPaid) {
			result = colors[0].color;
		}
		if (order.isPaid) {
			result = colors[1].color;
		}
		if (order.isManufactured) {
			result = colors[2].color;
		}
		if (order.isPackaged) {
			result = colors[3].color;
		}
		if (order.isShipped) {
			result = colors[4].color;
		}
		if (order.isDelivered) {
			result = colors[5].color;
		}
		if (order.isRefunded) {
			result = colors[6].color;
		}
		// console.log(result);
		return result;
	};

	return (
		<div className="profile_container wrap column p-20px">
			<Helmet>
				<title>My Orders | Glow LEDs</title>
				<meta property="og:title" content="My Orders" />
				<meta name="twitter:title" content="My Orders" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/account/orders" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/account/orders" />
			</Helmet>
			<div className="wrap jc-b">
				<button className="btn secondary" onClick={() => history.goBack()}>
					Back to User Profile
				</button>
				{colors.map((color) => {
					return (
						<div className="wrap jc-b w-16rem m-1rem">
							<label style={{ marginRight: '1rem' }}>{color.name}</label>
							<div
								style={{
									backgroundColor: color.color,
									height: '20px',
									width: '60px',
									borderRadius: '5px'
								}}
							/>
						</div>
					);
				})}
			</div>
			<div className="profile-orders profile_orders_container" style={{ width: '100%' }}>
				{/* <button type="button" onClick={handleLogout} className="btn secondary w-100per">Logout</button> */}

				<h1 style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}>My Orders</h1>
				<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
					<div className="mb-1rem">
						<div className="custom-select w-100per">
							<select className="qty_select_dropdown w-100per" onChange={(e) => change_view(e)}>
								{[ 'List View', 'Block View' ].map((view, index) => (
									<option key={index} value={view}>
										{view}
									</option>
								))}
							</select>
							<span className="custom-arrow" />
						</div>
					</div>
				</div>
				<Loading loading={loading} error={error}>
					<div className="product_big_screen">
						{!block_list_view &&
							orders &&
							orders.map((order) => <OrderListItem determine_color={determine_color} order={order} />)}
					</div>
					<div className="product_big_screen">
						{block_list_view &&
							orders &&
							orders.map((order) => <Order determine_color={determine_color} order={order} />)}
					</div>
					<div className="product_small_screen none column">
						{orders &&
							orders.map((order) => <OrderSmallScreen determine_color={determine_color} order={order} />)}
					</div>
				</Loading>
			</div>
		</div>
	);
};

export default UserOrderPage;
