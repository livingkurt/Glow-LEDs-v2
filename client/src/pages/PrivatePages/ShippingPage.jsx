import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping, savePayment } from '../../actions/cartActions';
import { update } from '../../actions/userActions';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
import { validate_shipping } from '../../utils/validations';
import { state_names } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';
import { API_Orders } from '../../utils';

const ShippingPage = (props) => {
	const user_data = props.userInfo;

	const cart = useSelector((state) => state.cart);
	const { shipping } = cart;

	const [ email, set_email ] = useState('');
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ address_1, set_address_1 ] = useState('');
	const [ address_2, set_address_2 ] = useState('');
	const [ city, setCity ] = useState('');
	const [ state, setState ] = useState('');
	const [ postalCode, setPostalCode ] = useState('');
	const [ country, setCountry ] = useState('United States');
	const [ international, setInternational ] = useState(false);
	const [ save_shipping, set_save_shipping ] = useState(false);
	const [ all_shipping, set_all_shipping ] = useState([]);
	const [ loading, set_loading ] = useState(true);

	const userUpdate = useSelector((state) => state.userUpdate);

	useEffect(
		() => {
			if (user_data) {
				set_email(user_data.email);
				set_first_name(user_data.shipping.first_name);
				set_last_name(user_data.shipping.last_name);
				set_address_1(user_data.shipping.address_1);
				set_address_2(user_data.shipping.address_2);
				setCity(user_data.shipping.city);
				setState(user_data.shipping.state);
				setPostalCode(user_data.shipping.postalCode);
				setCountry(user_data.shipping.country);
				setInternational(user_data.shipping.international);
			}
			return () => {};
		},
		[ user_data ]
	);

	useEffect(
		() => {
			if (userUpdate.userInfo) {
				set_first_name(userUpdate.userInfo.shipping.first_name);
				set_last_name(userUpdate.userInfo.shipping.last_name);
				set_address_1(userUpdate.userInfo.shipping.address_1);
				set_address_2(userUpdate.userInfo.shipping.address_2);
				setCity(userUpdate.userInfo.shipping.city);
				setState(userUpdate.userInfo.shipping.state);
				setPostalCode(userUpdate.userInfo.shipping.postalCode);
				setCountry(userUpdate.userInfo.shipping.country);
				setInternational(userUpdate.userInfo.shipping.international);
			}

			return () => {};
		},
		[ userUpdate ]
	);

	useEffect(
		() => {
			if (shipping) {
				set_email(shipping.email);
				set_first_name(shipping.first_name);
				set_last_name(shipping.last_name);
				set_address_1(shipping.address_1);
				set_address_2(shipping.address_2);
				setCity(shipping.city);
				setState(shipping.state);
				setPostalCode(shipping.postalCode);
				setCountry(shipping.country);
				setInternational(shipping.international);
			}

			return () => {};
		},
		[ shipping ]
	);

	useEffect(() => {
		get_all_shipping();

		return () => {};
	}, []);

	const get_all_shipping = async () => {
		const { data } = await API_Orders.get_all_shipping();
		set_all_shipping(data);
		console.log({ data });
	};

	// const get_all_shipping = async () => {
	// 	const request = await API_Orders.all_shipping();
	// 	console.log(request);
	// };

	const [ email_validations, set_email_validations ] = useState('');
	const [ first_name_validations, set_first_name_validations ] = useState('');
	const [ last_name_validations, set_last_name_validations ] = useState('');
	const [ address_validations, set_address_validations ] = useState('');
	const [ city_validations, set_city_validations ] = useState('');
	const [ state_validations, set_state_validations ] = useState('');
	const [ postal_code_validations, set_postal_code_validations ] = useState('');
	const [ country_validations, set_country_validations ] = useState('');
	const [ international_validations, set_international_validations ] = useState('');
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const data = {
			email,
			first_name,
			last_name,
			address_1,
			address_2,
			city,
			state,
			postalCode,
			country,
			international
		};
		const request = validate_shipping(data);
		set_email_validations(request.errors.email);
		set_first_name_validations(request.errors.first_name);
		set_last_name_validations(request.errors.last_name);
		set_address_validations(request.errors.address_1);
		set_city_validations(request.errors.city);
		set_state_validations(request.errors.state);
		set_postal_code_validations(request.errors.postalCode);
		set_country_validations(request.errors.country);
		set_international_validations(request.errors.international);

		console.log(request);
		console.log(request.errors.email);
		if (request.isValid) {
			dispatch(
				saveShipping({
					first_name,
					last_name,
					email,
					address_1,
					address_2,
					city,
					state,
					postalCode,
					country: international ? country : 'United States',
					international
				})
			);
			const paymentMethod = 'stripe';
			dispatch(savePayment({ paymentMethod }));
			console.log({ save_shipping });
			if (save_shipping) {
				dispatch(
					update({
						...user_data,
						shipping: {
							first_name,
							last_name,
							email,
							address_1,
							address_2,
							city,
							state,
							postalCode,
							country: international ? country : 'United States',
							international
						}
					})
				);
			}
			props.history.push('placeorder');
		}
	};
	setTimeout(() => {
		set_loading(false);
	}, 500);

	const update_shipping = (shipping) => {
		shipping = JSON.parse(shipping);
		console.log({ shipping });
		set_email(shipping.email);
		set_first_name(shipping.first_name);
		set_last_name(shipping.last_name);
		set_address_1(shipping.address_1);
		set_address_2(shipping.address_2);
		setCity(shipping.city);
		setState(shipping.state);
		setPostalCode(shipping.postalCode);
		setCountry(shipping.country);
		setInternational(shipping.international);
	};

	return (
		<div>
			<Helmet>
				<title>Shipping | Glow LEDs</title>
				<meta property="og:title" content="Shipping" />
				<meta name="twitter:title" content="Shipping" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/shipping" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/shipping" />
			</Helmet>
			<CheckoutSteps step1 step2 />

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<ul className="form-container w-36rem max-w-36rem">
						<li>
							<h1 style={{ textAlign: 'center', width: '100%' }}>Shipping</h1>
						</li>
						{user_data &&
						user_data.isAdmin && (
							<li>
								<div className="ai-c h-25px mv-10px mb-30px jc-c">
									<div className="custom-select w-100per">
										<select
											className="qty_select_dropdown w-100per"
											onChange={(e) => update_shipping(e.target.value)}
										>
											<option key={1} defaultValue="">
												---Choose Shipping for Order---
											</option>
											{all_shipping &&
												all_shipping.map((shipping, index) => (
													<option key={index} value={JSON.stringify(shipping)}>
														{shipping.first_name} {shipping.last_name}
													</option>
												))}
										</select>
										<span className="custom-arrow" />
									</div>
								</div>
							</li>
						)}
						<li>
							<label htmlFor="email">Email</label>
							<input
								type="text"
								value={email}
								name="email"
								id="email"
								onChange={(e) => set_email(e.target.value)}
							/>
						</li>
						{email_validations}
						<li>
							<label htmlFor="first_name">First Name</label>
							<input
								type="text"
								value={first_name}
								name="first_name"
								id="first_name"
								onChange={(e) => set_first_name(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{first_name_validations}
						</label>
						<li>
							<label htmlFor="last_name">Last Name</label>
							<input
								type="text"
								value={last_name}
								name="last_name"
								id="last_name"
								onChange={(e) => set_last_name(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{last_name_validations}
						</label>
						<li>
							<label htmlFor="address_1">Address</label>
							<input
								type="text"
								value={address_1}
								name="address_1"
								id="address_1"
								onChange={(e) => set_address_1(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{address_validations}
						</label>
						<li>
							<label htmlFor="address_2">Apt/Suite</label>
							<input
								type="text"
								value={address_2}
								name="address_2"
								id="address_2"
								onChange={(e) => set_address_2(e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="city">City</label>
							<input
								type="text"
								value={city}
								name="city"
								id="city"
								onChange={(e) => setCity(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{city_validations}
						</label>
						{!international && (
							<li>
								<label className="mb-1rem" htmlFor="state">
									State
								</label>
								<div className="ai-c h-25px mb-2px jc-c">
									<div className="custom-select">
										<select
											className="qty_select_dropdown"
											onChange={(e) => setState(e.target.value)}
											value={state}
										>
											{state_names.map((state, index) => (
												<option key={index} value={state}>
													{state}
												</option>
											))}
										</select>
										<span className="custom-arrow" />
									</div>
								</div>
							</li>
						)}
						{international && (
							<li>
								<label htmlFor="state">State</label>
								<input
									type="text"
									value={state}
									name="state"
									id="state"
									onChange={(e) => setState(e.target.value)}
								/>
							</li>
						)}
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{state_validations}
						</label>
						<li>
							<label htmlFor="postalCode">Postal Code</label>
							<input
								type="text"
								value={postalCode}
								name="postalCode"
								id="postalCode"
								onChange={(e) => setPostalCode(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{postal_code_validations}
						</label>
						{loading ? (
							<div>Loading...</div>
						) : (
							<div>
								<li>
									<label htmlFor="international">International</label>
									<input
										type="checkbox"
										name="international"
										// defaultChecked={international ? 'checked' : 'unchecked'}
										defaultValue={international}
										defaultChecked={international}
										value={international}
										id="international"
										onChange={(e) => {
											setInternational(e.target.checked);
										}}
									/>
								</li>

								{international && (
									<li>
										<label htmlFor="country">Country</label>
										<input
											type="text"
											value={country}
											name="country"
											id="country"
											onChange={(e) => setCountry(e.target.value)}
										/>
									</li>
								)}
							</div>
						)}

						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{country_validations}
						</label>

						<li>
							<button type="submit" className="btn primary">
								Continue
							</button>
						</li>
						{user_data && loading ? (
							<div>Loading...</div>
						) : (
							<div>
								<li>
									<label htmlFor="save_shipping">Save Shipping</label>
									<input
										type="checkbox"
										name="save_shipping"
										// defaultChecked={save_shipping ? 'checked' : 'unchecked'}
										defaultValue={save_shipping}
										defaultChecked={save_shipping}
										// value={save_shipping}
										id="save_shipping"
										onChange={(e) => {
											set_save_shipping(e.target.checked);
										}}
									/>
								</li>
							</div>
						)}
					</ul>
				</form>
			</div>
		</div>
	);
};
export default ShippingPage;
