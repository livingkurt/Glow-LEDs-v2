import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrderPublic, payOrder, payOrderGuest } from '../../actions/orderActions';
import { format_date } from '../../utils/helper_functions';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
import StripeCheckout from 'react-stripe-checkout';
import { Helmet } from 'react-helmet';
import { LoadingPayments } from '../../components/UtilityComponents';
import { API_Products } from '../../utils';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

require('dotenv').config();

const OrderPublicPage = (props) => {
	const [ order_number, set_order_number ] = useState('');
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, error: errorPay } = orderPay;
	const dispatch = useDispatch();

	const orderDetailsPublic = useSelector((state) => state.orderDetailsPublic);
	const { loading, order, error } = orderDetailsPublic;

	const [ product, set_product ] = useState('');
	const [ secondary_product, set_secondary_product ] = useState('');
	const [ product_object, set_product_object ] = useState('');
	const [ payment_loading, set_payment_loading ] = useState(false);

	const [ order_state, set_order_state ] = useState({});

	useEffect(
		() => {
			if (order) {
				set_order_state(order);
			}
		},
		[ order ]
	);

	useEffect(
		() => {
			if (product_object) {
				set_product(product_object._id);
			}
			return () => {};
		},
		[ product_object ]
	);

	const save_secondary_product = async () => {
		const request = await API_Products.save_secondary_product(order, user_data, secondary_product);
		console.log(request);
		dispatch(detailsOrderPublic(props.match.params.id));
	};

	useEffect(
		() => {
			if (successPay) {
				dispatch(detailsOrderPublic(props.match.params.id));
			} else {
				dispatch(detailsOrderPublic(props.match.params.id));
			}
			set_payment_loading(false);
		},
		[ successPay ]
	);

	useEffect(
		() => {
			if (order) {
				set_order_state(order);
			}
		},
		[ order ]
	);

	useEffect(() => {
		empty_cart();
	}, []);

	const empty_cart = () => {
		for (let item of cartItems) {
			dispatch(removeFromCart(item.pathname));
		}
	};

	const pay_order = (paymentMethod) => {
		dispatch(payOrderGuest(order, paymentMethod));
		set_payment_loading(true);
	};

	useEffect(
		() => {
			if (successPay && order) {
				// props.history.push('/secure/checkout/paymentcomplete/' + order._id);
				props.history.push('/checkout/order/receipt/' + order._id + '/order/true');
				set_payment_loading(false);
				empty_cart();
			} else if (errorPay) {
				console.log({ errorPay });
			}
		},
		[ successPay ]
	);

	useEffect(
		() => {
			if (errorPay) {
				set_payment_loading(false);
			}
		},
		[ errorPay ]
	);

	const handleChangeFor = (type) => ({ error }) => {
		/* handle error */
		console.log({ type });
		console.log({ error });
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
		return result;
	};
	const [ show_color, set_show_color ] = useState(false);

	const handleWindowResize = (width) => {
		if (width > 0 && width < 407) {
			set_show_color(true);
		} else {
			set_show_color(false);
		}
	};

	const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	function useCurrentWidth() {
		// save current window width in the state object
		let [ width, setWidth ] = useState(getWidth());
		// in this case useEffect will execute only once because
		// it does not have any dependencies.
		useEffect(() => {
			// timeoutId for debounce mechanism
			let timeoutId = null;
			let numberId = null;
			const resizeListener = () => {
				// prevent execution of previous setTimeout
				clearTimeout(timeoutId);
				clearTimeout(numberId);
				// change width from the state object after 150 milliseconds
				timeoutId = setTimeout(() => setWidth(getWidth()), 150);
				numberId = setTimeout(() => handleWindowResize(getWidth()), 150);
			};
			// handleWindowResize(width);

			// set resize listener
			window.addEventListener('resize', resizeListener);
			// clean up function
			return () => {
				// remove resize listener
				window.removeEventListener('resize', resizeListener);
			};
		}, []);
		return width;
	}

	let width = useCurrentWidth();

	useEffect(() => {
		handleWindowResize(getWidth());
		return () => {};
	}, []);

	const [ stripePromise, setStripePromise ] = useState(() => loadStripe(process.env.REACT_APP_STRIPE_KEY));
	// console.log(process.env.REACT_APP_STRIPE_KEY);

	const Form = () => {
		const stripe = useStripe();
		const elements = useElements();

		const handleSubmit = async (event) => {
			event.preventDefault();
			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: 'card',
				card: elements.getElement(CardElement)
			});

			// console.log({ error });
			if (error) {
				console.log({ error });
				return;
			}
			console.log({ paymentMethod });
			pay_order(paymentMethod);
		};

		return (
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						iconStyle: 'solid',
						style: {
							base: {
								iconColor: '#c4f0ff',
								color: '#fff',
								fontWeight: 500,
								fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
								fontSize: '1.2rem',
								fontSmoothing: 'antialiased',
								':-webkit-autofill': { color: 'white' },
								'::placeholder': { color: 'white' }
							},
							invalid: {
								iconColor: '#ffc7ee',
								color: '#ffc7ee'
							}
						}
					}}
				/>
				<button type="submit" className="btn primary w-100per mb-12px" disabled={!stripe}>
					Complete Order
				</button>
			</form>
		);
	};

	return loading ? (
		<div className="column jc-c">
			<h2 style={{ textAlign: 'center' }}>Loading...</h2>
			<h3 style={{ textAlign: 'center' }}>If payment element doesn't show in 5 seconds, refresh the page.</h3>
		</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<Helmet>
				<title>Your Order | Glow LEDs</title>
				<meta property="og:title" content="Your Order" />
				<meta name="twitter:title" content="Your Order" />
				<link
					rel="canonical"
					href={'https://www.glow-leds.com/secure/account/order/' + props.match.params.id}
				/>
				<meta
					property="og:url"
					content={'https://www.glow-leds.com/secure/account/order/' + props.match.params.id}
				/>
			</Helmet>
			{/* {order.isPaid ? <CheckoutSteps step1 step2 step3 step4 /> : <CheckoutSteps step1 step2 step3 />} */}
			<div className="mb-10px ml-20px">
				{props.userInfo &&
				props.userInfo.isAdmin && (
					<Link to="/secure/glow/orders">
						<button className="btn secondary">Back to Admin Orders</button>
					</Link>
				)}

				<Link to="/secure/account/orders">
					<button className="btn secondary">Back to Orders</button>
				</Link>
			</div>
			<div className="jc-c mb-1rem">
				<div className="ai-c m-auto">
					<h3 className="mv-0px mr-10px">Track Order</h3>
					<input
						type="order_number"
						id="order_number"
						name="order_number"
						defaultValue={props.match.params.id}
						onChange={(e) => set_order_number(e.target.value)}
					/>
					<Link to={'/checkout/order/' + order_number}>
						<button className="btn primary ">Track</button>
					</Link>
				</div>
			</div>
			<LoadingPayments loading={payment_loading} error={errorPay} />
			<div className="placeorder br-20px" style={{ backgroundColor: show_color && determine_color(order) }}>
				<div className="placeorder-info">
					<div style={{ backgroundColor: determine_color(order) }}>
						{order.isRefunded && (
							<h1>
								Refunded: {order.payment.refund_reason[order.payment.refund_reason.length - 1]} on{' '}
								{format_date(order.refundedAt)}
							</h1>
						)}
						<div className="column w-100per">
							<label>Order #: {order._id}</label>
							{order.tracking_number && (
								<label>
									USPS Tracking #:{' '}
									<a
										href={
											'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=' +
											order.tracking_number
										}
										target="_blank"
										rel="noopener noreferrer"
										className="mv-2rem"
										style={{
											textDecoration: 'underline',
											color: 'white'
										}}
									>
										{order.tracking_number}
									</a>
								</label>
							)}
						</div>
						<div className="wrap jc-b">
							<div className="column w-100per">
								<h2>Shipping</h2>
								<div>
									<div>
										{order.shipping.first_name} {order.shipping.last_name}
									</div>
									<div>
										{order.shipping.address_1} {order.shipping.address_2}
									</div>
									<div>
										{order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}{' '}
										{order.shipping.country}
									</div>
									<div>{order.shipping.international && 'International'}</div>
									<div>{order.shipping.email}</div>
								</div>
							</div>
						</div>
					</div>

					<div style={{ backgroundColor: determine_color(order) }}>
						<h2>Payment</h2>
						<div style={{ borderTop: '.1rem white solid', width: '100%' }}>
							<p style={{ marginBottom: '0px' }}>
								{order.isPaid ? 'Paid at ' + format_date(order.paidAt) : 'Not Paid'}
							</p>
						</div>
					</div>
					<div style={{ backgroundColor: determine_color(order) }}>
						<ul className="cart-list-container mt-0px">
							<li>
								<h2>Shopping Cart</h2>
								<div>Price</div>
							</li>
							{console.log({ orderItems: order.orderItems })}
							{order.orderItems.length === 0 ? (
								<div>Cart is empty</div>
							) : (
								order.orderItems.map((item) => (
									<li key={item._id}>
										{console.log({ item })}
										<div className="cart-image">
											<Link to={'/collections/all/products/' + item.pathname}>
												<img
													src={item.product.images[0]}
													title="Product Image"
													alt={item.name}
												/>
											</Link>
										</div>
										<div className="cart-name">
											<div>
												{console.log({ diffuser_cap_color: item.diffuser_cap_color })}
												<Link to={'/collections/all/products/' + item.pathname}>
													{(item.category === 'diffuser_caps' ||
														item.category === 'mega_diffuser_caps') &&
														item.diffuser_cap_color}{' '}
													{item.name}{' '}
													{item.secondary_product && `w (${item.secondary_product.name})`}
												</Link>
											</div>
											<div>Qty: {item.qty}</div>
											{props.userInfo &&
											props.userInfo.isAdmin &&
											item.secondary_product && (
												<div className="row">
													<div className="mv-10px ">
														<label htmlFor="secondary_product">Secondary Product</label>
														<div className="row">
															<input
																type="text"
																value={item.secondary_product._id}
																name="secondary_product"
																id="secondary_product"
																className="w-100per"
																onChange={(e) => set_secondary_product(e.target.value)}
															/>
															<button
																className="btn primary"
																onClick={save_secondary_product}
															>
																Add
															</button>
														</div>
													</div>
												</div>
											)}
										</div>
										<div className="cart-price">
											{item.sale_price !== 0 ? (
												<div style={{ width: '230px' }}>
													<del style={{ color: 'red' }}>
														<label style={{ color: 'white' }}>
															${item.price ? item.price : item.price}
														</label>
													</del>{' '}
													<i class="fas fa-arrow-right" /> ${item.sale_price ? item.sale_price.toFixed(2) : item.sale_price}{' '}
													On Sale!
												</div>
											) : (
												<label>${item.price ? item.price.toFixed(2) : item.price}</label>
											)}
										</div>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
				<div className="placeorder-action" style={{ backgroundColor: determine_color(order) }}>
					<ul>
						<li>
							<h2 style={{ marginTop: 0 }}>Order Summary</h2>
						</li>
						{!order.promo_code && (
							<li>
								<div>Subtotal</div>
								<div>${order.itemsPrice && order.itemsPrice.toFixed(2)}</div>
							</li>
						)}

						{order.promo_code && (
							<li>
								<del style={{ color: 'red' }}>
									<div style={{ color: 'white' }}>Subtotal</div>
								</del>
								<div>
									<del style={{ color: 'red' }}>
										<label style={{ color: 'white' }}>
											${order.itemsPrice && order.itemsPrice.toFixed(2)}
										</label>
									</del>
								</div>
							</li>
						)}
						{order.promo_code && (
							<li>
								<div>Discount</div>
								<div>
									-${(order.orderItems.reduce((a, c) => a + c.price * c.qty, 0) -
										order.itemsPrice).toFixed(2)}
								</div>
							</li>
						)}
						{order.promo_code && (
							<li>
								<div>New Subtotal</div>
								<div>${order.itemsPrice.toFixed(2)}</div>
							</li>
						)}
						<li>
							<div>Tax</div>
							<div>${order.taxPrice ? order.taxPrice.toFixed(2) : order.taxPrice}</div>
						</li>
						<li>
							<div>Shipping</div>
							<div>${order.shippingPrice ? order.shippingPrice.toFixed(2) : order.shippingPrice}</div>
						</li>

						{!order.isRefunded && (
							<li>
								<div>Order Total</div>
								<div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
							</li>
						)}
						{order.isRefunded && (
							<li>
								<div>Order Total</div>
								<del style={{ color: 'red' }}>
									<label style={{ color: 'white' }}>
										<div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
									</label>
								</del>
							</li>
						)}
						{order.isRefunded && (
							<li>
								<div>Refund Amount</div>
								<div>${(order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}</div>
							</li>
						)}
						{order.isRefunded && (
							<li>
								<div>New Order Total</div>
								<div>
									${(order.totalPrice -
										order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}
								</div>
							</li>
						)}

						<li
							className="placeorder-actions-payment"
							style={{ display: 'flex', justifyContent: 'center' }}
						/>
						{!order.isPaid && (
							<div>
								<Elements stripe={stripePromise}>
									<Form />
								</Elements>
							</div>
						)}

						{order.promo_code && (
							<div className="column">
								<div
									style={{ borderTop: '.1rem white solid' }}
									className="pt-1rem"
									htmlFor="promo_code"
								>
									Promo Code: {order.promo_code}
								</div>
							</div>
						)}
						{order.order_note && (
							<div className="column">
								<div
									style={{ borderTop: '.1rem white solid' }}
									className="pt-1rem"
									htmlFor="order_note"
								>
									Order Note: {order.order_note}
								</div>
							</div>
						)}
					</ul>
					<div className="column jc-b h-22rem w-25remm mb-1rem">
						<h2>Order Status</h2>
						<div>
							<div className="row ai-c">
								<div className="mv-5px">
									{order.isPaid ? (
										<i className="fas fa-check-circle" />
									) : (
										<i className="fas fa-times-circle" />
									)}
								</div>
								<div className="mh-10px">Paid</div>

								<div>{!order.paidAt ? '' : format_date(order.paidAt)}</div>
							</div>
						</div>
						<div>
							<div className="row ai-c">
								<div className="mv-5px">
									{order.isManufactured ? (
										<i className="fas fa-check-circle" />
									) : (
										<i className="fas fa-times-circle" />
									)}
								</div>
								<div className="mh-10px">Manufactured</div>

								<div>{!order.manufacturedAt ? '' : format_date(order.manufacturedAt)}</div>
							</div>
						</div>
						<div>
							<div className="row ai-c">
								<div className="mv-5px">
									{order.isPackaged ? (
										<i className="fas fa-check-circle" />
									) : (
										<i className="fas fa-times-circle" />
									)}
								</div>
								<div className="mh-10px">Packaged</div>

								<div>{!order.packagedAt ? '' : format_date(order.packagedAt)}</div>
							</div>
						</div>
						<div>
							<div className="row ai-c">
								<div className="mv-5px">
									{order.isShipped ? (
										<i className="fas fa-check-circle" />
									) : (
										<i className="fas fa-times-circle" />
									)}
								</div>
								<div className="mh-10px">Shipped</div>

								<div>{!order.shippedAt ? '' : format_date(order.shippedAt)}</div>
							</div>
						</div>
						<div>
							<div className="row ai-c">
								<div className="mv-5px row">
									{order.isDelivered ? (
										<i className="fas fa-check-circle" />
									) : (
										<i className="fas fa-times-circle" />
									)}
								</div>
								<div className="mh-10px">Delivered</div>

								<div>{!order.deliveredAt ? '' : format_date(order.deliveredAt)}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderPublicPage;
