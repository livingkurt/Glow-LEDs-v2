// React
import React from 'react';

const Content = (props) => {
	return (
		<div style={props.styles} className="content">
			{props.children}
		</div>
	);
};

export default Content;
