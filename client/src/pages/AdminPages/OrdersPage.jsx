import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, update_order, update_payment } from '../../actions/orderActions';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Order, OrderListItem, OrderSmallScreen, Search, Sort } from '../../components/SpecialtyComponents';

const OrdersPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ last_product_id, set_last_product_id ] = useState('');
	const [ direction, set_direction ] = useState('');
	const [ payment_method, set_payment_method ] = useState('');
	const [ block_list_view, set_block_list_view ] = useState(false);

	const category = props.match.params.category ? props.match.params.category : '';
	const orderList = useSelector((state) => state.orderList);
	const { loading, orders, error } = orderList;

	const orderDelete = useSelector((state) => state.orderDelete);
	const { success: successDelete } = orderDelete;

	const dispatch = useDispatch();

	const [ order_state, set_order_state ] = useState({});

	useEffect(
		() => {
			dispatch(listOrders(category, searchKeyword, sortOrder, 'none'));
			dispatch(listOrders(category, searchKeyword, sortOrder, 'none'));
			// dispatch(listOrders());
		},
		[ successDelete, order_state ]
	);

	useEffect(
		() => {
			dispatch(listOrders(category, searchKeyword, sortOrder, 'none'));
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listOrders(category, searchKeyword, sortOrder, 'none'));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listOrders(category, searchKeyword, e.target.value, 'none'));
	};

	const colors = [
		{ name: 'Not Paid', color: '#6d3e3e' },
		{ name: 'Paid', color: '#3e4c6d' },
		{ name: 'Manufactured', color: '#4b7188' },
		{ name: 'Packaged', color: '#6f5f7d' },
		{ name: 'Shipped', color: '#636363' },
		{ name: 'Delivered', color: '#333333' }
		// { name: 'Refunded', color: '#a9a9a9' }
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
		// if (order.isRefunded) {
		// 	result = colors[6].color;
		// }
		return result;
	};

	const sort_options = [
		'Date',
		'Paid',
		'Manufactured',
		'Packaged',
		'Shipped',
		'Delievered',
		'Newest',
		'Lowest',
		'Highest'
	];

	const update_order_state = (order, state, is_action, action_at) => {
		if (state) {
			set_order_state({ ...order_state, [is_action]: false });
			dispatch(update_order(order, false, is_action, action_at));
		} else {
			set_order_state({ ...order_state, [is_action]: true });
			dispatch(update_order(order, true, is_action, action_at));
		}
	};
	const update_order_payment_state = (order, state, is_action) => {
		if (state) {
			set_order_state({ ...order_state, [is_action]: false });
			dispatch(update_payment(order, false, payment_method));
		} else {
			set_order_state({ ...order_state, [is_action]: true });
			dispatch(update_payment(order, true, payment_method));
		}
	};
	const change_view = (e) => {
		if (e.target.value === 'Block View') {
			set_block_list_view(true);
		} else {
			set_block_list_view(false);
		}
	};
	const next_set_of_orders = (direction) => {
		dispatch(listOrders(category, searchKeyword, sortOrder, orders[9]._id, direction));
	};
	const previous_set_of_orders = (direction) => {
		dispatch(listOrders(category, searchKeyword, sortOrder, orders[0]._id, direction));
	};

	return (
		<div className="profile_container wrap column p-20px">
			<Helmet>
				<title>Admin Orders | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<Link to="/secure/glow/controlpanel">
					<button className="btn primary">Back to Control Panel</button>
				</Link>
				{/* <button
					className="btn primary"
					onClick={() => {
						change_view();
					}}
					style={{ width: '160px' }}
				>
					{block_list_view ? 'Block' : 'List'}
				</button> */}

				<Link to="/secure/glow/editorder">
					<button className="btn primary" style={{ width: '160px' }}>
						Create Order
					</button>
				</Link>
			</div>
			<div className="wrap jc-b">
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
				<h1 style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}>Orders</h1>
				<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
					<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
					<Sort sortHandler={sortHandler} sort_options={sort_options} />
					<div className="wrap jc-b">
						{/* {orders &&
							[ ...Array(10).keys() ].map((x) => (
								<option key={x + 1} defaultValue={parseInt(x + 1)}>
									{parseInt(x + 1)}
								</option>
							))} */}
						<button className="btn icon primary mh-1rem" onClick={() => previous_set_of_orders('previous')}>
							<i className="fas fa-arrow-left fs-22px" />
						</button>
						<button className="btn icon primary " onClick={() => next_set_of_orders('next')}>
							<i className="fas fa-arrow-right fs-22px" />
						</button>
					</div>
					{/* <div className="ml-1rem product_big_screen">
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
					</div> */}
				</div>
				<Loading loading={loading} error={error}>
					<div className="product_big_screen">
						{!block_list_view &&
							orders &&
							orders.map((order) => (
								<OrderListItem
									determine_color={determine_color}
									update_order_payment_state={update_order_payment_state}
									update_order_state={update_order_state}
									set_payment_method={set_payment_method}
									admin={true}
									order={order}
								/>
							))}
					</div>
					<div className="product_big_screen">
						{block_list_view &&
							orders &&
							orders.map((order) => (
								<Order
									determine_color={determine_color}
									update_order_payment_state={update_order_payment_state}
									update_order_state={update_order_state}
									set_payment_method={set_payment_method}
									admin={true}
									order={order}
								/>
							))}
					</div>
					<div className="product_small_screen none column">
						{orders &&
							orders.map((order) => (
								<OrderSmallScreen determine_color={determine_color} order={order} admin={true} />
							))}
					</div>
				</Loading>
			</div>
		</div>
	);
};
export default OrdersPage;
