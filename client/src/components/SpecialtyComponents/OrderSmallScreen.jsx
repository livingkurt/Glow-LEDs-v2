// React
import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { format_date } from '../../utils/helper_functions';

const OrderSmallScreen = (props) => {
	return (
		<div className="home_page_divs p-15px " style={{ backgroundColor: props.determine_color(props.order) }}>
			<div className="pb-15px mb-10px row ai-c" style={{ borderBottom: '1px solid white' }}>
				<div className="w-100per jc-b">
					<div className="column fs-16px">
						<h3>Order Placed</h3>
						<div>{props.order.createdAt && format_date(props.order.createdAt)}</div>
					</div>
					<div className="column fs-16px">
						<h3>Total</h3>
						<div>${props.order.totalPrice && props.order.totalPrice.toFixed(2)}</div>
					</div>
					{props.admin && (
						<div className="column fs-16px">
							<h3>Ship To</h3>
							{props.order.shipping.first_name} {props.order.shipping.last_name}
						</div>
					)}
					{/* <div className="jc-fe">
						<Link to={'/secure/account/order/' + props.order._id}>
							<button className="btn primary">Order Details</button>
						</Link>
					</div> */}

					<div className="jc-fe">
						<Link to={'/secure/account/order/' + props.order._id} className="m-auto">
							<button className="btn icon fs-25px">
								<i className="fas fa-info-circle" />
							</button>
						</Link>
					</div>
				</div>
			</div>

			<div className="small_screen_order row jc-b">
				<div className="w-100per">
					{props.order.orderItems.map((item, index) => {
						return (
							<div className="row mt-15px">
								<div className="column ai-c pos-rel">
									<Link to={'/collections/all/products/' + item.pathname}>
										<LazyLoadImage
											className="order-image w-100px h-100px br-10px mr-15px"
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
								<div className="column jc-c w-100per">
									<h2 className="">{item.name}</h2>
									<div className="ai-c w-100per jc-b">
										<div className="mv-10px">${item.price}</div>
										<Link to={'/collections/all/products/category/' + item.category}>
											<button className="btn primary">Buy Again</button>
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default OrderSmallScreen;
