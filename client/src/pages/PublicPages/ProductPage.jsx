import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../../actions/productActions';
import { Rating, Reviews, Slideshow, RelatedProducts } from '../../components/SpecialtyComponents';
import { Loading } from '../../components/UtilityComponents';
import Cookie from 'js-cookie';
import { Helmet } from 'react-helmet';
import { API_Products } from '../../utils';
import { addToCart } from '../../actions/cartActions';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	let { userInfo } = userLogin;

	const [ qty, setQty ] = useState(1);
	const [ original_diffuser_caps, set_original_diffuser_caps ] = useState([]);
	const [ mega_diffuser_caps, set_mega_diffuser_caps ] = useState([]);
	const [ diffuser_caps, set_diffuser_caps ] = useState([]);
	const [ diffuser_cap, set_diffuser_cap ] = useState('');
	const [ diffuser_cap_name, set_diffuser_cap_name ] = useState('');
	const [ image, set_image ] = useState('');
	const [ diffuser_cap_color, set_diffuser_cap_color ] = useState('');
	const productDetails = useSelector((state) => state.productDetails);
	// console.log({ diffuser_cap });

	const { product, loading, error } = productDetails;

	const diffuser_cap_cookie = Cookie.getJSON('diffuser_cap');

	// const productList = useSelector((state) => state.productList);
	// const { products, loading: loading_products, error: error_products } = productList;
	// console.log({ products });

	const dispatch = useDispatch();

	// const filament_colors = [ 'Black', 'White', 'Red', 'Green', 'Blue', 'Violet', 'Purple' ];

	const diffuser_colors = [ 'Black', 'White', 'Red', 'Green', 'Blue', 'Violet', 'Purple' ];
	const diffuser_cap_colors = [ 'Translucent White', 'Red', 'Green', 'Blue', 'Violet', 'Purple' ];
	const determine_colors = () => {
		if (product.category === 'frosted_diffusers' || product.subcategory === 'diffuser_adapters') {
			return diffuser_cap_colors;
		} else if (product.category === 'diffuser_caps' || product.category === 'mega_diffuser_caps') {
			return diffuser_colors;
		}
	};

	useEffect(() => {
		dispatch(detailsProduct(props.match.params.pathname));
		const video = document.getElementsByClassName('product_video');
		video.muted = true;
		video.autoplay = true;
		// dispatch(listProducts(''));
		get_original_diffuser_caps();
		get_mega_diffuser_caps();

		// if (diffuser_cap_cookie) {
		// 	set_diffuser_cap(diffuser_cap_cookie);
		// 	console.log({ diffuser_cap_cookie });
		// }
	}, []);

	const get_original_diffuser_caps = async () => {
		const { data } = await API_Products.get_original_diffuser_caps();
		// console.log(data);
		set_original_diffuser_caps(data);
		// set_diffuser_caps(data);
	};
	const get_mega_diffuser_caps = async () => {
		const { data } = await API_Products.get_mega_diffuser_caps();
		// console.log(data);
		set_mega_diffuser_caps(data);
		// set_diffuser_caps(data);
	};

	useEffect(
		() => {
			if (product) {
				set_image(product.images && product.images[0]);
				set_diffuser_cap_color(
					product.category === 'frosted_diffusers' || product.subcategory === 'diffuser_adapters'
						? 'Translucent White'
						: product.category === 'diffuser_caps' || product.category === 'mega_diffuser_caps'
							? 'Black'
							: ''
				);
			}
		},
		[ product ]
	);

	useEffect(
		() => {
			if (error) {
				props.history.push('/collections/all/products');
			}
		},
		[ error ]
	);

	const handleAddToCart = () => {
		dispatch(addToCart(props.match.params.pathname, qty, diffuser_cap_color, diffuser_cap));
		props.history.push('/checkout/cart');
	};

	// const filament_colors = [ 'Black' ];

	const handle_diffuser_cap_change = (e) => {
		set_diffuser_cap(JSON.parse(e.target.value));
		console.log(JSON.parse(e.target.value).pathname);
		set_diffuser_cap_name(JSON.parse(e.target.value).pathname);
	};

	return (
		<div className="column">
			<div className="back-to-result">
				<div className="jc-b">
					<div className="mb-10px">
						<button class="btn secondary" onClick={() => props.history.goBack()}>
							Back to Products
						</button>
					</div>
					{userInfo &&
					userInfo.isAdmin && (
						<Link to={'/secure/glow/editproduct/' + props.match.params.pathname}>
							<button className="btn secondary" style={{ width: '156px' }}>
								Edit Product
							</button>
						</Link>
					)}
				</div>
			</div>
			<Loading loading={loading} error={error}>
				{product && (
					<div className="column">
						<Helmet>
							<title>{product.meta_title + ' | Glow LEDs'}</title>
							<meta property="og:title" content={product.meta_title} />
							<meta name="twitter:title" content={product.meta_title} />
							<link
								rel="canonical"
								href={'https://www.glow-leds.com/collections/all/products/' + product.pathname}
							/>
							<meta
								property="og:url"
								content={'https://www.glow-leds.com/collections/all/products/' + product.pathname}
							/>
							{product.images && (
								<div>
									<meta
										property="og:image"
										content={'https://www.glow-leds.com/' + product.images[0]}
									/>

									<meta
										property="og:image:secure_url"
										content={'https://www.glow-leds.com/' + product.images[0]}
									/>
									<meta
										name="twitter:image"
										content={'https://www.glow-leds.com/' + product.images[0]}
									/>
								</div>
							)}
							<meta
								name="description"
								content={
									product.meta_description ? (
										product.meta_description
									) : (
										'Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings.'
									)
								}
							/>

							<meta
								property="og:description"
								content={
									product.meta_description ? (
										product.meta_description
									) : (
										'Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings.'
									)
								}
							/>

							<meta
								name="twitter:description"
								content={
									product.meta_description ? (
										product.meta_description
									) : (
										'Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings.'
									)
								}
							/>
						</Helmet>
						<div className="details">
							<div className="column">
								<label className="product_title_top none fs-2em ff-h mb-2rem">{product.name}</label>
								<div className="details-image">
									<Zoom>
										<img
											id="expandedImg"
											alt="Product Image"
											title={product.name}
											className="details-image-img"
											src={image}
											style={{
												maxWidth: '400px',
												maxHeight: '400px',
												height: '100%',
												width: '100%'
											}}
										/>
									</Zoom>
								</div>
							</div>
							<Slideshow product={product} show_hide="alt_pictures_shown_shown" />
							<div className="details-info">
								<h1 class="product_title_side" styles={{ display: 'flex' }}>
									{product.name}
								</h1>
								<div style={{ marginBottom: '15px', marginTop: '-9px' }}>
									<a href="#reviews">
										<Rating value={product.rating} text={product.numReviews + ' reviews'} />
									</a>
								</div>

								{product.name === 'Custom Infinity Mirror' ? (
									<h3 style={{ margin: 0, marginRight: 5 }}>
										Price: $549.99 - $<i class="fas fa-arrow-up" />
									</h3>
								) : (
									<div className="row">
										<h3 style={{ margin: 0, marginRight: 5 }}>Price: </h3>
										{product.sale_price !== 0 ? (
											<label>
												<del style={{ color: 'red' }}>
													<label style={{ color: 'white' }}>
														${product.price ? product.price.toFixed(2) : product.price}
													</label>
												</del>{' '}
												<i class="fas fa-arrow-right" /> ${product.sale_price ? product.sale_price.toFixed(2) : product.sale_price}{' '}
												On Sale!
											</label>
										) : (
											<label>${product.price ? product.price.toFixed(2) : product.price}</label>
										)}
									</div>
								)}

								<div className="column">
									<div className="column h-100per paragraph_font">
										<ul style={{ marginLeft: '10px' }}>
											{product.facts ? (
												product.facts.split('\n').map((line, index) => {
													return (
														<li
															key={index}
															style={{ listStyleType: 'disc' }}
															className="lh-2rem"
														>
															{line}
														</li>
													);
												})
											) : (
												product.facts
											)}
										</ul>
									</div>
								</div>
								<Slideshow product={product} show_hide="alt_pictures_hidden" set_image={set_image} />
							</div>
							<div className="details-action">
								<ul>
									{product.name === 'Custom Infinity Mirror' ? (
										<label style={{ margin: 0, marginRight: 5 }}>
											Price: $549.99 - $<i class="fas fa-arrow-up" />
										</label>
									) : (
										<div className="row">
											<label style={{ margin: 0, marginRight: 5 }}>Price: </label>
											{product.sale_price !== 0 ? (
												<label>
													<del style={{ color: 'red' }}>
														<label style={{ color: 'white' }}>
															${product.price ? product.price.toFixed(2) : product.price}
														</label>
													</del>{' '}
													<i class="fas fa-arrow-right" /> ${product.sale_price ? product.sale_price.toFixed(2) : product.sale_price}{' '}
													On Sale!
												</label>
											) : (
												<label>
													${product.price ? product.price.toFixed(2) : product.price}
												</label>
											)}
										</div>
									)}
									<li>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</li>
									<li>
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
													defaultValue={qty}
													className="qty_select_dropdown"
													onChange={(e) => {
														setQty(e.target.value);
													}}
												>
													{[ ...Array(product.countInStock).keys() ].map((x) => (
														<option key={x + 1} defaultValue={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>

										<h4 style={{ marginBottom: 0, marginTop: 11 }}>
											Shipping Calculated at Checkout
										</h4>
									</li>
									{(product.name === 'Diffuser Caps + Adapters Starter Kit' && (
										<li>
											<div className="ai-c h-25px mb-15px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													Caps:
												</label>
												<div className="custom-select">
													<select
														defaultValue={diffuser_cap_name}
														// value={diffuser_cap_name}
														className="qty_select_dropdown"
														onChange={(e) => set_diffuser_cap(JSON.parse(e.target.value))}
													>
														<option key={1} defaultValue="">
															---Choose Cap---
														</option>
														{original_diffuser_caps.map(
															(cap, index) =>
																cap.name === 'Custom Diffuser Caps Deposit' ||
																cap.name === 'Diffuser Caps + Adapters Starter Kit' ? (
																	''
																) : (
																	<option key={index} value={JSON.stringify(cap)}>
																		{cap.name.slice(0, -14)}
																	</option>
																)
														)}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)) ||
										(product.name === 'Mega Diffuser Caps + Adapters Starter Kit' && (
											<li>
												<div className="ai-c h-25px mb-15px">
													<label
														aria-label="sortOrder"
														htmlFor="sortOrder"
														className="select-label mr-1rem"
													>
														Caps:
													</label>
													{console.log({ diffuser_cap })}
													<div className="custom-select">
														<select
															defaultValue={diffuser_cap_name}
															// value={diffuser_cap_name}
															className="qty_select_dropdown"
															onChange={(e) =>
																set_diffuser_cap(JSON.parse(e.target.value))}
														>
															<option key={1} defaultValue="">
																---Choose Cap---
															</option>
															{mega_diffuser_caps.map(
																(cap, index) =>
																	cap.name === 'Custom Mega Diffuser Caps Deposit' ||
																	cap.name ===
																		'Mega Diffuser Caps + Adapters Starter Kit' ? (
																		''
																	) : (
																		<option key={index} value={JSON.stringify(cap)}>
																			{cap.name.slice(0, -14)}
																		</option>
																	)
															)}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											</li>
										))}
									{(product.category === 'diffuser_caps' ||
										product.category === 'mega_diffuser_caps' ||
										product.category === 'frosted_diffusers') && (
										<li>
											<div className="ai-c h-25px mb-15px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													Color:
												</label>
												<div className="custom-select">
													<select
														defaultValue={diffuser_cap_color}
														value={diffuser_cap_color}
														className="qty_select_dropdown"
														onChange={(e) => {
															set_diffuser_cap_color(e.target.value);
														}}
													>
														{determine_colors().map((color, index) => (
															<option key={index} value={color}>
																{color}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)}
									{(product.name === 'Diffuser Caps + Adapters Starter Kit' ||
										product.name === 'Mega Diffuser Caps + Adapters Starter Kit') &&
									!diffuser_cap ? (
										<div />
									) : product.name === 'Custom Infinity Mirror' ? (
										<Link to="/pages/contact/custom_orders">
											<button className="btn primary w-100per">Contact</button>
										</Link>
									) : (
										<li>
											{product.countInStock > 0 && !product.hidden ? (
												<button className="btn primary" onClick={handleAddToCart}>
													Add to Cart
												</button>
											) : (
												<button className="btn inactive">Out of Stock</button>
											)}
										</li>
									)}
								</ul>
							</div>
						</div>
						<Slideshow product={product} show_hide="alt_pictures_shown" set_image={set_image} />
						<div className="column p-1rem">
							<h2 style={{ margin: '0px', marginRight: 5 }}> Description: </h2>
							<p className="paragraph_font">{product.description}</p>
							{product.category === 'glow_strings' && (
								<Link to="/Glow_Strings_Manual.pdf" target="_blank" download>
									<button className="btn primary w-100per fs-20px mb-2rem">
										Download Glow Strings Manual
									</button>
								</Link>
							)}
							{!product.product_length && (
								<div className="column">
									<h2 style={{ margin: '0px', marginRight: 5 }}> Included Items: </h2>
									<div className="column h-100per paragraph_font">
										<ul style={{ marginLeft: '10px' }}>
											{product.included_items ? (
												product.included_items.split('\n').map((line, index) => {
													return (
														<li
															key={index}
															className="paragraph_font"
															style={{ listStyleType: 'disc' }}
														>
															{line}
														</li>
													);
												})
											) : (
												product.included_items
											)}
										</ul>
									</div>
								</div>
							)}
							{product.product_length && (
								<div className="jc-a wrap">
									<div className="column">
										<h2 style={{ margin: '0px', marginRight: 5 }}> Included Items: </h2>
										<div className="column h-100per paragraph_font">
											<ul style={{ marginLeft: '10px' }}>
												{product.included_items ? (
													product.included_items.split('\n').map((line, index) => {
														return (
															<li
																key={index}
																className="paragraph_font"
																style={{ listStyleType: 'disc' }}
															>
																{line}
															</li>
														);
													})
												) : (
													product.included_items
												)}
											</ul>
										</div>
									</div>

									<div className="column">
										<h2 style={{ margin: '0px', marginRight: 5 }}> Product Dimensions: </h2>
										<div className="column h-100per paragraph_font mt-2rem">
											{product.name === 'Coin Battery Storage' ? (
												`${product.product_length} cm x ${product.product_width} cm x
											${product.product_height} cm`
											) : (
												`${product.product_length} mm x ${product.product_width} mm x
											${product.product_height} mm`
											)}
										</div>
									</div>
								</div>
							)}
						</div>
						{(product.category === 'diffuser_caps' || product.category === 'mega_diffuser_caps') && (
							<div className=" m-2rem  h-auto m-auto jc-c">
								<Zoom className="m-auto">
									<img
										className="max-w-800px w-100per h-auto"
										src="https://images2.imgbox.com/af/ba/QWR9I16I_o.png"
										alt="Graphic Timeline"
										title="Diffuser Cap and Mega Diffuser Cap Name Change Timeline"
									/>
								</Zoom>
							</div>
						)}

						<div className="column p-1rem">
							{/* {product.category === 'glowskins' && (
								<a href="/pages/faq#glowskins_chip_brand_compatibility" className="mb-3rem">
									<div className="jc-c">
										<button className="btn primary" style={{ margin: 'auto' }}>
											Glowskins Microlight Compatibility
										</button>
									</div>
								</a>
							)} */}
							{product.category === 'glowskins' && (
								<Zoom>
									<img
										className="colored_caps_images"
										src="https://images2.imgbox.com/d2/67/qjRp33SP_o.png"
										alt="Glowskins Chip Compatibility"
										title="Glowskins Chip Compatibility"
									/>
								</Zoom>
							)}

							{(product.category === 'diffuser_caps' || product.category === 'mega_diffuser_caps') && (
								<div>
									<h2 className="ta-c">Get your favorite caps in all of these new colors</h2>
									<div className="colored_caps">
										<div className="column colored_caps_item m-1rem">
											<h3 className="colored_caps_images">Colored Caps</h3>
											<Zoom>
												<img
													className="colored_caps_images"
													src="/images/optimized_images/product_page_images/img_2298_cropped_optimized.jpg"
													alt="Colored Caps"
													title="Colored Caps"
												/>
											</Zoom>
										</div>
										<div className="column colored_caps_item m-1rem">
											<h3 className="colored_caps_images">Colored Caps Under Blacklight</h3>
											<Zoom>
												<img
													className="colored_caps_images"
													src="/images/optimized_images/product_page_images/img_2331_cropped_optimized.jpg"
													alt="Colored Caps Under Blacklight"
													title="Colored Caps Under Blacklight"
												/>
											</Zoom>
										</div>
									</div>
								</div>
							)}
							{!product.video ? (
								<h2
									style={{
										textAlign: 'center',
										width: '100%',
										justifyContent: 'center'
									}}
								>
									Video Coming Soon!
								</h2>
							) : (
								<div className="jc-c column m-0px">
									<h2
										style={{
											textAlign: 'center',
											width: '100%',
											justifyContent: 'center'
										}}
									>
										Watch the Video Below to Learn More
									</h2>
									{/* <video
										className="product_video"
										style={{ height: 'auto', maxWidth: '100%', borderRadius: '20px' }}
										controls
										poster={product.display_image}
									>
										<source src={product.video} type="video/mp4" />
									</video> */}
									<div className="iframe-container">
										<iframe
											width="996"
											height="560"
											style={{ borderRadius: '20px' }}
											src={`https://www.youtube.com/embed/${product.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
											frameborder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen="1"
										/>
									</div>
								</div>
							)}
						</div>
						<div className="content-margined">
							<h2
								style={{
									textAlign: 'center',
									width: '100%',
									justifyContent: 'center'
								}}
							>
								Reviews
							</h2>
							{!product.reviews.length && (
								<div style={{ marginBottom: '10px' }}>Be the First to Review this Product</div>
							)}
							<Reviews product={product} pathname={props.match.params.pathname} />
						</div>
					</div>
				)}
			</Loading>
			<RelatedProducts product={product} product_pathname={props.match.params.pathname} />
			{/* <RelatedCarousel
				product={product}
				product_category={product && product.category}
				product_pathname={props.match.params.pathname}
			/> */}
		</div>
	);
};
export default ProductPage;
