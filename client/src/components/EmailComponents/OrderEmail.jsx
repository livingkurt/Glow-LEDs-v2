import React, { useEffect, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { API_Emails } from '../../utils';
import { format_date, toCapitlize } from '../../utils/helper_functions';
import { detailsOrderPublic } from '../../actions/orderActions';
import { email_sale_price_switch } from '../../utils/react_helper_functions';

const OrderEmail = (props) => {
	const history = useHistory();
	const orderDetailsPublic = useSelector((state) => state.orderDetailsPublic);
	const { order } = orderDetailsPublic;

	const emailDetails = useSelector((state) => state.emailDetails);
	const { email } = emailDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listEmails(toCapitlize(props.match.params.status)));
			stableDispatch(detailsOrderPublic(props.match.params.id));
			// stableDispatch(detailsOrder('5fa43d5f248dcacd5d8e2d3f'));
			return () => {};
		},
		[ stableDispatch ]
	);

	useEffect(
		() => {
			const active_email = emails.find((email) => email.active === true);
			if (active_email) {
				stableDispatch(detailsEmail(active_email._id));
			}
			return () => {};
		},
		[ emails, stableDispatch ]
	);

	const determin_card_logo = (card_type) => {
		switch (card_type) {
			case 'amex':
				return 'https://images2.imgbox.com/ea/c8/r82jUQW8_o.png';
			case 'visa':
				return 'https://images2.imgbox.com/18/a3/wHEnyn5x_o.png';
			case 'mastercard':
				return 'https://images2.imgbox.com/84/a2/oPcysx6p_o.png';
			case 'discover':
				return 'https://images2.imgbox.com/f3/4b/R1EL09Rw_o.png';
			default:
				return '';
		}
	};

	const jsx = (
		<body style={{ padding: 0, margin: 0, fontSize: '16px' }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: 'auto',
					fontSize: '16px',
					fontFamily: '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
					color: 'white',
					backgroundColor: '#5f5f5f'
				}}
			>
				<div style={{ backgroundColor: '#333333', padding: '20px' }}>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<table width="100%" style={{ maxWidth: '500px' }}>
							<tr>
								<td>
									<img
										src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png"
										alt="Glow LEDs Logo"
										title="Glow LEDs Logo"
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: '20px'
										}}
									/>
								</td>
							</tr>
						</table>
					</div>
					<h4
						style={{
							textAlign: 'center',
							fontFamily: 'helvetica',
							width: '100%',
							margin: '0 auto',
							lineHeight: '50px',
							color: 'white',
							fontSize: '2em'
						}}
					>
						{email && email.h1}
					</h4>
				</div>
				{order && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column'
						}}
					>
						<div
							style={{
								margin: 'auto',
								maxWidth: '600px',
								width: '100%'
							}}
						>
							<div
								style={{
									maxWidth: '600px',
									lineHeight: '30px',
									margin: '15px',
									display: 'flex',
									flexDirection: 'column'
								}}
							>
								{order.isRefunded ? (
									<h3 style={{ fontFamily: 'helvetica' }}>
										Your Order has been refunded for{' '}
										{order.payment.refund_reason[order.payment.refund_reason.length - 1]} on{' '}
										{format_date(order.refundedAt)}
									</h3>
								) : (
									<p>
										Hi {order.shipping.first_name}, we're getting your order ready to be shipped. We
										will notify you when it has been sent.
									</p>
								)}
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										flexWrap: 'wrap'
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center'
										}}
									>
										<a
											href={
												'https://www.glow-leds.com/account/login?redirect=/secure/account/order/' +
												order._id
											}
											style={{
												backgroundColor: '#4c4f60',
												color: 'white',
												borderRadius: '10px',
												border: 0,
												padding: '15px',
												fontFamily: 'helvetica',
												margin: 0,
												fontWeight: 800,
												fontSize: '1.2em',
												textAlign: 'center',
												textDecoration: 'none !important',
												lineHeight: 'inherit !important'
											}}
										>
											View your Order
										</a>
									</div>
									<div style={{ marginLeft: '20px', width: '20px' }}>or</div>

									<div
										style={{
											display: 'flex',
											justifyContent: 'center'
										}}
									>
										<a
											href="https://www.glow-leds.com/collections/all/products"
											style={{
												color: 'white',
												border: 0,
												padding: '10px',
												fontFamily: 'helvetica',
												margin: 0,
												fontWeight: 800,
												fontSize: '1.2em',
												textAlign: 'center',
												textDecoration: 'none !important',
												lineHeight: 'inherit !important'
											}}
										>
											Visit our Store
										</a>
									</div>
								</div>
								<div style={{ borderBottom: '1px solid #ddd', paddingBottom: '20px' }} />
								<table
									cellPadding={0}
									cellSpacing={0}
									style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
									width="100%"
									align="left"
								>
									<tbody>
										<tr>
											<td colSpan={2} style={{ verticalAlign: 'top' }} valign="top">
												<table
													style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
													width="100%"
													align="left"
												>
													<tbody>
														<tr>
															<td
																style={{
																	verticalAlign: 'top',
																	lineHeight: '45px',
																	color: '#333'
																}}
																valign="top"
															/>
															<td
																style={{
																	verticalAlign: 'top',
																	textAlign: 'right',
																	color: 'white',
																	fontSize: '16px'
																}}
																valign="top"
																align="right"
															>
																<strong>Order #:</strong> {order._id}
																<br />
																<strong>Created:</strong>{' '}
																{order.createdAt && format_date(order.createdAt)}
																<br />
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<h4
											style={{
												fontFamily: 'helvetica',
												width: '100%',
												margin: '0 auto',
												lineHeight: '50px',
												color: 'white',
												fontSize: '25px'
											}}
										>
											Order Summary
										</h4>

										{order.orderItems.map((item, index) => (
											<tr>
												<td
													style={{
														verticalAlign: 'top',
														borderBottom: '1px solid #eee',
														padding: '20px 0',
														color: 'white',
														fontSize: '16px',
														fontWeight: 800
													}}
													key={index}
													valign="top"
												>
													<div style={{ display: 'flex', alignItems: 'center' }}>
														<table width="100%" style={{ maxWidth: '75px' }}>
															<tr>
																<td>
																	<img
																		src={item.display_image}
																		alt={item.name}
																		title="Product Image"
																		style={{
																			textAlign: 'center',
																			width: '100%',
																			borderRadius: '10px'
																		}}
																	/>
																</td>
															</tr>
														</table>
														<div style={{ marginBottom: '1rem', marginLeft: '1rem' }}>
															{item.category === 'diffuser_caps' ||
															item.category === 'mega_diffuser_caps' ||
															item.category === 'frosted_diffusers' ? (
																`${item.diffuser_cap_color} - `
															) : (
																''
															)}
															{item.name} {item.qty > 1 && item.qty + 'x'}
															{item.secondary_product ? (
																` w (${item.secondary_product.name})`
															) : (
																''
															)}
														</div>
													</div>
												</td>
												<td
													style={{
														verticalAlign: 'top',
														textAlign: 'right',
														borderBottom: '1px solid #eee',
														padding: '40px 0',
														color: 'white',
														fontSize: '16px'

														// fontWeight: 800
													}}
													valign="top"
													align="right"
												>
													{/* ${item.price && item.price.toFixed(2)} */}
													{email_sale_price_switch(item, 'white')}
												</td>
											</tr>
										))}
									</tbody>
								</table>

								<table
									style={{ width: '100%', lineHeight: 'inherit', textAlign: 'right', color: 'white' }}
									width="100%"
									align="right"
								>
									<tbody>
										<tr>
											<td
												style={{
													verticalAlign: 'top',
													width: '40%',
													textAlign: 'left',
													color: 'white'
												}}
												valign="top"
											/>
											<td
												style={{
													verticalAlign: 'top',
													width: '30%',
													textAlign: 'left',
													color: 'white',
													fontSize: '16px'
												}}
												valign="top"
											>
												{!order.promo_code && 'Subtotal'}
												{order.promo_code && (
													<del style={{ color: 'red' }}>
														<div style={{ color: 'white' }}>Subtotal</div>
													</del>
												)}
												{order.promo_code && <div>Discount</div>}
												{order.promo_code && <div>New Subtotal</div>}
												{!order.promo_code && <br />}
												Tax
												<br />
												Shipping
												<br />
												<br />
												{!order.isRefunded && <div>Total</div>}
												{order.isRefunded && <div>Total</div>}
												{order.isRefunded && <div>Refund Amount</div>}
												{order.isRefunded && (
													<div style={{ fontWeight: 800, marginTop: '30px' }}>
														New Order Total
													</div>
												)}
											</td>

											<td
												style={{
													verticalAlign: 'top',
													width: '20%',
													color: 'white',
													fontSize: '16px'
												}}
												valign="top"
											>
												${!order.promo_code &&
													(order.orderItems &&
													order.orderItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
														? order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)
														: order.orderItems.reduce(
																(a, c) => a + c.sale_price * c.qty,
																0
															)).toFixed(2)}
												{order.promo_code && (
													<del style={{ color: 'red' }}>
														<label style={{ color: 'white' }}>
															${(order.orderItems &&
															order.orderItems.reduce(
																(a, c) => a + c.sale_price * c.qty,
																0
															) === 0
																? order.orderItems.reduce(
																		(a, c) => a + c.price * c.qty,
																		0
																	)
																: order.orderItems.reduce(
																		(a, c) => a + c.sale_price * c.qty,
																		0
																	)).toFixed(2)}
														</label>
													</del>
												)}
												{!order.promo_code && <br />}
												{order.promo_code && (
													<div>
														-${(order.orderItems.reduce((a, c) => a + c.price * c.qty, 0) -
															order.itemsPrice).toFixed(2)}
													</div>
												)}
												{order.promo_code && <div>${order.itemsPrice.toFixed(2)}</div>}
												${order.taxPrice && order.taxPrice.toFixed(2)}
												<br />
												${order.shippingPrice && order.shippingPrice.toFixed(2)}
												<br />
												<br />
												{/* <div style={{ fontSize: 30, fontWeight: 800, color: 'white' }}>
													${order.totalPrice && order.totalPrice.toFixed(2)}
												</div> */}
												{!order.isRefunded && (
													<div style={{ fontSize: 30, fontWeight: 800, color: 'white' }}>
														${order.totalPrice && order.totalPrice.toFixed(2)}
													</div>
												)}
												{order.isRefunded && (
													<del style={{ color: 'red' }}>
														<label style={{ color: 'white' }}>
															<div>
																${order.totalPrice && order.totalPrice.toFixed(2)}
															</div>
														</label>
													</del>
												)}
												{order.isRefunded && (
													<div>
														-${(order.payment.refund.reduce((a, c) => a + c.amount, 0) /
															100).toFixed(2)}
													</div>
												)}
												{order.isRefunded && (
													<div style={{ fontSize: 30, fontWeight: 800, marginTop: '30px' }}>
														${(order.totalPrice -
															order.payment.refund.reduce((a, c) => a + c.amount, 0) /
																100).toFixed(2)}
													</div>
												)}
											</td>
										</tr>
									</tbody>
								</table>
								<table
									style={{
										width: '100%',
										lineHeight: 'inherit',
										textAlign: 'left',
										borderBottom: '1px white solid'
									}}
									width="100%"
									align="left"
								>
									<tbody>
										<tr>
											<td
												style={{
													verticalAlign: 'top',
													lineHeight: '45px',
													color: '#333',
													padding: 0
												}}
												valign="top"
											/>
											<td
												style={{
													verticalAlign: 'top',
													textAlign: 'left',
													color: 'white',
													fontSize: '16px'
												}}
												valign="top"
												align="right"
											>
												<strong>Promo Code:</strong>{' '}
												{order.promo_code && order.promo_code.toUpperCase()}
												<br />
												<strong>Order Note:</strong> {order.order_note}
												<br />
											</td>
										</tr>
									</tbody>
								</table>
								<div
									style={{
										verticalAlign: 'top',
										width: '40%',
										color: 'white',
										textAlign: 'right'
									}}
									valign="top"
									align="right"
								/>
								<table
									cellPadding={0}
									cellSpacing={0}
									style={{
										width: '100%',
										lineHeight: 'inherit',
										color: 'white',
										textAlign: 'left',
										borderBottom: '1px white solid'
									}}
									width="100%"
									align="left"
								>
									<tbody>
										<tr
											style={{
												display: 'flex',
												flexWrap: 'wrap',
												border: 0
											}}
										>
											<td
												style={{ verticalAlign: 'top', width: '50%', maxWidth: '320px' }}
												valign="top"
											>
												<table
													style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
													width="100%"
													align="left"
												>
													<tbody>
														<tr>
															<td
																style={{ verticalAlign: 'top', width: '50%' }}
																valign="top"
															>
																<h4
																	style={{
																		fontFamily: 'helvetica',
																		width: '100%',
																		margin: '0 auto',
																		lineHeight: '50px',
																		color: 'white',
																		fontSize: '20px'
																	}}
																>
																	Customer Information
																</h4>
															</td>
														</tr>
														<tr>
															<td
																style={{ verticalAlign: 'top', width: '50%' }}
																valign="top"
															>
																<h4
																	style={{
																		fontFamily: 'helvetica',
																		width: '100%',
																		margin: '0 auto',
																		// lineHeight: '20px',
																		color: 'white',
																		fontSize: '18px',
																		padding: '10px 0 '
																	}}
																>
																	Shipping Address
																</h4>
															</td>
														</tr>
														<tr>
															<td
																style={{
																	verticalAlign: 'top',
																	width: '50%',
																	color: 'white',
																	fontSize: '16px'
																}}
																valign="top"
															>
																{order.shipping.first_name} {order.shipping.last_name}
																<br />
																{order.shipping.address_1} {order.shipping.address_2}
																<br />
																{order.shipping.city}, {order.shipping.state}{' '}
																{order.shipping.postalCode}
																<br />
																<a
																	href="#"
																	style={{
																		textDecoration: 'none !important',
																		fontSize: 'inherit !important',
																		fontFamily: 'inherit !important',
																		fontWeight: 'inherit !important',
																		lineHeight: 'inherit !important',
																		color: 'inherit !important;'
																	}}
																>
																	{order.shipping.email}
																</a>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
											<td style={{ verticalAlign: 'top' }} valign="top">
												<table
													style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
													width="100%"
													align="left"
												>
													<tbody>
														<tr>
															<td style={{ verticalAlign: 'top' }} valign="top">
																<h4
																	style={{
																		fontFamily: 'helvetica',
																		width: '100%',
																		margin: '0 auto',
																		// lineHeight: '20px',
																		color: 'white',
																		padding: '10px 0',
																		marginTop: '50px',
																		fontSize: '18px'
																	}}
																>
																	Payment Method
																</h4>
															</td>
														</tr>
														<tr>
															<td
																style={{ verticalAlign: 'top', color: 'white' }}
																valign="top"
															>
																<div
																	style={{
																		padding: '5px',
																		verticalAlign: 'top',
																		textAlign: 'right',
																		width: '100%',
																		color: 'white',
																		display: 'flex',
																		alignItems: 'center',
																		fontSize: '16px'
																	}}
																>
																	<div
																		style={{
																			fontSize: '40px',
																			marginRight: '11px',
																			color: 'white'
																		}}
																	>
																		{order.payment.payment ? (
																			<img
																				src={determin_card_logo(
																					order.payment.payment.card.brand
																				)}
																				style={{ height: '25px' }}
																				alt="card_logo"
																			/>
																		) : (
																			''
																		)}{' '}
																	</div>
																	{/* {console.log(order.payment.payment && order.payment.payment.card)} */}
																	ending with{' '}
																	{order.payment.payment ? order.payment.payment.card.last4 : ''}{' '}
																	<div style={{ margin: '0 10px', color: 'white' }}>-</div>
																	<div
																		style={{
																			padding: '5px',
																			verticalAlign: 'top',
																			// textAlign: 'right',
																			fontWeight: 'bold',
																			color: 'white'
																		}}
																		valign="top"
																		align="right"
																	>
																		${order.totalPrice && order.totalPrice.toFixed(2)}
																	</div>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div style={{ marginBottom: '20px' }}>
								<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
									<strong>Tag us in your videos and pictures!</strong>
									<br />We want to feature you!
								</p>
								<a
									href="https://www.glow-leds.com/pages/contact/submit_content_to_be_featured"
									target="_blank"
									rel="noopener noreferrer"
								>
									{/* <i className="fab fa-facebook zoom" style={{ color: 'white' }} /> */}
									{/* <Facebook fill="white" /> */}
									<div style={{ display: 'flex', justifyContent: 'center' }}>
										<a
											href={
												'https://www.glow-leds.com/pages/contact/submit_content_to_be_featured'
											}
											style={{
												backgroundColor: '#4c4f60',
												color: 'white',
												borderRadius: '10px',
												border: 0,
												padding: '15px',
												fontFamily: 'helvetica',
												margin: 0,
												fontWeight: 800,
												fontSize: '1em',
												textAlign: 'center',
												textDecoration: 'none !important',
												lineHeight: 'inherit !important'
											}}
										>
											Feature Content
										</a>
									</div>
								</a>
								<p style={{ textAlign: 'center', fontSize: '14px' }}>
									We are figuring this out as we go so any feedback is welcome.<br />We appreciate you
									more than you know.
								</p>
								<p style={{ textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}>
									<strong>Questions or concerns?:</strong>{' '}
									<a
										href="#"
										style={{
											textDecoration: 'none !important',
											fontSize: 'inherit !important',
											fontFamily: 'inherit !important',
											fontWeight: 'inherit !important',
											lineHeight: 'inherit !important',
											color: 'inherit !important;'
										}}
									>
										info.glowleds@gmail.com
									</a>
								</p>
							</div>
						</div>

						<div style={{ backgroundColor: '#333333', padding: '20px', paddingTop: 10 }}>
							<div
								style={{
									marginLeft: '10px',
									display: 'flex',
									justifyContent: 'space-between',
									maxWidth: '250px',
									width: '100%',
									margin: '0 auto',
									color: 'white',
									alignItems: 'center'
								}}
							>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.facebook.com/Glow-LEDscom-100365571740684"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-facebook zoom" style={{ color: 'white' }} /> */}
										{/* <Facebook fill="white" /> */}
										<img
											src="https://images2.imgbox.com/9b/a0/XAC4qmRL_o.png"
											style={{ height: '25px' }}
											alt="Facebook"
											title="Facebook Logo"
										/>
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.instagram.com/glow_leds/"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-instagram zoom" style={{ color: 'white' }} /> */}
										<img
											src="https://images2.imgbox.com/d2/77/vuk6FOeW_o.png"
											style={{ height: '25px' }}
											alt="Instagram"
											title="Instagram Logo"
										/>
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-youtube zoom" style={{ color: 'white' }} /> */}
										<img
											src="https://images2.imgbox.com/c9/83/3Z0OwK1r_o.png"
											style={{ height: '20px' }}
											alt="Youtube"
											title="Youtube Logo"
										/>
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://soundcloud.com/ntre/tracks"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-soundcloud" style={{ color: 'white' }} /> */}
										<img
											src="https://images2.imgbox.com/ed/d9/eyAcj7D2_o.png"
											style={{ height: '20px' }}
											alt="Soundcloud"
											title="Soundcloud Logo"
										/>
									</a>
								</div>
							</div>
							<div
								style={{
									borderBottom: '1px white solid',
									maxWidth: '600px',
									width: '100%',
									margin: '15px auto'
								}}
							/>
							{/* <p style={{ textAlign: 'center' }}>Copyright © 2020 Throwlights, Inc., All rights reserved.</p> */}
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								Our mailing address is: <br />404 Kenniston Dr Apt D, Austin, TX 78752{' '}
							</p>
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								Want to change how you receive these emails? <br /> You can{' '}
								<a
									href="https://www.glow-leds.com/account/login?redirect=/secure/account/editprofile"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									update your preferences
								</a>{' '}
								or{' '}
								<a
									href="https://www.glow-leds.com/account/login?redirect=/secure/account/editprofile"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									unsubscribe{' '}
								</a>
								from this list.
							</p>
						</div>
					</div>
				)}
			</div>
		</body>
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const send_order_email = async (email, first_name, subject, refunded) => {
		console.log({ email_template });
		const { data } = await API_Emails.send_order_email(email_template, subject, email);
		const { data: request } = await API_Emails.send_order_created_email(
			email_template,
			refunded ? 'Order Refunded for ' + first_name : 'New Order Created by ' + first_name
		);
		console.log({ data });
		console.log({ request });
	};

	useEffect(
		() => {
			if (props.match.params.send === 'true' && order) {
				console.log({ 'props.match.params.send === true && order': order });
				if (order.orderItems.length > 0) {
					console.log({ 'order.orderItems.length > 0': order });
					send_order_email(order.shipping.email, order.shipping.first_name, 'Your Glow LEDS Order');
				}
			}

			return () => {};
		},
		[ order ]
	);

	return (
		<div>
			{userInfo ? (
				<div className="jc-c m-auto wrap">
					<Link to={'/secure/account/order/' + props.match.params.id}>
						<button className="btn primary mh-10px">View Order</button>
					</Link>
					<Link to="/secure/account/orders">
						<button className="btn primary mh-10px">Your Orders</button>
					</Link>
					<Link to="/collections/all/products">
						<button className="btn primary mh-10px">Products</button>
					</Link>
				</div>
			) : (
				<div className="w-1000px jc-c m-auto">
					<Link to={'/checkout/order/' + props.match.params.id}>
						<button className="btn primary">View Order</button>
					</Link>
					<Link to="/collections/all/products">
						<button className="btn primary mh-10px">Products</button>
					</Link>
					<Link to="/pages/featured">
						<button className="btn primary mh-10px">Featured Videos</button>
					</Link>
					<Link to="/pages/music">
						<button className="btn primary mh-10px">NTRE Music</button>
					</Link>
					{/* <Link to="/account/register">
						<button className="btn primary mh-10px">Create Account</button>
					</Link> */}
				</div>
			)}
			<div className="jc-c">
				<p className="max-w-600px mv-2rem">
					{' '}
					Make sure to check your spam folder for the confirmation email. If you do not recieve a confirmation
					email please contact support.
				</p>
			</div>
			{userInfo &&
			userInfo.isAdmin && (
				<div className="jc-b mb-1rem">
					<Link to="/secure/glow/emails">
						<button className="btn primary mh-10px">Back to Emails</button>
					</Link>
					<Link to="/secure/glow/orders">
						<button className="btn primary mh-10px">Back to Orders</button>
					</Link>

					<button
						className="btn primary mb-1rem"
						onClick={() => send_order_email('lavacquek@icloud.com', 'Kurt', email.h2, order.isRefunded)}
					>
						Send Test Email
					</button>
					<button
						className="btn primary mb-1rem"
						onClick={() =>
							send_order_email(
								order.shipping.email,
								order.shipping.first_name,
								email.h2,
								order.isRefunded
							)}
					>
						Send Order Email
					</button>
					{/* <button className="btn primary mb-1rem" onClick={() => send_order_email()}>
					Send Order Email
				</button> */}
					{/* <Loading loading={loading_email} /> */}
				</div>
			)}
			{jsx}
		</div>
	);
};

export default OrderEmail;
