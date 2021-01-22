import React from 'react';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const CheckEmailPage = (props) => {
	return (
		<div className="column jc-c">
			<Helmet>
				<title>Check Email | Glow LEDs</title>
				<meta property="og:title" content="Check Email" />
				<meta name="twitter:title" content="Check Email" />
				<link rel="canonical" href="https://www.glow-leds.com/account/checkemail" />
				<meta property="og:url" content="https://www.glow-leds.com/account/checkemail" />
			</Helmet>
			<h1 style={{ textAlign: 'center' }}>Thank You for Registering your Account.</h1>
			<h2 style={{ textAlign: 'center' }}>Check your Email for a Link to Verifiy your Account</h2>
			<div className="jc-c">
				<div className="jc-c wrap">
					<p style={{ textAlign: 'center', width: '100%' }}>
						If you do not recieve a verification email, make sure to check your spam folder.
					</p>
					<p style={{ textAlign: 'center', width: '100%' }}>If still not there please contact support.</p>
					<div className="jc-c">
						<Link to="/pages/contact/did_not_recieve_verification_email">
							<button style={{ marginLeft: '10px' }} className="btn primary">
								Contact Support
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CheckEmailPage;
