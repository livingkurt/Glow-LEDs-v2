// React
import React from 'react';

const FlexContainer = (props) => {
	/* <FlexContainer 
      column || row
      h_center ||  h_left || h_right || h_between || h_around || h_evenly
      v_i_center ||  v_i_left || v_i_right || v_i_stretch
      v_c_center ||  v_c_left || v_c_right || v_c_between || v_c_around || v_c_evenly || v_c_stretch
      wrap
      t_center ||  t_left || t_right
      styles={ custom_styles }>
    </FlexContainer> */

	const styles = {
		display: 'flex',
		justifyContent: props.h_center
			? 'center'
			: props.h_left
				? 'flex-start'
				: props.h_right
					? 'flex-end'
					: props.h_between
						? 'space-between'
						: props.h_around ? 'space-around' : props.h_evenly ? 'space-evenly' : '',
		margin: props.h_center ? '0 auto' : props.h_left ? '0 auto 0 0' : props.h_right ? '0 0 0 auto' : '',
		alignItems: props.v_i_center
			? 'center'
			: props.v_i_left ? 'flex-start' : props.v_i_right ? 'flex-end' : props.v_i_stretch ? 'stretch' : '',
		alignContent: props.v_c_center
			? 'center'
			: props.v_c_left
				? 'flex-start'
				: props.v_c_right
					? 'flex-end'
					: props.v_c_between
						? 'space-between'
						: props.v_c_around
							? 'space-around'
							: props.v_c_evenly ? 'space-evenly' : props.v_c_stretch ? 'stretch' : '',
		flexDirection: props.column ? 'column' : props.row ? 'row' : '',
		flexWrap: props.wrap ? 'wrap' : '',
		textAlign: props.t_center ? 'center' : props.t_left ? 'left' : props.t_right ? 'right' : ''
	};
	return (
		<div style={{ ...styles, ...props.styles }} className={props.class}>
			{props.children}
		</div>
	);
};

export default FlexContainer;
