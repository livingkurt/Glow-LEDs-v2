import React from 'react';

const ToggleSwitch = (props) => {
	return (
		<div className="mv-10px ai-c">
			<label className="w-14rem">{props.setting.label}</label>
			<label className="switch">
				<input
					type="checkbox"
					name={props.setting.name}
					defaultChecked={props.setting.value === 1 ? true : false}
					onChange={(e) => props.update_function(e.target.name, e.target.checked === true ? 1 : 0)}
				/>
				<span className="slider round" />
			</label>
		</div>
	);
};

export default ToggleSwitch;
