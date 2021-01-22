import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveOrder, detailsOrder } from '../../actions/orderActions';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';
import { listProducts } from '../../actions/productActions';
import { listUsers } from '../../actions/userActions';

const EditOrderPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ orderItems, set_orderItems ] = useState([ {} ]);
	const [ order_items, set_order_items ] = useState([ {} ]);
	const [ shipping, set_shipping ] = useState({});
	const [ user, set_user ] = useState('');
	const [ payment, set_payment ] = useState({});
	const [ itemsPrice, set_itemsPrice ] = useState(0);
	const [ taxPrice, set_taxPrice ] = useState(0);
	const [ shippingPrice, set_shippingPrice ] = useState(0);
	const [ totalPrice, set_totalPrice ] = useState(0);
	const [ isPaid, set_isPaid ] = useState(false);
	const [ paidAt, set_paidAt ] = useState();
	const [ isManufactured, set_isManufactured ] = useState(false);
	const [ manufacturedAt, set_manufacturedAt ] = useState('');
	const [ isPackaged, set_isPackaged ] = useState(false);
	const [ packagedAt, set_packagedAt ] = useState();
	const [ isShipped, set_isShipped ] = useState(false);
	const [ shippedAt, set_shippedAt ] = useState('');
	const [ isDelivered, set_isDelivered ] = useState(false);
	const [ deliveredAt, set_deliveredAt ] = useState();
	const [ isRefunded, set_isRefunded ] = useState(false);
	const [ refundedAt, set_refundedAt ] = useState('');
	const [ createdAt, set_createdAt ] = useState('');
	const [ order_note, set_order_note ] = useState('');
	const [ promo_code, set_promo_code ] = useState('');
	const [ tracking_number, set_tracking_number ] = useState('');
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const history = useHistory();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const dispatch = useDispatch();

	console.log({ order });

	const set_state = () => {
		set_id(order._id);
		set_user(order.user);
		set_orderItems(order.orderItems);
		set_order_items(order.orderItems);
		set_shipping(order.shipping);
		set_payment(order.payment);
		set_itemsPrice(order.itemsPrice);
		set_taxPrice(order.taxPrice);
		set_shippingPrice(order.shippingPrice);
		set_totalPrice(order.totalPrice);
		set_isPaid(order.isPaid);

		if (order.createdAt) {
			set_createdAt(format_date(order.createdAt));
		}
		if (order.paidAt) {
			set_paidAt(format_date(order.paidAt));
		}
		set_isManufactured(order.isManufactured);
		if (order.manufacturedAt) {
			set_manufacturedAt(format_date(order.manufacturedAt));
		}
		set_isPackaged(order.isPackaged);
		if (order.packagedAt) {
			set_packagedAt(format_date(order.packagedAt));
		}
		set_isShipped(order.isShipped);
		if (order.shippedAt) {
			set_shippedAt(format_date(order.shippedAt));
		}
		set_isDelivered(order.isDelivered);
		if (order.deliveredAt) {
			set_deliveredAt(format_date(order.deliveredAt));
		}
		set_isRefunded(order.isRefunded);
		if (order.refundedAt) {
			set_refundedAt(format_date(order.refundedAt));
		}
		set_order_note(order.order_note);
		set_promo_code(order.promo_code);
		set_tracking_number(order.tracking_number);

		// console.log(format_date(order.isManufactured));
	};
	const unset_state = () => {
		set_id('');
		set_user('');
		set_orderItems('');
		set_shipping('');
		set_payment('');
		set_itemsPrice('');
		set_taxPrice('');
		set_shippingPrice('');
		set_totalPrice('');
		set_isPaid('');
		set_paidAt('');
		set_isManufactured('');
		set_manufacturedAt('');
		set_isPackaged('');
		set_packagedAt('');
		set_isShipped('');
		set_shippedAt('');
		set_isDelivered('');
		set_deliveredAt('');
		set_isRefunded('');
		set_refundedAt('');
		set_order_note('');
		set_promo_code('');
		set_tracking_number('');
	};

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsOrder(props.match.params.id));
				stableDispatch(detailsOrder(props.match.params.id));
				stableDispatch(listProducts(''));
				stableDispatch(listUsers(''));
			} else {
				stableDispatch(detailsOrder(''));
			}
			set_state();
			return () => {};
		},
		[ stableDispatch ]
	);

	useEffect(
		() => {
			if (order) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
				set_orderItems([ {} ]);
			}

			return () => {};
		},
		[ order ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveOrder({
				_id: id,
				user,
				orderItems,
				shipping,
				payment,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
				isPaid,
				paidAt,
				isManufactured,
				manufacturedAt: manufacturedAt && unformat_date(manufacturedAt),
				isPackaged,
				packagedAt: packagedAt && unformat_date(packagedAt),
				isShipped,
				shippedAt: shippedAt && unformat_date(shippedAt),
				isDelivered,
				deliveredAt: deliveredAt && unformat_date(deliveredAt),
				isRefunded,
				refundedAt: refundedAt && unformat_date(refundedAt),
				createdAt: createdAt && unformat_date(createdAt),
				order_note,
				promo_code,
				tracking_number
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/orders');
	};

	const add_order_item = (e) => {
		e.preventDefault();
		set_orderItems((items) => [ ...items, {} ]);
	};

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const update_order_item = (e, index) => {
		const order_item = JSON.parse(e.target.value);
		console.log({ order_item });
		let new_order_items = [ ...orderItems ];
		new_order_items[index] = {
			...new_order_items[index],
			name: order_item.name,
			// qty: orderItems[index].qty,
			display_image: order_item.images[0],
			price: order_item.price,
			category: order_item.category,
			pathname: order_item.pathname,
			// sale_price: orderItems[index].sale_price,
			package_volume: order_item.package_volume,
			weight_pounds: order_item.weight_pounds,
			weight_ounces: order_item.weight_ounces,
			package_length: order_item.package_length,
			package_width: order_item.package_width,
			package_height: order_item.package_height,
			reviewed: order_item.reviewed,
			product: order_item._id
			// secondary_product: orderItems[index].secondary_product
		};
		set_orderItems(new_order_items);
		console.log({ orderItems });
	};

	const update_order_item_property = (value, field_name, index) => {
		console.log({ value, field_name, index });
		let new_order_items = [ ...orderItems ];
		new_order_items[index] = {
			...new_order_items[index],
			[field_name]: value
		};
		set_orderItems(new_order_items);
		console.log({ orderItems });
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Order' : 'Create Order'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{order && (
							<div>
								<Helmet>
									<title>Edit Order | Glow LEDs</title>
								</Helmet>

								<ul
									className="edit-form-container"
									style={{ maxWidth: '105rem', marginBottom: '20px' }}
								>
									<div className="row wrap jc-b">
										<div className="w-228px m-10px">
											{/* <h2>User</h2> */}
											{/* <li>
												<label htmlFor="user">User</label>
												<input
													type="text"
													defaultValue={order.user && order.user._id}
													name="user"
													id="user"
													onChange={(e) => set_user(e.target.value)}
												/>
											</li> */}
											<li>
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mb-15px"
												>
													User
												</label>
												<div className="ai-c h-25px mb-15px">
													<div className="custom-select">
														<select
															defaultValue={order.user && order.user._id}
															// defaultValue={user.product}
															className="qty_select_dropdown"
															onChange={(e) => set_user(e.target.value)}
														>
															<option key={1} defaultValue="">
																---Choose User---
															</option>
															{users &&
																users.map((user, index) => (
																	<option key={index} defaultValue={user._id}>
																		{user.first_name} {user.last_name}
																	</option>
																))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											</li>

											<h2>Shipping</h2>
											<li>
												<label htmlFor="email">Email</label>
												<input
													type="text"
													defaultValue={shipping && shipping.email}
													name="email"
													id="email"
													onChange={(e) =>
														set_shipping({ ...shipping, email: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="first_name">First Name</label>
												<input
													type="text"
													defaultValue={shipping && shipping.first_name}
													name="first_name"
													id="first_name"
													onChange={(e) =>
														set_shipping({ ...shipping, first_name: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="last_name">Last Name</label>
												<input
													type="text"
													defaultValue={shipping && shipping.last_name}
													name="last_name"
													id="last_name"
													onChange={(e) =>
														set_shipping({ ...shipping, last_name: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="address_1">Address</label>
												<input
													type="text"
													defaultValue={shipping && shipping.address_1}
													name="address_1"
													id="address_1"
													onChange={(e) =>
														set_shipping({ ...shipping, address_1: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="address_2">Apt/Suite</label>
												<input
													type="text"
													defaultValue={shipping && shipping.address_2}
													name="address_2"
													id="address_2"
													onChange={(e) =>
														set_shipping({ ...shipping, address_2: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="city">City</label>
												<input
													type="text"
													defaultValue={shipping && shipping.city}
													name="city"
													id="city"
													onChange={(e) =>
														set_shipping({ ...shipping, city: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="state">State</label>
												<input
													type="text"
													defaultValue={shipping && shipping.state}
													name="state"
													id="state"
													onChange={(e) =>
														set_shipping({ ...shipping, state: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="postalCode">Postal Code</label>
												<input
													type="text"
													defaultValue={shipping && shipping.postalCode}
													name="postalCode"
													id="postalCode"
													onChange={(e) =>
														set_shipping({ ...shipping, postalCode: e.target.value })}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="international">International</label>
													<input
														type="checkbox"
														name="international"
														// defaultChecked={international ? 'checked' : 'unchecked'}
														defaultValue={shipping && shipping.international}
														defaultChecked={shipping && shipping.international}
														defaultValue={shipping && shipping.international}
														id="international"
														onChange={(e) =>
															set_shipping({
																...shipping,
																international: e.target.value
															})}
													/>
												</li>
											)}
											<li>
												<label htmlFor="country">Country</label>
												<input
													type="text"
													value={shipping && shipping.country}
													name="country"
													id="country"
													onChange={(e) =>
														set_shipping({ ...shipping, country: e.target.value })}
												/>
											</li>
										</div>

										<div className="w-228px m-10px">
											<h2>Payment</h2>
											<li>
												<label htmlFor="payment">Payment</label>
												<input
													type="text"
													name="payment"
													value={payment}
													id="payment"
													onChange={(e) => set_payment(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="itemsPrice">Items Price</label>
												<input
													type="text"
													name="itemsPrice"
													value={itemsPrice}
													id="itemsPrice"
													onChange={(e) => set_itemsPrice(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="taxPrice">Tax Price</label>
												<input
													type="text"
													name="taxPrice"
													value={taxPrice}
													id="taxPrice"
													onChange={(e) => set_taxPrice(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="shippingPrice">Shipping Price</label>
												<input
													type="text"
													name="shippingPrice"
													value={shippingPrice}
													id="shippingPrice"
													onChange={(e) => set_shippingPrice(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="totalPrice">Total Price</label>
												<input
													type="text"
													name="totalPrice"
													value={totalPrice}
													id="totalPrice"
													onChange={(e) => set_totalPrice(e.target.value)}
												/>
											</li>
											<h2>Other Info</h2>
											<li>
												<label htmlFor="order_note">Order Note</label>
												<input
													type="text"
													name="order_note"
													value={order_note}
													id="order_note"
													onChange={(e) => set_order_note(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="promo_code">Promo Code</label>
												<input
													type="text"
													name="promo_code"
													value={promo_code}
													id="promo_code"
													onChange={(e) => set_promo_code(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="tracking_number">Tracking Number</label>
												<input
													type="text"
													name="tracking_number"
													value={tracking_number}
													id="tracking_number"
													onChange={(e) => set_tracking_number(e.target.value)}
												/>
											</li>
										</div>

										<div className="w-228px m-10px">
											<h2>Order State</h2>
											<li>
												<label htmlFor="createdAt">Created At</label>
												<input
													type="text"
													name="createdAt"
													value={createdAt}
													id="createdAt"
													onChange={(e) => set_createdAt(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isPaid">Paid?</label>
													<input
														type="checkbox"
														name="isPaid"
														// defaultChecked={isPaid ? 'checked' : 'unchecked'}
														// defaultValue={isPaid}
														defaultChecked={isPaid}
														// value={isPaid ? '1' : '0'}
														id="isPaid"
														onChange={(e) => {
															set_isPaid(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="paidAt">Paid At</label>
												<input
													type="text"
													name="paidAt"
													value={paidAt}
													id="paidAt"
													onChange={(e) => set_paidAt(e.target.value)}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isManufactured">Manufactured?</label>
													<input
														type="checkbox"
														name="isManufactured"
														// defaultChecked={isManufactured ? 'checked' : 'unchecked'}
														// defaultValue={isManufactured}
														defaultChecked={isManufactured}
														// value={isManufactured ? '1' : '0'}
														id="isManufactured"
														onChange={(e) => {
															set_isManufactured(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="manufacturedAt">Manufactured At</label>
												<input
													type="text"
													name="manufacturedAt"
													value={manufacturedAt}
													id="manufacturedAt"
													onChange={(e) => set_manufacturedAt(e.target.value)}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isPackaged">Packaged?</label>
													<input
														type="checkbox"
														name="isPackaged"
														// defaultChecked={isPackaged ? 'checked' : 'unchecked'}
														// defaultValue={isPackaged}
														defaultChecked={isPackaged}
														// value={isPackaged ? '1' : '0'}
														id="isPackaged"
														onChange={(e) => {
															set_isPackaged(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="packagedAt">Packaged At</label>
												<input
													type="text"
													name="packagedAt"
													value={packagedAt}
													id="packagedAt"
													onChange={(e) => set_packagedAt(e.target.value)}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isShipped">Shipped?</label>
													<input
														type="checkbox"
														name="isShipped"
														// defaultChecked={isShipped ? 'checked' : 'unchecked'}
														// defaultValue={isShipped}
														defaultChecked={isShipped}
														// value={isShipped ? '1' : '0'}
														id="isShipped"
														onChange={(e) => {
															set_isShipped(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="shippedAt">Shipped At</label>
												<input
													type="text"
													name="shippedAt"
													value={shippedAt}
													id="shippedAt"
													onChange={(e) => set_shippedAt(e.target.value)}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isDelivered">Delivered?</label>
													<input
														type="checkbox"
														name="isDelivered"
														// defaultChecked={isDelivered ? 'checked' : 'unchecked'}
														// defaultValue={isDelivered}
														defaultChecked={isDelivered}
														// value={isDelivered ? '1' : '0'}
														id="isDelivered"
														onChange={(e) => {
															set_isDelivered(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="deliveredAt">Delivered At</label>
												<input
													type="text"
													name="deliveredAt"
													value={deliveredAt}
													id="deliveredAt"
													onChange={(e) => set_deliveredAt(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="isRefunded">Refunded?</label>
												<input
													type="checkbox"
													name="isRefunded"
													// defaultChecked={isRefunded ? 'checked' : 'unchecked'}
													// defaultValue={isRefunded}
													defaultChecked={isRefunded}
													// value={isRefunded ? '1' : '0'}
													id="isRefunded"
													onChange={(e) => {
														set_isRefunded(e.target.checked);
													}}
												/>
											</li>
											<li>
												<label htmlFor="refundedAt">Refunded At</label>
												<input
													type="text"
													name="refundedAt"
													value={refundedAt}
													id="refundedAt"
													onChange={(e) => set_refundedAt(e.target.value)}
												/>
											</li>
										</div>
									</div>
									<li>
										<button className="btn primary" onClick={(e) => add_order_item(e)}>
											Add Another Order Item
										</button>
									</li>
									<div className="row wrap jc-b">
										{orderItems &&
											orderItems.map((item, index) => {
												return (
													<div key={index} className="w-410px m-10px">
														<h2>Order Item {index + 1}</h2>
														<li>
															<label htmlFor="product">Product</label>
															{console.log({ product: item.product })}
															<input
																type="text"
																name="product"
																defaultValue={item.product && item.product._id}
																value={item.product && item.product._id}
																id="product"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>

														<li>
															<label
																aria-label="sortOrder"
																htmlFor="sortOrder"
																className="select-label mb-15px"
															>
																Product
															</label>
															<div className="ai-c h-25px mb-15px">
																<div className="custom-select">
																	<select
																		className="qty_select_dropdown"
																		onChange={(e) => update_order_item(e, index)}
																	>
																		<option key={1} defaultValue="">
																			---Choose Product---
																		</option>
																		{products.map((product, index) => (
																			<option
																				key={index}
																				value={JSON.stringify(product)}
																			>
																				{product.name}
																			</option>
																		))}
																	</select>
																	<span className="custom-arrow" />
																</div>
															</div>
														</li>
														<li>
															<label htmlFor="name">Order Item Name</label>
															<input
																type="text"
																name="name"
																defaultValue={item.name}
																value={item.name}
																id="name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
																// set_orderItems([
																// 	{
																// 		...orderItems[index],
																// 		name: e.target.value
																// 	}
																// ]) }
															/>
														</li>
														<li>
															<label htmlFor="qty">Quantity</label>
															<input
																type="text"
																name="qty"
																defaultValue={item.qty}
																value={item.qty}
																id="qty"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="display_image">Display Image</label>
															<input
																type="text"
																name="display_image"
																defaultValue={item.display_image}
																value={item.display_image}
																id="display_image"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="diffuser_cap_color">
																Diffuser Cap Color
															</label>
															<input
																type="text"
																name="diffuser_cap_color"
																defaultValue={item.diffuser_cap_color}
																value={item.diffuser_cap_color}
																id="diffuser_cap_color"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="diffuser_cap_name">Diffuser Cap Name</label>
															<input
																type="text"
																name="diffuser_cap_name"
																defaultValue={item.diffuser_cap_name}
																value={item.diffuser_cap_name}
																id="diffuser_cap_name"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_length">Length</label>
															<input
																type="text"
																name="package_length"
																defaultValue={item.package_length}
																value={item.package_length}
																id="package_length"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_width">Width</label>
															<input
																type="text"
																name="package_width"
																defaultValue={item.package_width}
																value={item.package_width}
																id="package_width"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_height">Height</label>
															<input
																type="text"
																name="package_height"
																defaultValue={item.package_height}
																value={item.package_height}
																id="package_height"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_volume">Volume</label>
															<input
																type="text"
																name="package_volume"
																defaultValue={item.package_volume}
																value={item.package_volume}
																id="package_volume"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="weight_pounds">Weight Pounds</label>
															<input
																type="text"
																name="weight_pounds"
																defaultValue={item.weight_pounds}
																value={item.weight_pounds}
																id="weight_pounds"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="weight_ounces">Weight Ounces</label>
															<input
																type="text"
																name="weight_ounces"
																defaultValue={item.weight_ounces}
																value={item.weight_ounces}
																id="weight_ounces"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="price">Price</label>
															<input
																type="text"
																name="price"
																defaultValue={item.price}
																value={item.price}
																id="price"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="category">Category</label>
															<input
																type="text"
																name="category"
																defaultValue={item.category}
																value={item.category}
																id="category"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="sale_price">Sale Price</label>
															<input
																type="text"
																name="sale_price"
																defaultValue={item.sale_price}
																value={item.sale_price}
																id="sale_price"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="product">Pathname</label>
															<input
																type="text"
																name="product"
																defaultValue={item.pathname}
																value={item.pathname}
																id="product"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>

														<li>
															<label htmlFor="secondary_product">Secondary Product</label>
															<input
																type="text"
																name="secondary_product"
																defaultValue={
																	item.secondary_product && item.secondary_product
																}
																value={item.secondary_product && item.secondary_product}
																id="secondary_product"
																onChange={(e) =>
																	update_order_item_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label
																aria-label="sortOrder"
																htmlFor="sortOrder"
																className="select-label mb-15px"
															>
																Secondary Product
															</label>
															<div className="ai-c h-25px mb-15px">
																<div className="custom-select">
																	<select
																		defaultValue={item.secondary_product}
																		value={item.secondary_product}
																		// defaultValue={item.secondary_product}
																		className="qty_select_dropdown"
																		onChange={(e) =>
																			update_order_item_property(
																				e.target.value,
																				e.target.name,
																				index
																			)}
																	>
																		<option key={1} defaultValue="">
																			---Choose Product---
																		</option>
																		{products.map((product, index) => (
																			<option
																				key={index}
																				defaultValue={product._id}
																			>
																				{product.name}
																			</option>
																		))}
																	</select>
																	<span className="custom-arrow" />
																</div>
															</div>
														</li>
													</div>
												);
											})}
									</div>
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Orders
										</button>
									</li>
								</ul>
							</div>
						)}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditOrderPage;
