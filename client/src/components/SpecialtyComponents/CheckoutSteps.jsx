import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = (props) => {
	return (
		<div className="checkout-steps">
			<div className={props.step1 ? 'active' : ''}>Login</div>
			<div className={props.step2 ? 'active' : ''}>
				<Link to="/secure/checkout/shipping">Shipping</Link>
			</div>

			<div className={props.step3 ? 'active' : ''}>
				<Link to="/secure/checkout/placeorder">Payment</Link>
			</div>
			<div className={props.step4 ? 'active' : ''}>
				<Link to="/secure/checkout/payment">Complete</Link>
			</div>
		</div>
	);
};

export default CheckoutSteps;
