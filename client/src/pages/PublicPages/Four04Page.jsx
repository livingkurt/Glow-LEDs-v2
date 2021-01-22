import React from 'react';
import { Helmet } from 'react-helmet';

const Four04Page = (props) => {
	return (
		<div className="jc-c column ta-c">
			<Helmet>
				<title>404 Not Found | Glow LEDs</title>
				<meta property="og:title" content="404 Not Found" />
				<meta property="og:url" content="https://www.glow-leds.com" />

				<meta name="twitter:title" content="404 Not Found" />
			</Helmet>
			<h1 styles={{ margin: '20px auto' }}>404 Page Not Found</h1>
			<label>Sorry About that</label>
		</div>
	);
};
export default Four04Page;
