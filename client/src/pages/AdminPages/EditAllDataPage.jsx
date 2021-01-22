import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { API_Products } from '../../utils';

const EditAllDataPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [ collection, set_collection ] = useState('');
	const [ search_parameter_field, set_search_parameter_field ] = useState('');
	const [ search_parameter, set_search_parameter ] = useState('');
	const [ value, set_value ] = useState('');
	const [ method, set_method ] = useState('');
	const [ property, set_property ] = useState('');
	const [ action, set_action ] = useState('');
	const [ request, set_request ] = useState('');
	const [ sale_price_request, set_sale_price_request ] = useState('');
	const [ discount_precentage, set_discount_precentage ] = useState('');
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);
	const history = useHistory();

	const batch_request = async (e) => {
		console.log({
			method,
			collection,
			search_parameter_field,
			search_parameter,
			action,
			property,
			value,
			userInfo
		});
		e.preventDefault();
		const request = await API_Products.batch_request(
			method,
			collection,
			search_parameter_field,
			search_parameter,
			action,
			property,
			value,
			userInfo
		);

		console.log({ request });
		set_request(request);
	};

	const update_sale_price = async (e) => {
		e.preventDefault();
		const request = await API_Products.set_sale_price(parseInt(discount_precentage.trim() / 100));

		console.log({ request });
		set_request(request);
	};

	const collections = [
		'users',
		'promos',
		'products',
		'orders',
		'logs',
		'features',
		'expenses',
		'emails',
		'devices',
		'contents',
		'carts',
		'affiliates'
	];
	const methods = [ 'get', 'updateMany' ];

	const actions = [ '$rename', '$set', '$unset' ];

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>Edit All Data</h1>

			<div className="form">
				<form style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					{/* <Loading loading={loading} error={error}> */}
					{/* {affiliate && ( */}
					<div>
						<Helmet>
							<title>Edit Affiliate| Glow LEDs</title>
						</Helmet>
						<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
							{/* {loading_checkboxes ? (
								<div>Loading...</div>
							) : (
								<li>
									<label htmlFor="sale_price_request">Sale Price Update</label>
									<input
										type="checkbox"
										name="sale_price_request"
										id="sale_price_request"
										onChange={(e) => {
											set_sale_price_request(e.target.checked);
										}}
									/>
								</li>
							)} */}
							<li>
								<label htmlFor="discount_precentage">Discount Percentage</label>
								<input
									type="text"
									name="discount_precentage"
									value={discount_precentage}
									id="discount_precentage"
									onChange={(e) => set_discount_precentage(e.target.value)}
								/>
							</li>
							<li>
								<button onClick={(e) => update_sale_price(e)} className="btn primary">
									Update Sale Price
								</button>
							</li>
						</ul>
						<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
							<div className="row wrap">
								<div className="column w-228px m-10px">
									<li>
										<label htmlFor="method">Method</label>
										<input
											type="text"
											name="method"
											value={method}
											id="method"
											onChange={(e) => set_method(e.target.value)}
										/>
									</li>
									<div className="ai-c h-25px mv-10px mb-30px jc-c">
										<div className="custom-select w-100per">
											<select
												className="qty_select_dropdown w-100per"
												onChange={(e) => set_method(e.target.value)}
											>
												<option key={0} defaultValue="">
													---Choose Method---
												</option>
												{methods.map((method, index) => (
													<option key={index} value={method}>
														{method}
													</option>
												))}
											</select>
											<span className="custom-arrow" />
										</div>
									</div>
									<li>
										<label htmlFor="collection">Collection</label>
										<input
											type="text"
											name="collection"
											value={collection}
											id="collection"
											onChange={(e) => set_collection(e.target.value)}
										/>
									</li>
									<div className="ai-c h-25px mv-10px mb-30px jc-c">
										<div className="custom-select w-100per">
											<select
												className="qty_select_dropdown w-100per"
												onChange={(e) => set_collection(e.target.value)}
											>
												<option key={0} defaultValue="">
													---Choose Collection---
												</option>
												{collections.map((collection, index) => (
													<option key={index} value={collection}>
														{collection}
													</option>
												))}
											</select>
											<span className="custom-arrow" />
										</div>
									</div>

									<li>
										<label htmlFor="action">Action</label>
										<input
											type="text"
											name="action"
											value={action}
											id="action"
											onChange={(e) => set_action(e.target.value)}
										/>
									</li>
									<div className="ai-c h-25px mv-10px mb-30px jc-c">
										<div className="custom-select w-100per">
											<select
												className="qty_select_dropdown w-100per"
												onChange={(e) => set_action(e.target.value)}
											>
												<option key={0} defaultValue="">
													---Choose Action---
												</option>
												{actions.map((action, index) => (
													<option key={index} value={action}>
														{action}
													</option>
												))}
											</select>
											<span className="custom-arrow" />
										</div>
									</div>

									<li>
										<label htmlFor="search_parameter_field">Search Parameter Field</label>
										<input
											type="text"
											name="search_parameter_field"
											value={search_parameter_field}
											id="search_parameter_field"
											onChange={(e) => set_search_parameter_field(e.target.value)}
										/>
									</li>
									<li>
										<label htmlFor="search_parameter">Search Parameter</label>
										<input
											type="text"
											name="search_parameter"
											value={search_parameter}
											id="search_parameter"
											onChange={(e) => set_search_parameter(e.target.value)}
										/>
									</li>
									<li>
										<label htmlFor="property">Property</label>
										<input
											type="text"
											name="property"
											value={property}
											id="property"
											onChange={(e) => set_property(e.target.value)}
										/>
									</li>
									<li>
										<label htmlFor="value">Value</label>
										<input
											type="text"
											name="value"
											value={value}
											id="value"
											onChange={(e) => set_value(e.target.value)}
										/>
									</li>
								</div>
							</div>

							<li>
								<button onClick={(e) => batch_request(e)} className="btn primary">
									Complete
								</button>
							</li>
							<li>
								<button className="btn secondary" onClick={() => history.goBack()}>
									Back
								</button>
							</li>
							{/* <li>
								<label htmlFor="request">Results</label>
								<textarea
									type="text"
									name="request"
									value={JSON.stringify(request.data)}
									id="request"
								/>
							</li> */}
						</ul>
					</div>
				</form>
			</div>
			<div>
				<label htmlFor="request">Results</label>
				<textarea
					type="text"
					className="w-100per h-99rem"
					name="request"
					value={JSON.stringify(request.data, undefined, 4)}
					id="request"
				/>
			</div>
		</div>
	);
};
export default EditAllDataPage;
