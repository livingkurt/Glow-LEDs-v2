import React, { useState } from 'react';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';

const CartPage = (props) => {
	// const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();
	const [ no_items_in_cart, set_no_items_in_cart ] = useState('');

	const removeFromCartHandler = (pathname) => {
		dispatch(removeFromCart(pathname));
	};

	const checkoutHandler = () => {
		if (cartItems.length === 0) {
			set_no_items_in_cart('Cannot proceed to checkout without any items in cart');
		} else {
			if (userInfo) {
				props.history.push('/account/login?redirect=/secure/checkout/placeorder');
			} else {
				props.history.push('/checkout/decision');
			}
		}
	};

	const decide_warning = () => {
		if (new Date() > new Date('2020-12-17') && new Date() < new Date('2021-01-02')) {
			const confirm = window.confirm(
				'Glow LEDs will be out of office from 12/18/20 - 1/2/21. Orders will not be shipped until after January 2nd 2021'
			);
			if (confirm) {
				checkoutHandler();
			}
		} else {
			checkoutHandler();
		}
	};
	const no_adapters_warning = () => {
		const categories = cartItems.map((cartItem) => {
			return cartItem.category;
		});
		// const names = cartItems.map((cartItem) => {
		// 	return cartItem.name;
		// });
		if (
			!categories.includes('Custom Diffuser Caps Final Payment') ||
			!categories.includes('Custom Diffuser Caps Deposit')
		) {
			if (categories.includes('diffuser_caps')) {
				// console.log('Caps');
				if (!categories.includes('diffuser_adapters')) {
					return "Don't Forget: You'll need a set of Diffuser Adapters to use Diffuser Caps!";
				}
			}
		}
	};

	return (
		<div className="column">
			<Helmet>
				<title>Cart | Glow LEDs </title>
				<meta property="og:title" content="Cart" />
				<meta name="twitter:title" content="Cart" />
				<link rel="canonical" href="https://www.glow-leds.com/checkout/cart " />
				<meta property="og:url" content="https://www.glow-leds.com/checkout/cart" />
			</Helmet>
			<div className="cart">
				<div className="cart-list">
					<ul className="cart-list-container" style={{ marginRight: '10px' }}>
						<li>
							<h2>Shopping Cart</h2>
							<div>Price</div>
						</li>
						{cartItems.length === 0 ? (
							<div className="column ai-b">
								<div>Cart is empty</div>
							</div>
						) : (
							<div>
								<h4>{no_adapters_warning()}</h4>
								{cartItems.map((item, index) => (
									<li key={index}>
										{/* {console.log({ item })} */}
										<div className="cart-image">
											<Link to={'/collections/all/products/' + item.pathname}>
												<img src={item.display_image} alt={item.name} title="Product Image" />
											</Link>
										</div>
										<div className="cart-name">
											<div className="mb-10px">
												<Link to={'/collections/all/products/' + item.pathname}>
													{(item.category === 'diffuser_caps' ||
														item.category === 'mega_diffuser_caps' ||
														item.category === 'frosted_diffusers') &&
														item.diffuser_cap_color}{' '}
													{item.name} {item.diffuser_cap && `w (${item.diffuser_cap.name})`}
												</Link>
											</div>
											<div>
												<div className="ai-c h-25px">
													<label
														aria-label="sortOrder"
														htmlFor="sortOrder"
														className="select-label mr-1rem"
													>
														Qty:
													</label>
													<div className="custom-select">
														<select
															defaultValue={item.qty}
															className="qty_select_dropdown"
															onChange={(e) => {
																dispatch(
																	addToCart(
																		item.pathname,
																		e.target.value,
																		item.diffuser_cap_color &&
																			item.diffuser_cap_color,
																		item.diffuser_cap && item.diffuser_cap.name
																	)
																);
															}}
														>
															{[ ...Array(item.countInStock).keys() ].map((x) => (
																<option key={x + 1} defaultValue={parseInt(x + 1)}>
																	{parseInt(x + 1)}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											</div>
										</div>

										<div className="column">
											<div className="cart-price">
												{item.sale_price !== 0 ? (
													<label>
														<del style={{ color: 'red' }}>
															<label style={{ color: 'white' }}>
																${item.price ? item.price.toFixed(2) : item.price}
															</label>
														</del>{' '}
														<i class="fas fa-arrow-right" /> ${item.sale_price ? item.sale_price.toFixed(2) : item.sale_price}{' '}
														On Sale!
													</label>
												) : (
													<label>${item.price ? item.price.toFixed(2) : item.price}</label>
												)}
											</div>
											<div style={{ textAlign: 'right', width: '100%' }}>
												<button
													className="btn icon"
													onClick={() => removeFromCartHandler(item.pathname)}
												>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</div>
									</li>
								))}
							</div>
						)}
					</ul>
				</div>

				<div className="cart-action-container jc-c">
					<div className="cart-action">
						<h3 className="subtotal_h3">
							Subtotal ( {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${' '}
							{cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0 ? (
								cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)
							) : (
								cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0).toFixed(2)
							)}
						</h3>
						<button onClick={decide_warning} className="btn primary w-100per">
							Proceed to Checkout
						</button>
					</div>
				</div>
			</div>
			<h4 style={{ textAlign: 'center' }}>{no_items_in_cart}</h4>
			<Carousel />
		</div>
	);
};

export default CartPage;
