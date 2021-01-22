// React
import React from 'react';
require('dotenv').config();
// Components

const Loading = (props) => {
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
					{loading_message()}
				</div>
			) : props.error ? (
				<div className="error_message jc-c column">
					<p className="ta-c  fs-14px">Error: {props.error}</p>
					{/* <p className="ta-c mv-5px">Please Try a Different Card if Error Persists.</p> */}
				</div>
			) : (
				props.children
			)}
		</div>
	);
};

export default Loading;
