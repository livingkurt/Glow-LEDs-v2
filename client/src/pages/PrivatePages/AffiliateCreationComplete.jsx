import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AffiliateComplete = (props) => {
	return (
		<div className="column jc-c">
			<Helmet>
				<title>Submission Complete | Glow LEDs</title>
				<meta property="og:title" content="Submission Complete" />
				<meta name="twitter:title" content="Submission Complete" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/paymentcomplete/" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/paymentcomplete/" />
			</Helmet>
			<div className="jc-b wrap w-100per">
				<Link to="/secure/account/profile">
					<button style={{ margin: '15px' }} className="btn primary">
						Back to Profile
					</button>
				</Link>
				{/* <Link to="/collections/all/products">
					<button style={{ margin: '15px' }} className="btn primary">
						Products
					</button>
				</Link> */}
			</div>
			<div>
				<h1 style={{ textAlign: 'center' }}>Submission Successful</h1>
				<p style={{ textAlign: 'center' }}>Thank you for your submission to be a Affiliate Artist</p>
				<p style={{ textAlign: 'center' }}>We appreciate your support!</p>

				{/* <p style={{ textAlign: 'center' }}>
					{' '}
					Make sure to check your spam folder for the confirmation email. If you do not recieve a confirmation
					email please contact support
				</p> */}
			</div>
		</div>
	);
};
export default AffiliateComplete;
