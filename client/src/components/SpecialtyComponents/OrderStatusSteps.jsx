import React from 'react';
import { Link } from 'react-router-dom';

const OrderStatusSteps = (props) => {
	return (
		<div className="order-status-steps">
			<div className={props.step1 ? 'active' : ''}>
				<div>Ordered</div>
				{/* <i class="fas fa-check-square" /> */}
			</div>
			<div className={props.step2 ? 'active' : ''}>
				<div>Paid </div>
				{/* <i class="fas fa-money-bill-wave" /> */}
			</div>
			<div className={props.step3 ? 'active' : ''}>
				<div>Manufactured </div>
				{/* <i class="fas fa-hammer" /> */}
			</div>
			<div className={props.step4 ? 'active' : ''}>
				<div>Packaged </div>
				{/* <i class="fas fa-box" /> */}
			</div>
			<div className={props.step5 ? 'active' : ''}>
				<div>Shipped</div>
				{/* <i class="fas fa-shipping-fast" /> */}
			</div>
			{/* <div className={props.step5 ? 'active' : ''}>Delivered</div>  */}
		</div>
	);
};

export default OrderStatusSteps;
