import React, { useState, useEffect, useRef } from 'react';
import { Route, BrowserRouter as Router, Switch, Link, useHistory } from 'react-router-dom';
import { saveDevice, detailsDevice, listDevices } from '../../actions/deviceActions';
import { useSelector, useDispatch } from 'react-redux';

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

const GlowControl = (props) => {
	const device_id = props.match.params.id ? props.match.params.id : '';
	console.log({ device_id });
	// const devices = {
	// 	living_room: { name: 'Living Room', query_url: '192.168.0.219' },
	// 	test_2: { name: 'Test', query_url: '192.168.0.152' },
	// 	bedroom: { name: 'Bedroom', query_url: '192.168.0.58' },
	// 	keiths: { name: 'Keiths', query_url: '192.168.1.145' }

	const dispatch = useDispatch();
	// };

	const deviceDetails = useSelector((state) => state.deviceDetails);
	const { device, loading: loading_device, error } = deviceDetails;

	console.log({ device });
	const [ settings, set_settings ] = useState({});
	const [ device_settings, set_device_settings ] = useState({});
	const [ leds, set_leds ] = useState();
	// const [ device, set_device ] = useState('');
	const [ patterns, set_patterns ] = useState([]);
	const [ palettes, set_palettes ] = useState([]);
	const [ pattern_order, set_pattern_order ] = useState([]);
	const [ palette_order, set_palette_order ] = useState([]);
	// const [ settings, set_settings ] = useState([]);
	const [ rgb, set_rgb ] = useState({});
	const [ hsv, set_hsv ] = useState({});
	const [ loading, set_loading ] = useState(true);
	const [ show_hide_pattern, set_show_hide_pattern ] = useState();
	const [ show_hide_palette, set_show_hide_palette ] = useState();
	const [ mode_specific_settings, set_mode_specific_settings ] = useState('');

	useEffect(
		() => {
			if (device && device.query_url) {
				get_all_settings(device.query_url);
				console.log({ query_url: device.query_url });
			}

			// set_device(device);
			console.log({ device });
			// console.log({ query_url: device.query_url });

			// set_leds(devices);
			return () => {};
		},
		[ device ]
	);

	useEffect(() => {
		if (props.match.params.id) {
			console.log('Is ID');
			dispatch(detailsDevice(props.match.params.id));
			dispatch(detailsDevice(props.match.params.id));
		} else {
			dispatch(detailsDevice(''));
		}
		// set_state();
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
			dispatch(
				saveDevice({
					_id: device_id,
					device_settings,
					pattern_order,
					palette_order
				})
			);
			const res = await API_Glow_Control.update_leds(device.query_url, field_name, value);
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
			const res = await API_Glow_Control.update_rgb(device.query_url, red, green, blue);
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
			const res = await API_Glow_Control.update_hsv(device.query_url, hue, saturation, value);
		} catch (err) {
			console.log(err);
		}
	};

	const get_all_settings = async (query_url) => {
		try {
			const res = await API_Glow_Control.get_all_settings(query_url);
			console.log({ res });
			console.log({ query_url });

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
			const res = await API_Glow_Control.reset_device(device.query_url);
		} catch (err) {
			console.log(err);
		}
	};
	console.log({ settings });

	const change_device = (device) => {
		// set_device(device);
		get_all_settings(device.query_url);
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
		<div>
			<div className="jc-b w-100per">
				<Link to="/secure/account/devices">
					<button className="btn primary">Back to Devices</button>
				</Link>

				<Link to={'/secure/account/editdevice/' + device_id}>
					<button className="btn primary">Edit Device</button>
				</Link>
			</div>
			{loading ? (
				<h2 className="ta-c">Loading... Make Sure Device is Turned On</h2>
			) : (
				settings && (
					<div className="column w-100per">
						<h1 className="ta-c">{device.device_name}</h1>
						{settings.pattern.options
							.map((pattern) => {
								return camelize(pattern);
							})
							.includes(mode_specific_settings) && (
							<div>
								{/* <h2 className="ta-c">Macro Controls</h2> */}
								<ToggleSwitch
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.power}
									settings={settings}
								/>
								<DropdownSelector
									update_function={update_leds}
									data={patterns}
									setting={settings.pattern}
									settings={settings}
								/>
								<SettingSlider
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.brightness}
									settings={settings}
								/>
								{[ 'shootingStar', 'beat' ].includes(mode_specific_settings) && (
									<div>
										{/* <h1 className="ta-c">Palettes</h1> */}
										<SettingSlider
											update_function={update_leds}
											set_settings={set_settings}
											setting={settings.speed}
											settings={settings}
										/>
									</div>
								)}
								<ToggleSwitch
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.autoplayPattern}
									settings={settings}
								/>
								<div style={{ display: show_hide_pattern === 1 ? 'flex' : 'none' }}>
									<SettingSlider
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.autoplayPatternDuration}
										settings={settings}
									/>
								</div>
								<div style={{ display: show_hide_pattern === 1 ? 'flex' : 'none' }}>
									<ToggleSwitch
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.randomPatternMode}
										settings={settings}
									/>
								</div>
							</div>
						)}
						{[ 'strobe', 'sparkle', 'shootingStar', 'cycle', 'beat', 'colorWaves', 'twinkles' ].includes(
							mode_specific_settings
						) && (
							<div>
								<h2 className="ta-c">Palettes</h2>
								<DropdownSelector
									update_function={update_leds}
									data={palettes}
									setting={settings.palette}
									settings={settings}
								/>
								<ToggleSwitch
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.blendMode}
									settings={settings}
								/>
								<ToggleSwitch
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.autoplayPalette}
									settings={settings}
								/>
								<div style={{ display: show_hide_palette === 1 ? 'flex' : 'none' }}>
									<SettingSlider
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.autoplayPaletteDuration}
										settings={settings}
									/>
								</div>
								<div style={{ display: show_hide_palette === 1 ? 'flex' : 'none' }}>
									<ToggleSwitch
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.randomPaletteMode}
										settings={settings}
									/>
								</div>
							</div>
						)}
						{[ 'strobe', 'pulse', 'cycle', 'sparkle', 'shootingStar', 'beat', 'juggle' ].includes(
							mode_specific_settings
						) && (
							<div>
								<h2 className="ta-c">Color Options</h2>
								<SettingSlider
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.colorDensity}
									settings={settings}
								/>
								<SettingSlider
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.colorSpeed}
									settings={settings}
									direction="rtl"
								/>
								{[ 'sparkle', 'shootingStar', 'beat', 'juggle' ].includes(mode_specific_settings) && (
									<SettingSlider
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.colorFade}
										settings={settings}
										direction="rtl"
									/>
								)}
							</div>
						)}
						{[
							'rainbowTwinkles',
							'snowTwinkles',
							'cloudTwinkles',
							'incandescentTwinkles',
							'twinkles'
						].includes(mode_specific_settings) && (
							<div>
								<h2 className="ta-c">Twinkles</h2>
								<SettingSlider
									update_function={update_leds}
									setting={settings.twinkleSpeed}
									settings={settings}
								/>
								<SettingSlider
									update_function={update_leds}
									setting={settings.twinkleDensity}
									settings={settings}
								/>
							</div>
						)}

						{mode_specific_settings === 'strobe' && (
							<div>
								<h2 className="ta-c">Strobe</h2>
								<SettingSlider
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.strobe}
									settings={settings}
								/>
								<SettingSlider
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.blank}
									settings={settings}
								/>
								<SettingSlider
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.gap}
									settings={settings}
								/>
							</div>
						)}
						{[ 'fire', 'water' ].includes(mode_specific_settings) && (
							<div>
								<h2 className="ta-c">Variablity</h2>
								<SettingSlider
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.cooling}
									settings={settings}
								/>
								<SettingSlider
									update_function={update_leds}
									set_settings={set_settings}
									setting={settings.sparking}
									settings={settings}
								/>
							</div>
						)}
						{console.log(mode_specific_settings)}
						{mode_specific_settings === 'rGB' && (
							<div>
								<h2 className="ta-c">RGB</h2>
								<div className="">
									{/* <input type="color" /> */}
									<div className="row jc-b">
										<div className="row jc-c">
											<ColorBoxRGB update_function={update_rgb} color="255,0,0" />
											<ColorBoxRGB update_function={update_rgb} color="255,128,0" />
											<ColorBoxRGB update_function={update_rgb} color="255,255,0" />
											<ColorBoxRGB update_function={update_rgb} color="0,255,0" />
											<ColorBoxRGB update_function={update_rgb} color="0,255,173" />
											<ColorBoxRGB update_function={update_rgb} color="0,255,255" />
											<ColorBoxRGB update_function={update_rgb} color="0,128,255" />
											<ColorBoxRGB update_function={update_rgb} color="0,0,255" />
											<ColorBoxRGB update_function={update_rgb} color="128,0,255" />
											<ColorBoxRGB update_function={update_rgb} color="255,0,255" />
											<ColorBoxRGB update_function={update_rgb} color="255,0,128" />
											<ColorBoxRGB update_function={update_rgb} color="255,255,255" />
										</div>
									</div>
									<RGBSlider
										update_function={update_rgb}
										color="red"
										rgb={rgb}
										set_rgb={set_rgb}
										setting={settings.rgb}
										settings={settings}
									/>
									<RGBSlider
										update_function={update_rgb}
										color="green"
										rgb={rgb}
										set_rgb={set_rgb}
										setting={settings.rgb}
										settings={settings}
									/>
									<RGBSlider
										update_function={update_rgb}
										color="blue"
										rgb={rgb}
										set_rgb={set_rgb}
										setting={settings.rgb}
										settings={settings}
									/>
								</div>
							</div>
						)}
						{mode_specific_settings === 'hSV' && (
							<div>
								<h2 className="ta-c">HSV</h2>
								<div className="">
									{/* <input type="color" /> */}
									<div className="row jc-b m-h-auto w-100per">
										<ColorBoxHSV update_function={update_hsv} rgb="255,0,0" hsv="0,255,255" />
										<ColorBoxHSV update_function={update_hsv} rgb="255,128,0" hsv="32,255,255" />
										<ColorBoxHSV update_function={update_hsv} rgb="255,255,0" hsv="64,255,255" />
										<ColorBoxHSV update_function={update_hsv} rgb="0,255,0" hsv="92,255,255" />

										<ColorBoxHSV update_function={update_hsv} rgb="0,255,255" hsv="127,255,255" />
										<ColorBoxHSV
											update_function={update_hsv}
											rgb="93, 200, 252"
											hsv="138,255,255"
										/>
										<ColorBoxHSV update_function={update_hsv} rgb="0,128,255" hsv="148,255,255" />
										<ColorBoxHSV update_function={update_hsv} rgb="0,0,255" hsv="170,255,255" />
										<ColorBoxHSV update_function={update_hsv} rgb="128,0,255" hsv="191,255,255" />
										<ColorBoxHSV update_function={update_hsv} rgb="255,0,255" hsv="212,255,255" />
										<ColorBoxHSV update_function={update_hsv} rgb="255,0,128" hsv="233,255,255" />
										<ColorBoxHSV update_function={update_hsv} rgb="255,255,255" hsv="255,0,255" />
									</div>
									<div
										style={{
											position: 'relative',
											height: '36px',
											left: '0',
											width: '100%',
											top: '5px',
											borderRadius: '10px',
											display: 'flex',
											marginTop: '10px',
											marginBottom: '15px',
											justifyContent: 'flex-end'
										}}
									>
										<img
											style={{
												// webkitTransform: 'rotate(180deg)',
												height: '36px',
												left: '230px',
												width: '83%',
												borderRadius: '10px',
												marginRight: '10px'
											}}
											src="https://images2.imgbox.com/f5/31/yXxteuO4_o.jpg"
											alt="HSV Gradient"
											title="HSV Gradient"
											// className="w-100per"
										/>
										<div
											style={{
												position: 'absolute',
												zIndex: 0,
												width: '100%',
												/* left: 0px, */
												top: '-10px'
											}}
										>
											<HSVSlider
												update_function={update_hsv}
												color="hue"
												hsv={hsv}
												set_hsv={set_hsv}
												setting={settings.hsv}
												settings={settings}
											/>
										</div>
									</div>
									<HSVSlider
										update_function={update_hsv}
										color="saturation"
										hsv={hsv}
										set_hsv={set_hsv}
										setting={settings.hsv}
										settings={settings}
									/>
									<HSVSlider
										update_function={update_hsv}
										color="value"
										hsv={hsv}
										set_hsv={set_hsv}
										setting={settings.hsv}
										settings={settings}
									/>
								</div>
							</div>
						)}
					</div>
				)
			)}
		</div>
	);
};

export default GlowControl;
