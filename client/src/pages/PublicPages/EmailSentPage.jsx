import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const EmailSentPage = (props) => {
	return (
		<div className="column jc-c">
			<Helmet>
				<title>Email Sent | Glow LEDs</title>
				<meta property="og:title" content="Check Email" />
				<meta name="twitter:title" content="Check Email" />
				<link rel="canonical" href="https://www.glow-leds.com/account/checkemail" />
				<meta property="og:url" content="https://www.glow-leds.com/account/checkemail" />
			</Helmet>
			<h1 style={{ textAlign: 'center' }}>Email Sent Successfully!</h1>
			<h2 style={{ textAlign: 'center' }}>Thank You for Contacting Glow LEDs</h2>
			<p style={{ textAlign: 'center' }}>We'll answer your questions/requests as soon as possible.</p>
			<p style={{ textAlign: 'center' }}>Thank you for your patience and support!</p>
			<p style={{ textAlign: 'center' }}>
				Check out our Frequently Asked Questions page to learn more about our process
			</p>
			<Link to="/pages/faq">
				<div className="jc-c">
					<button className="btn primary " style={{ margin: 'auto' }}>
						Frequently Asked Questions
					</button>
				</div>
			</Link>
		</div>
	);
};
export default EmailSentPage;
