// React
import React from 'react';
require('dotenv').config();
// Components

const LoadingPayment = (props) => {
	const loading_message = () => {
		setTimeout(() => {
			return <h3 style={{ textAlign: 'center' }}>If page doesn't show in 5 seconds, refresh the page.</h3>;
		}, 3000);
	};

	return (
		<div>
			{props.loading ? (
				<div className="jc-c column">
					<img
						src={process.env.PUBLIC_URL + '/loading.gif'}
						className="loading_gif"
						alt="Loading Circle"
						title="Loading Circle"
					/>
					<img
						src={process.env.PUBLIC_URL + '/loading_overlay.png'}
						className="loading_png"
						alt="Loading Overlay"
						title="Loading Overlay"
					/>
					<div className="payment_message">
						<h2 className="ta-c">Wait a moment while we process your Payment</h2>
						<p className="ta-c">Please Do not Refresh Page</p>
					</div>
					{loading_message()}
				</div>
			) : props.error ? (
				<div className="error_message_payment jc-c column">
					<h2 className="ta-c mv-5px">Error: {props.error}</h2>
					<p className="ta-c mv-5px fs">
						Please Try a Different Card if Error Persists and Contact Glow LEDs for Support
					</p>
				</div>
			) : (
				props.children
			)}
		</div>
	);
};

export default LoadingPayment;
