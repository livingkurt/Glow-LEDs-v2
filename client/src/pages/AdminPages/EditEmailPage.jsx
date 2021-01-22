import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveEmail, detailsEmail, listEmails } from '../../actions/emailActions';
import { useHistory, Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

const EditEmailPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ email_type, set_email_type ] = useState('');
	const [ email_h1, set_email_h1 ] = useState('');
	const [ email_image, set_email_image ] = useState('');
	const [ email_show_image, set_email_show_image ] = useState('');
	const [ email_h2, set_email_h2 ] = useState('');
	const [ email_p, set_email_p ] = useState('');
	const [ email_button, set_email_button ] = useState('');
	const [ email_link, set_email_link ] = useState('');
	const [ email_active, set_email_active ] = useState(true);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const history = useHistory();

	const emailDetails = useSelector((state) => state.emailDetails);
	const { email, loading, error } = emailDetails;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	const dispatch = useDispatch();

	const set_state = () => {
		props.match.params.id && set_id(email._id);
		set_email_type(email.email_type);
		set_email_h1(email.h1);
		set_email_image(email.image);
		set_email_show_image(email.show_image);
		set_email_h2(email.h2);
		set_email_p(email.p);
		set_email_button(email.button);
		set_email_link(email.link);
		set_email_active(email.active);
	};
	const unset_state = () => {
		set_id('');
		set_email_type('');
		set_email_h1('');
		set_email_image('');
		set_email_show_image('');
		set_email_h2('');
		set_email_p('');
		set_email_button('');
		set_email_link('');
		set_email_active('');
	};

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsEmail(props.match.params.id));
				stableDispatch(detailsEmail(props.match.params.id));
			} else {
				stableDispatch(detailsEmail(''));
			}
			stableDispatch(listEmails(''));

			set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id ]
	);

	const use_template = (e) => {
		dispatch(detailsEmail(e.target.value));
	};

	useEffect(
		() => {
			if (email) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ email ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveEmail({
				_id: props.match.params.id && id,
				email_type,
				h1: email_h1,
				image: email_image,
				show_image: email_show_image,
				h2: email_h2,
				p: email_p,
				button: email_button,
				link: email_link,
				active: email_active
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/emails');
	};

	const email_types = [
		'Announcements',
		'Reviews',
		'Order',
		'Reassured',
		'Manufactured',
		'Packaged',
		'Shipped',
		'Delivered',
		'Refunded',
		'Account Created',
		'Reset Password',
		'Password Changed'
	];

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Email' : 'Create Email'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{email && (
							<div>
								<Helmet>
									<title>Edit Email | Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '50rem', marginBottom: '20px' }}>
									<li>
										<div className="ai-c h-25px mb-15px jc-c">
											<div className="custom-select">
												<select
													className="qty_select_dropdown"
													onChange={(e) => use_template(e)}
												>
													<option key={1} defaultValue="">
														---Template---
													</option>
													{emails.map((email, index) => (
														<option key={index} value={email._id}>
															{email.h1}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</li>
									<div className="row wrap jc-c">
										<div className="column w-100per m-10px">
											{/* <li>
												<label htmlFor="email_type">Email Type</label>
												<input
													type="text"
													name="email_type"
													value={email_type}
													id="email_type"
													onChange={(e) => set_email_type(e.target.value)}
												/>
											</li>
											{console.log({ email_active })} */}

											<li>
												<div className="ai-c h-25px mb-15px jc-c">
													<div className="custom-select">
														<select
															className="qty_select_dropdown"
															onChange={(e) => set_email_type(e.target.value)}
															value={email_type}
														>
															<option key={1} defaultValue="">
																---Email Type---
															</option>
															{email_types.map((type, index) => (
																<option key={index} value={type}>
																	{type}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											</li>
											<li>
												<label htmlFor="email_h1">H1</label>
												<input
													type="text"
													name="email_h1"
													value={email_h1}
													id="email_h1"
													onChange={(e) => set_email_h1(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="email_image">Image</label>
												<input
													type="text"
													name="email_image"
													value={email_image}
													id="email_image"
													onChange={(e) => set_email_image(e.target.value)}
												/>
											</li>

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="email_show_image">Show Image</label>
													<input
														type="checkbox"
														name="email_show_image"
														defaultChecked={email_show_image}
														id="email_show_image"
														onChange={(e) => {
															set_email_show_image(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="email_h2">H2</label>
												<input
													type="text"
													name="email_h2"
													value={email_h2}
													id="email_h2"
													onChange={(e) => set_email_h2(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="email_p">P</label>
												<textarea
													className="edit_product_textarea"
													name="email_p"
													value={email_p}
													id="email_p"
													onChange={(e) => set_email_p(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="email_button">Button</label>
												<input
													type="text"
													name="email_button"
													value={email_button}
													id="email_button"
													onChange={(e) => set_email_button(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="email_link">Link</label>
												<input
													type="text"
													name="email_link"
													value={email_link}
													id="email_link"
													onChange={(e) => set_email_link(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="email_active">Active</label>
													<input
														type="checkbox"
														name="email_active"
														defaultChecked={email_active}
														id="email_active"
														onChange={(e) => {
															set_email_active(e.target.checked);
														}}
													/>
												</li>
											)}
										</div>
									</div>
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<Link to="/secure/glow/emails/">
											<button className="btn secondary w-100per">Back to Emails</button>
										</Link>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Template
										</button>
									</li>
								</ul>
							</div>
						)}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditEmailPage;
