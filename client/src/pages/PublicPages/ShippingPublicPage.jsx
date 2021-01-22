import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping, savePayment } from '../../actions/cartActions';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
import { validate_shipping } from '../../utils/validations';
import { state_names } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';

const ShippingPublicPage = (props) => {
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
	const [ loading, set_loading ] = useState(true);

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
			props.history.push('placeorder');
		}
	};
	setTimeout(() => {
		set_loading(false);
	}, 500);

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
								<div className="ai-c h-25px mb-15px jc-c">
									<div className="custom-select">
										<select
											className="qty_select_dropdown"
											onChange={(e) => setState(e.target.value)}
											value={state && state}
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
					</ul>
				</form>
			</div>
		</div>
	);
};
export default ShippingPublicPage;
