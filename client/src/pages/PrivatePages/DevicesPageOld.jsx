import React, { useState, useEffect, useRef } from 'react';
import { Route, BrowserRouter as Router, Switch, Link, useHistory } from 'react-router-dom';

import { ToggleSwitch } from '../../components/UtilityComponents';
import { API_Glow_Control } from '../../utils';
import {
	SettingSlider,
	RGBSlider,
	DropdownSelector,
	HSVSlider,
	ColorBoxRGB,
	ColorBoxHSV
} from '../../components/ColorComponents';

const DevicesPage = (props) => {
	const devices = {
		living_room: { name: 'Living Room', query_url: '192.168.0.219' },
		test_2: { name: 'Test', query_url: '192.168.0.152' },
		bedroom: { name: 'Bedroom', query_url: '192.168.0.58' },
		keiths: { name: 'Keiths', query_url: '192.168.1.145' }
	};

	const [ settings, set_settings ] = useState({});
	const [ leds, set_leds ] = useState(devices);
	const [ current_device, set_current_device ] = useState(leds.bedroom);
	const [ patterns, set_patterns ] = useState([]);
	const [ palettes, set_palettes ] = useState([]);
	// const [ devices, set_devices ] = useState([]);
	const [ rgb, set_rgb ] = useState({});
	const [ hsv, set_hsv ] = useState({});
	const [ loading, set_loading ] = useState(true);
	const [ show_hide_pattern, set_show_hide_pattern ] = useState();
	const [ show_hide_palette, set_show_hide_palette ] = useState();
	const [ mode_specific_settings, set_mode_specific_settings ] = useState('');

	useEffect(() => {
		get_all_settings(current_device.query_url);
		set_leds(devices);
		return () => {};
	}, []);

	function camelize(str) {
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, '');
	}

	const update_leds = async (field_name, value) => {
		try {
			console.log({ field_name, value });
			const res = await API_Glow_Control.update_leds(current_device.query_url, field_name, value);
			if (field_name === 'pattern') {
				let pattern = camelize(patterns[value]);
				console.log(pattern);
				set_mode_specific_settings(pattern);
			} else if (field_name === 'autoplayPattern') {
				if (show_hide_pattern === 1) {
					set_show_hide_pattern(0);
					// fade_in();
				} else if (show_hide_pattern === 0) {
					set_show_hide_pattern(1);
					// fade_out();
				}
			} else if (field_name === 'autoplayPalette') {
				if (show_hide_palette === 1) {
					set_show_hide_palette(0);
					// fade_in();
				} else if (show_hide_palette === 0) {
					set_show_hide_palette(1);
					// fade_out();
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const update_rgb = async (field_name, value, red, green, blue) => {
		try {
			if (field_name !== 'rgb') {
				red = field_name === 'red' ? value : rgb.red;
				green = field_name === 'green' ? value : rgb.green;
				blue = field_name === 'blue' ? value : rgb.blue;
			}
			console.log(field_name, value, red, green, blue);
			set_rgb({ red, green, blue });
			const res = await API_Glow_Control.update_rgb(current_device.query_url, red, green, blue);
		} catch (err) {
			console.log(err);
		}
	};
	const update_hsv = async (field_name, field_value, hue, saturation, value) => {
		try {
			if (field_name !== 'hsv') {
				hue = field_name === 'hue' ? field_value : hsv.hue;
				saturation = field_name === 'saturation' ? field_value : hsv.saturation;
				value = field_name === 'value' ? field_value : hsv.value;
			}
			console.log(field_name, field_value);
			console.log(field_name, field_value, hue, saturation, value);
			set_hsv({ hue, saturation, value });
			const res = await API_Glow_Control.update_hsv(current_device.query_url, hue, saturation, value);
		} catch (err) {
			console.log(err);
		}
	};

	const get_all_settings = async (query_url) => {
		try {
			const res = await API_Glow_Control.get_all_settings(query_url);

			const settings = res.data;
			let saved_settings = {};
			settings.map((setting) => {
				return (saved_settings[setting.name] = setting);
			});
			console.log(settings[4].options);
			set_settings(saved_settings);
			set_patterns(settings[2].options);
			set_palettes(settings[3].options);
			// let saved_devices = {};
			// settings[4].options.map((device) => {
			// 	return (saved_devices[device.name] = device);
			// });
			// set_devices(saved_devices);
			set_rgb({
				red: saved_settings.rgb.value.split(',')[0],
				green: saved_settings.rgb.value.split(',')[1],
				blue: saved_settings.rgb.value.split(',')[2]
			});
			set_hsv({
				hue: saved_settings.hsv.value.split(',')[0],
				saturation: saved_settings.hsv.value.split(',')[1],
				value: saved_settings.hsv.value.split(',')[2]
			});
			set_mode_specific_settings(camelize(saved_settings.pattern.options[saved_settings.pattern.value]));
			set_show_hide_pattern(saved_settings.autoplayPattern.value);
			set_show_hide_palette(saved_settings.autoplayPalette.value);
			set_loading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const reset_device = async () => {
		try {
			const res = await API_Glow_Control.reset_device(current_device.query_url);
		} catch (err) {
			console.log(err);
		}
	};
	console.log({ settings });

	const change_device = (current_device) => {
		set_current_device(current_device);
		get_all_settings(current_device.query_url);
		set_loading(true);
	};

	// const [ opacity, set_opacity ] = useState(1);
	// const fade_in = () => {
	// 	let element = document.getElementById('autoplayPattern_duration');
	// 	console.log(element);
	// 	var op = 1; // initial opacity
	// 	var timer = setInterval(function() {
	// 		if (op <= 0.1) {
	// 			clearInterval(timer);
	// 			element.style.display = 'none';
	// 		}
	// 		element.style.opacity = op;
	// 		element.style.filter = 'alpha(opacity=' + op * 100 + ')';
	// 		op -= op * 0.2;
	// 	}, 50);
	// 	set_show_hide(0);
	// };
	// const fade_out = () => {
	// 	var op = 0.1; // initial opacity
	// 	let element = document.getElementById('autoplayPattern_duration');
	// 	console.log(element);
	// 	element.style.display = 'block';
	// 	var timer = setInterval(function() {
	// 		if (op >= 1) {
	// 			clearInterval(timer);
	// 		}
	// 		element.style.opacity = op;
	// 		element.style.filter = 'alpha(opacity=' + op * 100 + ')';
	// 		op += op * 0.1;
	// 	}, 10);
	// 	set_show_hide(1);
	// };

	return (
		<div className="p-20px">
			<div className="wrap jc-b">
				<h2 className=" w-500px" />
				<h1 className="ta-c">Devices</h1>
				<div className=" jc-fe w-500px">
					<label className="p-10px ">Click Here to Get Started!</label>
					<Link to="/secure/account/editdevice">
						<button className="btn primary">Add Device</button>
					</Link>
				</div>
			</div>
			<h2 className="p-10px ta-c">No Devices Yet</h2>
			<Loading loading={loading} error={error}>
				{devices && (
					<div className="device-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Active</th>
									<th>affiliate</th>
									<th>Promo Code</th>
									<th>Percentage Off</th>
									<th>Funds Generated</th>
									<th>For Customer</th>
									<th>Excluded Categories</th>
									<th>Excluded Products</th>

									<th>Number of Uses</th>

									<th>Number of Orders</th>
								</tr>
							</thead>
							<tbody>
								{devices.map((device) => (
									<tr
										key={device._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td>
											{device.active ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>{device.affiliate}</td>
										<td>{device.device_code}</td>
										<td>{device.percentage_off}%</td>
										<td>${device.funds_generated}</td>
										<td>
											{device.for_customer ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>{device.excluded_categories}</td>
										<td>{device.excluded_products}</td>

										<td>{device.number_of_uses}</td>

										<td>{device.number_of_orders}</td>

										<td>
											<div className="jc-b">
												<Link to={'/secure/glow/editdevice/' + device._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(device)}>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
			{/* <div className="column">
				<div>
					<button onClick={() => change_device(leds.living_room)} className="btn btn-nav">
						Living Room
					</button>
				</div>
				<button onClick={() => change_device(leds.bedroom)} className="btn btn-nav">
					Bedroom
				</button>
				<button onClick={() => change_device(leds.test_2)} className="btn btn-nav">
					Test 2
				</button>
				<button onClick={() => change_device(leds.keiths)} className="btn btn-nav">
					Keiths
				</button>
			</div>
			<button className="btn primary" onClick={() => reset_device()}>
				Reset
			</button> */}
		</div>
	);
};

export default DevicesPage;
