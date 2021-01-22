import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ViewOrder = (props) => {
	const [ order_number, set_order_number ] = useState('');
	return (
		<div className="form">
			<Helmet>
				<title>Track Order | Glow LEDs</title>
				<meta property="og:title" content="Guest Decision" />
				<meta name="twitter:title" content="Guest Decision" />
				<link rel="canonical" href="https://www.glow-leds.com/account/decision" />
				<meta property="og:url" content="https://www.glow-leds.com/account/decision" />
			</Helmet>
			<form>
				<ul className="form-container">
					<h1 style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}>Track Your Order</h1>
					<li>
						<label htmlFor="order_number">Order Number</label>
						<input
							type="order_number"
							id="order_number"
							name="order_number"
							onChange={(e) => set_order_number(e.target.value)}
						/>
					</li>
					<li>
						<Link to={'/checkout/order/' + order_number}>
							<button className="btn primary w-100per">View Order</button>
						</Link>
					</li>
					<li>
						<p>If you do not know your order number please contact support for assistance</p>
					</li>
					<li>
						<Link to="/pages/contact">
							<button className="btn primary w-100per" style={{ margin: 'auto' }}>
								Contact
							</button>
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
};
export default ViewOrder;
