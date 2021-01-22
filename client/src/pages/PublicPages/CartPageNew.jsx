import React, { useState, useEffect } from 'react';
import { addToCart, detailsCart, removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';
const CartPage = (props) => {
	const user_data = props.userInfo;
	// const cart = useSelector((state) => state.cart);

	// const { cart.cartItems } = cart;

	// console.log({ cart.cartItems });
	const pathname = props.match.params.pathname;
	const qty = parseInt(props.location.search ? Number(props.location.search.split('=')[1]) : 1);
	const dispatch = useDispatch();
	const [ no_items_in_cart, set_no_items_in_cart ] = useState('');

	const removeFromCartHandler = (pathname) => {
		dispatch(removeFromCart(pathname));
	};
	// const addToCartHandler = (pathname, qty) => {
	// 	console.log({ pathname, qty });
	// 	dispatch(addToCart(pathname, qty));
	// };

	const cartDetails = useSelector((state) => state.cartDetails);
	const { cart, loading, error } = cartDetails;

	const handleAddToCart = (pathname, qty) => {
		// console.log({ pathname: props.match.params.pathname });
		// console.log({ qty });
		// console.log({ diffuser_cap_color });
		// console.log({ diffuser_cap });
		// if (diffuser_cap) {
		// 	Cookie.set('diffuser_cap', diffuser_cap);
		// }
		// if (diffuser_cap_color) {
		// 	Cookie.set('diffuser_cap_color', diffuser_cap_color);
		// }
		dispatch(addToCart(pathname, qty));
		// props.history.push('/checkout/cart/' + props.match.params.pathname + '?qty=' + qty);
		// props.history.push('/checkout/cart');
	};

	// const diffuser_cap_cookie = Cookie.getJSON('diffuser_cap');
	// const diffuser_cap_color_cookie = Cookie.getJSON('diffuser_cap_color');

	// const [ diffuser_cap, set_diffuser_cap ] = useState({});
	// const [ diffuser_cap_color, set_diffuser_cap_color ] = useState('Black');

	useEffect(
		() => {
			dispatch(detailsCart(user_data.cart));
			// if (pathname) {
			// console.log(cart.cartItems.find((item) => item.pathname === pathname));
			// const same_product = cart.cartItems.find((item) => item.pathname === pathname);
			// if (same_product) {
			// 	dispatch(addToCart(same_product.product, qty + same_product.qty));
			// } else {
			// dispatch(addToCart(pathname, qty));
			// if (diffuser_cap_cookie) {
			// 	set_diffuser_cap(diffuser_cap_cookie);
			// 	console.log({ diffuser_cap_cookie });
			// }
			// if (diffuser_cap_color_cookie) {
			// 	set_diffuser_cap_color(diffuser_cap_color_cookie);
			// 	console.log({ diffuser_cap_color_cookie });
			// }
			// }
			// }
		},
		[ cart.cartItems ]
	);

	useEffect(
		() => {
			// if (pathname) {
			// console.log(cart.cartItems.find((item) => item.pathname === pathname));
			// const same_product = cart.cartItems.find((item) => item.pathname === pathname);
			// if (same_product) {
			// 	dispatch(addToCart(same_product.product, qty + same_product.qty));
			// } else {
			// dispatch(addToCart(pathname, qty));
			// if (diffuser_cap_cookie) {
			// 	set_diffuser_cap(diffuser_cap_cookie);
			// 	// console.log({ diffuser_cap_cookie });
			// }
			// if (diffuser_cap_color_cookie) {
			// 	set_diffuser_cap_color(diffuser_cap_color_cookie);
			// 	// console.log({ diffuser_cap_color_cookie });
			// }
			// }
			// }
		},
		[ props.match.params.pathname ]
	);

	const checkoutHandler = () => {
		if (cart.cartItems.length === 0) {
			set_no_items_in_cart('Cannot proceed to checkout without any items in cart');
		} else {
			props.history.push('/account/login?redirect=/secure/checkout/placeorder');
		}
	};
	const no_adapters_warning = () => {
		const categories = cart.cartItems.map((cartItem) => {
			return cartItem.category;
		});
		const names = cart.cartItems.map((cartItem) => {
			return cartItem.name;
		});
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
						{cart.cartItems.length === 0 ? (
							<div className="column ai-b">
								<div>Cart is empty</div>
							</div>
						) : (
							<div>
								<h4>{no_adapters_warning()}</h4>
								{cart.cartItems.map((item, index) => (
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
														item.category === 'mega_diffuser_caps') &&
														item.diffuser_cap_color}{' '}
													{item.name} {item.diffuser_cap && `w (${item.diffuser_cap.name})`}
													{/* {item.name === 'Diffuser Caps + Adapters Starter Kit' ||
														(item.name === 'Mega Diffuser Caps + Adapters Starter Kit' &&
															` w (${JSON.parse(item.diffuser_cap).name})`)} */}
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
																dispatch(addToCart(item.pathname, e.target.value));
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

				<div className="jc-c cart-action-container">
					<div className="cart-action">
						<h3 className="subtotal_h3">
							Subtotal ( {cart.cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${' '}
							{/* {console.log(
							cart.cartItems
								.reduce((a, c) => (a + c.sale_price !== 0 ? c.sale_price : c.price * c.qty), 0)
								.toFixed(2)
						)} */}
							{cart.cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0 ? (
								cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)
							) : (
								cart.cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0).toFixed(2)
							)}
							{/* {cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)} */}
						</h3>
						<button
							onClick={checkoutHandler}
							className="btn primary w-100per"
							// disabled={cart.cartItems.length === 0}
						>
							Proceed to Checkout
						</button>
					</div>
				</div>
			</div>
			<h4 style={{ textAlign: 'center' }}>{no_items_in_cart}</h4>
			{/* {cart.cartItems.length === 0 && <SuggestedProducts />} */}
			{/* <SuggestedProducts /> */}
			<Carousel />
		</div>
	);
};

export default CartPage;
