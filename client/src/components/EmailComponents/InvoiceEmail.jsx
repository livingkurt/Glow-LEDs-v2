import React, { useEffect, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { format_date } from '../../utils/helper_functions';
import { detailsOrder } from '../../actions/orderActions';
import { email_sale_price_switch } from '../../utils/react_helper_functions';

const InvoiceEmail = (props) => {
	const history = useHistory();
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order } = orderDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	console.log({ emails });

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listEmails('Invoice'));
			stableDispatch(detailsOrder(props.match.params.id || '5fa43d5f248dcacd5d8e2d3f'));
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
				return 'https://thumbs2.imgbox.com/c9/a5/0AsOySyq_b.png';
			case 'visa':
				return 'https://images2.imgbox.com/73/a0/efpzYR25_o.png';
			case 'mastercard':
				return 'https://images2.imgbox.com/63/92/Z3KHgTl4_o.png';
			case 'discover':
				return 'https://images2.imgbox.com/96/cd/hXyv0MRB_o.png';
		}
	};

	const jsx = (
		<body
			id="invoice"
			style={{ padding: 0, margin: 0, fontSize: '8px', backgroundColor: 'transparent', zoom: '200%' }}
		>
			{order && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						maxWidth: '300px',
						margin: 'auto',
						fontSize: '8px',
						fontFamily: "'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif",
						color: 'black',
						backgroundColor: 'white'
					}}
				>
					<table
						cellpadding="0"
						cellspacing="0"
						style={{ fontSize: '8px', width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
						width="100%"
						align="left"
					>
						<tr>
							<td colspan="2" style={{ fontSize: '8px', padding: 0 }} valign="top">
								<table
									style={{ fontSize: '8px', width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
									width="100%"
									align="left"
								>
									<tr>
										<td style={{ fontSize: '8px', color: '#333' }} valign="top">
											<img
												src="https://images2.imgbox.com/cd/00/K5HGEKDJ_o.png"
												style={{ fontSize: '8px', width: '100px', marginLeft: '-5px' }}
											/>
										</td>

										<td style={{ fontSize: '8px', textAlign: 'right' }} valign="top" align="right">
											<strong>Invoice #:</strong> {order._id}
											<br />
											<strong>Created:</strong> {order.createdAt && format_date(order.createdAt)}
										</td>
									</tr>
								</table>
							</td>
						</tr>

						<tr>
							<td colspan="2" valign="top">
								<table
									style={{ fontSize: '8px', width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
									width="100%"
									align="left"
								>
									<tr>
										<td valign="top">
											Glow LEDs<br />
											404 Kenniston Dr<br />
											Austin, TX 78752<br />
											info.glowleds@gmail.com
										</td>

										<td style={{ fontSize: '8px', textAlign: 'right' }} valign="top" align="right">
											{order.shipping.first_name} {order.shipping.last_name}
											<br />
											{order.shipping.address_1} {order.shipping.address_2}
											<br />
											{order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}
											<br />
											{order.shipping.email}
										</td>
									</tr>
								</table>
							</td>
						</tr>

						{order.payment.charge && (
							<tr>
								<td
									style={{
										fontSize: '8px',
										padding: '5px',
										verticalAlign: 'top',
										background: '#eee',
										borderBottom: '1px solid black',
										fontWeight: 'bold'
									}}
									valign="top"
								>
									Payment Method
								</td>

								<td
									style={{
										fontSize: '8px',
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'right',
										background: '#eee',
										borderBottom: '1px solid black',
										fontWeight: 'bold'
									}}
									valign="top"
									align="right"
								>
									Last 4
								</td>
							</tr>
						)}
						{order.payment.payment && (
							<tr>
								<td
									style={{
										fontSize: '8px',
										padding: '5px',
										display: 'flex',
										verticalAlign: 'top',
										borderBottom: '1px solid black',
										alignItems: 'center'
									}}
									valign="top"
								>
									<img
										src={
											order.payment.payment &&
											determin_card_logo(order.payment.payment.card.brand)
										}
										alt={order.payment.payment && order.payment.payment.card.brand}
										title="Card Type Image"
										style={{ fontSize: '8px', width: '15px', marginRight: '0.5rem' }}
									/>{' '}
									<div>{order.payment.payment && order.payment.payment.card.brand}</div>
								</td>

								<td
									style={{
										fontSize: '8px',
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'right',
										borderBottom: '1px solid black'
									}}
									valign="top"
									align="right"
								>
									{order.payment.payment ? order.payment.payment.card.last4 : ''}
								</td>
							</tr>
						)}

						<tr>
							<td
								style={{
									fontSize: '8px',
									padding: '5px',
									verticalAlign: 'top',
									background: '#eee',
									borderBottom: '1px solid black',
									fontWeight: 'bold'
								}}
								valign="top"
							>
								Item
							</td>

							<td
								style={{
									fontSize: '8px',
									padding: '5px',
									verticalAlign: 'top',
									textAlign: 'right',
									background: '#eee',
									borderBottom: '1px solid black',
									fontWeight: 'bold'
								}}
								valign="top"
								align="right"
							>
								Price
							</td>
						</tr>
						{order.orderItems.map((item) => {
							return (
								<tr>
									<td
										style={{
											fontSize: '8px',
											padding: '5px',
											verticalAlign: 'top',
											borderBottom: '1px solid black'
										}}
										valign="top"
									>
										{item.category === 'diffuser_caps' ||
										item.category === 'mega_diffuser_caps' ||
										item.category === 'frosted_diffusers' ? (
											`${item.diffuser_cap_color} `
										) : (
											''
										)}
										{item.name} {item.qty > 1 && item.qty + 'x'}
										{item.secondary_product ? `w (${item.secondary_product.name})` : ''}
									</td>

									<td
										style={{
											fontSize: '8px',
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right',
											borderBottom: '1px solid black'
										}}
										valign="top"
										align="right"
									>
										{email_sale_price_switch(item, 'black')}
									</td>
								</tr>
							);
						})}
					</table>
					<div style={{ fontSize: '8px', display: 'flex', justifyContent: 'space-between' }}>
						<div style={{ fontSize: '8px', width: '50%' }}>
							<div style={{ fontSize: '8px', verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									fontSize: '8px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end'
								}}
							>
								<div
									style={{
										fontSize: '8px',
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'left',
										display: 'flex'
									}}
									valign="top"
									align="right"
								>
									<strong style={{ fontSize: '8px', marginRight: '3px' }}>Promo Code: </strong>{' '}
									{order.promo_code && order.promo_code.toUpperCase()}
								</div>
								<div
									style={{ fontSize: '8px', padding: '5px', verticalAlign: 'top', textAlign: 'left' }}
									valign="top"
									align="right"
								>
									<strong style={{ fontSize: '8px', marginRight: '3px' }}>Order Note: </strong>{' '}
									{order.order_note}
								</div>
							</div>
						</div>
						<div style={{ width: '65px' }}>
							<div style={{ fontSize: '8px', verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									fontSize: '8px'
								}}
							>
								{!order.promo_code && (
									<div
										style={{
											fontSize: '8px',
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'left',
											display: 'flex'
										}}
										valign="top"
										align="right"
									>
										Subtotal:
									</div>
								)}
								{order.promo_code && (
									<del style={{ color: 'red' }}>
										<div
											style={{
												fontSize: '8px',
												padding: '5px',
												verticalAlign: 'top',
												textAlign: 'left',
												display: 'flex',
												color: 'black'
											}}
											valign="top"
											align="right"
										>
											Subtotal:
										</div>
									</del>
								)}
								{order.promo_code && (
									<div
										style={{
											fontSize: '8px',
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'left'
										}}
										valign="top"
										align="right"
									>
										Discount:
									</div>
								)}
								{order.promo_code && (
									<div
										style={{
											fontSize: '8px',
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'left'
										}}
										valign="top"
										align="right"
									>
										New Subtotal:
									</div>
								)}
								<div
									style={{ fontSize: '8px', padding: '5px', verticalAlign: 'top', textAlign: 'left' }}
									valign="top"
									align="right"
								>
									Tax:
								</div>
								<div
									style={{ fontSize: '8px', padding: '5px', verticalAlign: 'top', textAlign: 'left' }}
									valign="top"
									align="right"
								>
									Shipping:
								</div>
							</div>
						</div>
						<div style={{ width: '83px' }}>
							<div style={{ fontSize: '8px', verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									fontSize: '8px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end'
								}}
							>
								<div
									style={{
										fontSize: '8px',

										verticalAlign: 'top',
										textAlign: 'right',
										display: 'flex',
										marginLeft: 'auto'
									}}
									valign="top"
									align="right"
								>
									{/* {promo_code_switch(order)} */}
								</div>
								{!order.promo_code && (
									<div
										style={{
											fontSize: '8px',
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right'
										}}
										valign="top"
										align="right"
									>
										${(order.orderItems &&
										order.orderItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
											? order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)
											: order.orderItems.reduce((a, c) => a + c.sale_price * c.qty, 0)).toFixed(
											2
										)}
									</div>
								)}
								{order.promo_code && (
									<del style={{ color: 'red' }}>
										<div
											style={{
												fontSize: '8px',
												padding: '5px',
												verticalAlign: 'top',
												textAlign: 'right',
												color: 'black'
											}}
											valign="top"
											align="right"
										>
											${(order.orderItems &&
											order.orderItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
												? order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)
												: order.orderItems.reduce(
														(a, c) => a + c.sale_price * c.qty,
														0
													)).toFixed(2)}
										</div>
									</del>
								)}
								{order.promo_code && (
									<div
										style={{
											fontSize: '8px',
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right'
										}}
										valign="top"
										align="right"
									>
										<div>
											-${(order.orderItems.reduce((a, c) => a + c.price * c.qty, 0) -
												order.itemsPrice).toFixed(2)}
										</div>
									</div>
								)}
								{order.promo_code && (
									<div
										style={{
											fontSize: '8px',
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right'
										}}
										valign="top"
										align="right"
									>
										<div>${order.itemsPrice.toFixed(2)}</div>
									</div>
								)}
								<div
									style={{
										fontSize: '8px',
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'right'
									}}
									valign="top"
									align="right"
								>
									${order.taxPrice && order.taxPrice.toFixed(2)}
								</div>
								<div
									style={{
										fontSize: '8px',
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'right'
									}}
									valign="top"
									align="right"
								>
									${order.shippingPrice && order.shippingPrice.toFixed(2)}
								</div>
							</div>
						</div>
					</div>
					<div
						style={{
							fontSize: '8px',
							verticalAlign: 'top',
							width: '50%',
							marginLeft: 'auto',
							borderTop: '1px solid black'
						}}
						valign="top"
					/>
					<div style={{ fontSize: '8px', display: 'flex', justifyContent: 'space-between' }}>
						<div>
							<div style={{ fontSize: '8px', verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									fontSize: '8px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end'
								}}
							>
								<div
									style={{
										fontSize: '8px',
										paddingLeft: '70px',
										verticalAlign: 'top',
										textAlign: 'left',
										width: '24px',
										color: 'white',
										fontWeight: 'bold'
									}}
									valign="top"
									align="right"
								/>
							</div>
						</div>
						<div>
							<div style={{ fontSize: '8px', verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									fontSize: '8px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end'
								}}
							>
								<div
									style={{
										fontSize: '8px',
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'left',
										width: '33%',
										fontWeight: 'bold'
									}}
									valign="top"
									align="right"
								>
									Total:
								</div>
							</div>
						</div>
						<div>
							<div style={{ fontSize: '8px', verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									fontSize: '8px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end'
								}}
							>
								<div
									style={{
										fontSize: '8px',
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'right',
										width: '48px',
										fontWeight: 'bold'
									}}
									valign="top"
									align="right"
								>
									${order.totalPrice && order.totalPrice.toFixed(2)}
								</div>
							</div>
						</div>
					</div>
					<div>
						<h3 style={{ fontSize: '8px', textAlign: 'center' }}>Welcome to the Glow LEDs family!</h3>
						<div style={{ fontSize: '8px', textAlign: 'center' }}>
							We are so happy to share our art with you.
						</div>
						<div style={{ fontSize: '8px', textAlign: 'center' }}>
							The code below will take you to our <strong>FAQ page</strong> for all kinds of helpful
							information.
						</div>
						<div
							style={{
								fontSize: '8px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<div style={{ fontSize: '8px', textAlign: 'center', width: '125px' }}>
								<div style={{ fontSize: '8px', textAlign: 'center' }}>
									<strong>Facebook</strong>
								</div>
								<div style={{ fontSize: '8px', textAlign: 'center' }}>@GlowLEDsOfficial</div>
							</div>
							<img
								src="/images/optimized_images/logo_images/Glow_LEDs_Frequently_Asked_Questions_Page.png"
								style={{ fontSize: '8px', width: '50px', textAlign: 'center' }}
							/>
							<div style={{ fontSize: '8px', textAlign: 'center', width: '125px' }}>
								<div style={{ fontSize: '8px', textAlign: 'center' }}>
									<strong>Instagram</strong>
								</div>
								<div style={{ fontSize: '8px', textAlign: 'center' }}>@glow_leds</div>
							</div>
						</div>
						<div style={{ fontSize: '8px', textAlign: 'center' }}>
							<strong>Tag us in your videos and pictures!</strong>
						</div>

						<div style={{ fontSize: '8px', textAlign: 'center' }}>We want to feature you!</div>
						<div style={{ fontSize: '8px', textAlign: 'center' }}>
							We are figuring this out as we go so any feedback is welcome.
						</div>
						<div style={{ fontSize: '8px', textAlign: 'center' }}>
							We appreciate you more than you know.
						</div>
						<div style={{ fontSize: '8px', textAlign: 'center' }}>
							<strong>Questions or concerns?:</strong> info.glowleds@gmail.com
						</div>
					</div>
				</div>
			)}
		</body>
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const print_invoice = async () => {
		var prtContent = document.getElementById('invoice');
		var WinPrint = window.open('', 'PRINT', 'height=600,width=800');
		WinPrint.document.write(prtContent.innerHTML);
		WinPrint.document.close();
		WinPrint.focus();
		setTimeout(() => {
			WinPrint.print();
		}, 500);
	};

	return (
		<div>
			<div className="jc-b mb-2rem">
				{userInfo &&
				userInfo.isAdmin && (
					<button className="btn primary" onClick={() => history.goBack()}>
						Back to Emails
					</button>
				)}
				<button className="btn primary" onClick={() => history.goBack()}>
					Back to Orders
				</button>

				<Link to={'/secure/account/order/' + props.match.params.id}>
					<button className="btn primary mh-10px">View Order</button>
				</Link>
				<Link to="/secure/account/orders">
					<button className="btn primary mh-10px">Your Orders</button>
				</Link>

				<button className="btn primary mh-10px" onClick={() => print_invoice()}>
					Print Invoice
				</button>
			</div>
			<div
				style={{
					backgroundColor: 'white',
					padding: '39px',
					margin: 'auto',
					width: '680px',
					borderRadius: '20px'
				}}
			>
				{jsx}
			</div>
		</div>
	);
};

export default InvoiceEmail;
