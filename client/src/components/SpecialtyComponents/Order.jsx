// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { format_date } from '../../utils/helper_functions';
import useClipboard from 'react-hook-clipboard';
import { refundOrder } from '../../actions/orderActions';

const Order = (props) => {
	const dispatch = useDispatch();
	const [ clipboard, copyToClipboard ] = useClipboard();

	const [ refund_state, set_refund_state ] = useState({});
	const [ refund_amount, set_refund_amount ] = useState(0);
	const [ refund_reason, set_refund_reason ] = useState('');

	const orderRefund = useSelector((state) => state.orderRefund);
	const { order: refund } = orderRefund;

	const update_refund_state = () => {
		set_refund_state(true);
		dispatch(refundOrder(props.order, true, refund_amount, refund_reason));
		// }
	};
	useEffect(
		() => {
			if (refund) {
				set_refund_state(refund.isRefunded);
			}
		},
		[ refund ]
	);
	const show_hide = (id) => {
		const row = document.getElementById(id);
		console.log(row);
		row.classList.toggle('hide-row');
	};
	const daysBetween = (date1, date2) => {
		// console.log({ date1: date1.toISOString() });
		// console.log({ date1 });
		// console.log({ date2: new Date(date2).getDay() });

		const diffTime = Math.abs(new Date(date2) - date1);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		// console.log(diffTime + ' milliseconds');
		// console.log(diffDays + ' days');
		return diffDays;
	};

	// function dates(current) {
	// 	var week = new Array();
	// 	// Starting Monday not Sunday
	// 	current.setDate(current.getDate() - current.getDay() + 1);
	// 	for (var i = 0; i < 7; i++) {
	// 		week.push(new Date(current));
	// 		current.setDate(current.getDate() + 1);
	// 	}
	// 	return week;
	// }
	// console.log(dates(new Date(2020, 1, 27)));

	const today = new Date();
	return (
		<div className="home_page_divs" style={{ backgroundColor: props.determine_color(props.order) }}>
			<div className="pb-15px mb-10px row" style={{ borderBottom: '1px solid white' }}>
				<div className="w-50per jc-b ">
					<div className="column fs-16px">
						<h3>Order Placed</h3>
						<div>{props.order.createdAt && format_date(props.order.createdAt)}</div>
					</div>
					<div className="column fs-16px">
						<h3>Total</h3>
						{!props.order.isRefunded && (
							<div>
								<div>
									${props.order.totalPrice ? (
										props.order.totalPrice.toFixed(2)
									) : (
										props.order.totalPrice
									)}
								</div>
							</div>
						)}
						{props.order.isRefunded && (
							<div>
								<del style={{ color: 'red' }}>
									<label style={{ color: 'white' }}>
										<div>
											${props.order.totalPrice ? (
												props.order.totalPrice.toFixed(2)
											) : (
												props.order.totalPrice
											)}
										</div>
									</label>
								</del>
							</div>
						)}
						{props.order.isRefunded && (
							<div>
								<div>
									-${(props.order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}
								</div>
							</div>
						)}
						{props.order.isRefunded && (
							<div>
								<div>
									${(props.order.totalPrice -
										props.order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}
								</div>
							</div>
						)}
					</div>
					{props.admin && (
						<div className="column fs-16px">
							<h3>Since Order</h3>
							{daysBetween(today, props.order.createdAt) > 1 ? (
								`${daysBetween(today, props.order.createdAt)} Days`
							) : (
								`${daysBetween(today, props.order.createdAt)} Day`
							)}
						</div>
					)}
					<div className="column fs-16px">
						<h3>Ship To</h3>
						{props.order.shipping.first_name} {props.order.shipping.last_name}
					</div>
				</div>
				<div className="w-50per jc-fe">
					<div className="column">
						<div className="column fs-16px">
							<div className="row ai-c">
								<h3 className="mr-10px">Order Number: </h3>
								<div>{props.order._id}</div>
							</div>
						</div>
						<div className="row fs-16px jc-b ai-c">
							<Link to={'/secure/account/order/' + props.order._id}>
								<button className="btn primary">Order Details</button>
							</Link>
							<div>|</div>
							<button className="btn secondary">
								<Link to={'/secure/glow/emails/invoice/' + props.order._id}>View Invoice</Link>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="row jc-b">
				<div className="small_screen_order row jc-b w-89per">
					<div className="">
						{props.order.orderItems.map((item, index) => {
							return (
								<div className="row mt-15px">
									<div className="column ai-c pos-rel">
										<Link to={'/collections/all/products/' + item.pathname}>
											<LazyLoadImage
												className="order-image w-200px h-200px br-10px mr-15px"
												alt={item.name}
												title="Product Image"
												effect="blur"
												src={item.display_image && item.display_image} // use normal <img> attributes as props
											/>
										</Link>
										{item.qty > 1 && (
											<div
												className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c bottom-0px right-5px"
												style={{
													backgroundColor: 'white',
													color: 'black',
													border: '1px solid #ccc'
												}}
											>
												<div className="mt-3px ml-2px">{item.qty}</div>
											</div>
										)}
									</div>
									<div className="column jc-c">
										<h2 className="">
											{item.name} {item.qty > 1 && item.qty + 'x'}
										</h2>
										<div className="mv-10px">${item.price}</div>
										<Link to={'/collections/all/products/category/' + item.category}>
											<button className="btn primary">Buy Again</button>
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="column jc-b h-10rem w-25rem">
					<h2>Order Status</h2>
					<div>
						<div className="row ai-c">
							<div className="mv-5px">
								{props.order.isPaid ? (
									<i className="fas fa-check-circle" />
								) : (
									<i className="fas fa-times-circle" />
								)}
							</div>
							<div className="mh-10px">Paid</div>
							<div>{!props.order.paidAt ? '' : format_date(props.order.paidAt)}</div>
						</div>
					</div>
					<div>
						<div className="row ai-c">
							<div className="mv-5px">
								{props.order.isManufactured ? (
									<i className="fas fa-check-circle" />
								) : (
									<i className="fas fa-times-circle" />
								)}
							</div>
							<div className="mh-10px">Manufactured</div>

							<div>{!props.order.manufacturedAt ? '' : format_date(props.order.manufacturedAt)}</div>
						</div>
					</div>
					<div>
						<div className="row ai-c">
							<div className="mv-5px">
								{props.order.isPackaged ? (
									<i className="fas fa-check-circle" />
								) : (
									<i className="fas fa-times-circle" />
								)}
							</div>
							<div className="mh-10px">Packaged</div>

							<div>{!props.order.packagedAt ? '' : format_date(props.order.packagedAt)}</div>
						</div>
					</div>
					<div>
						<div className="row ai-c">
							<div className="mv-5px">
								{props.order.isShipped ? (
									<i className="fas fa-check-circle" />
								) : (
									<i className="fas fa-times-circle" />
								)}
							</div>
							<div className="mh-10px">Shipped</div>

							<div>{!props.order.shippedAt ? '' : format_date(props.order.shippedAt)}</div>
						</div>
					</div>
					<div>
						<div className="row ai-c">
							<div className="mv-5px row">
								{props.order.isDelivered ? (
									<i className="fas fa-check-circle" />
								) : (
									<i className="fas fa-times-circle" />
								)}
							</div>
							<div className="mh-10px">Delivered</div>

							<div>{!props.order.deliveredAt ? '' : format_date(props.order.deliveredAt)}</div>
						</div>
					</div>
				</div>
				{props.admin && (
					<div className="jc-fe column ">
						<button className="btn icon h-3rem " onClick={() => show_hide(props.order._id)}>
							<i style={{ '-webkitTransform': 'rotate(-180deg)' }} className="top-8px fas fa-sort-up" />
						</button>
					</div>
				)}
			</div>

			{props.admin && (
				<div id={props.order._id} className="expanded-row-content hide-row">
					<div className="jc-b pt-10px mt-10px" style={{ borderTop: '1px solid white' }}>
						<div className="row ai-c jc-b">
							<div>
								<div className="mv-10px">
									<label htmlFor="payment_method">Payment Method</label>
									<li className="row mv-10px">
										<input
											type="text"
											defaultValue={props.order.payment.paymentMethod}
											name="payment_method"
											className=""
											onChange={(e) => props.set_payment_method(e.target.value)}
										/>
									</li>
									<label htmlFor="refund_amount">Refund Amount</label>
									<div className="row">
										<input
											type="text"
											value={refund_amount}
											name="refund_amount"
											id="refund_amount"
											className="w-100per"
											onChange={(e) => set_refund_amount(e.target.value)}
										/>
									</div>
									<div className="mv-10px">
										<label htmlFor="refund_reason">Refund Reason</label>
										<div className="row">
											<input
												type="text"
												value={refund_reason}
												name="refund_reason"
												id="refund_reason"
												className="w-100per"
												onChange={(e) => set_refund_reason(e.target.value)}
											/>
										</div>
									</div>
									<div className="column">
										<button className="btn primary mv-5px" onClick={update_refund_state}>
											Refund Customer
										</button>

										<button className="btn primary mv-5px">
											<Link to={'/secure/glow/emails/order/' + props.order._id}>View Email</Link>
										</button>
									</div>
								</div>
							</div>
						</div>
						<ul className="column">
							<li className="column ">
								<h2>Shipping</h2>
								<div>
									<div>
										{props.order.shipping.first_name} {props.order.shipping.last_name}
									</div>
									<div>
										{props.order.shipping.address_1} {props.order.shipping.address_2}
									</div>
									<div>
										{props.order.shipping.city}, {props.order.shipping.state}{' '}
										{props.order.shipping.postalCode} {props.order.shipping.country}
									</div>
									<div>{props.order.shipping.international && 'International'}</div>
									<div>{props.order.shipping.email}</div>
								</div>
								<button
									className="btn secondary w-200px mv-10px"
									onClick={() =>
										copyToClipboard(`
${props.order.shipping.first_name} ${props.order.shipping.last_name}
${props.order.shipping.address_1} ${props.order.shipping.address_2}
${props.order.shipping.city}, ${props.order.shipping.state}
${props.order.shipping.postalCode} ${props.order.shipping.country}
${props.order.shipping.email}`)}
								>
									Copy to clipboard
								</button>
							</li>
							<li className="row">
								<h3 className="">Order Note: </h3>
								<label className="mv-2rem ml-1rem">{props.order.order_note}</label>
							</li>
							<li className="row">
								<h3 className="">Promo Code: </h3>
								<label className="mv-2rem ml-1rem">{props.order.promo_code}</label>
							</li>
						</ul>

						<div className="jc-b">
							<div className="column jc-b w-25rem">
								<button className="btn primary">
									<Link to={'/secure/glow/editorder/' + props.order._id}>Edit Order</Link>
								</button>
								<button className="btn primary mv-5px">
									<Link to={'/secure/glow/emails/invoice/' + props.order._id}>View Invoice</Link>
								</button>

								<button
									className="btn primary mv-5px"
									onClick={() =>
										props.update_order_payment_state(
											props.order,
											props.order.isPaid,
											'isPaid',
											'paidAt'
										)}
								>
									{props.order.isPaid ? 'Unset to Paid' : 'Set to Paid'}
								</button>
								<button
									className="btn primary mv-5px"
									onClick={() =>
										props.update_order_state(
											props.order,
											props.order.isManufactured,
											'isManufactured',
											'manufacturedAt'
										)}
								>
									{props.order.isManufactured ? 'Unset to Manufactured' : 'Set to Manufactured'}
								</button>
								<button
									className="btn primary mv-5px"
									onClick={() =>
										props.update_order_state(
											props.order,
											props.order.isPackaged,
											'isPackaged',
											'packagedAt'
										)}
								>
									{props.order.isPackaged ? 'Unset to Packaged' : 'Set to Packaged'}
								</button>
								<button
									className="btn primary mv-5px"
									onClick={() =>
										props.update_order_state(
											props.order,
											props.order.isShipped,
											'isShipped',
											'shippedAt'
										)}
								>
									{props.order.isShipped ? 'Unset to Shipped' : 'Set to Shipped'}
								</button>
								<button
									className="btn primary mv-5px"
									onClick={() =>
										props.update_order_state(
											props.order,
											props.order.isDelivered,
											'isDelivered',
											'deliveredAt'
										)}
								>
									{props.order.isDelivered ? 'Unset to Delivered' : 'Set to Delivered'}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Order;
