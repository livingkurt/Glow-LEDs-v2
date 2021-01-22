// React
import React from 'react';

const Container = (props) => {
	return (
		<div style={props.styles} className="fade_in">
			{props.children}
		</div>
	);
};

export default Container;
