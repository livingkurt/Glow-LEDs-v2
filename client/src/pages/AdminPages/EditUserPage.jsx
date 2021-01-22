import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveUser, detailsUser } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listAffiliates } from '../../actions/affiliateActions';

const EditUserPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ first_name, set_first_name ] = useState('');
	const [ affiliate, set_affiliate ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ email, set_email ] = useState('');
	const [ is_affiliated, set_is_affiliated ] = useState(false);
	const [ isVerified, set_isVerified ] = useState(false);
	const [ isAdmin, set_isAdmin ] = useState(false);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const history = useHistory();

	const userDetails = useSelector((state) => state.userDetails);
	const { user, loading, error } = userDetails;

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates } = affiliateList;

	const dispatch = useDispatch();

	console.log({ user });

	const set_state = () => {
		set_id(user._id);
		set_first_name(user.first_name);
		set_last_name(user.last_name);
		set_email(user.email);
		set_is_affiliated(user.is_affiliated);
		set_affiliate(user.affiliate && user.affiliate._id);
		set_isVerified(user.isVerified);
		set_isAdmin(user.isAdmin);
	};
	const unset_state = () => {
		set_id('');
		set_first_name('');
		set_last_name('');
		set_email('');
		set_is_affiliated('');
		set_affiliate('');
		set_isVerified('');
		set_isAdmin('');
	};

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsUser(props.match.params.id));
				stableDispatch(detailsUser(props.match.params.id));
			} else {
				stableDispatch(detailsUser(''));
			}
			stableDispatch(listAffiliates(''));
			set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id ]
	);

	useEffect(
		() => {
			if (user) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ user ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();

		console.log({ id });
		dispatch(
			saveUser({
				_id: id,
				first_name,
				last_name,
				email,
				affiliate,
				is_affiliated,
				isVerified,
				isAdmin
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/users');
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit User' : 'Create User'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<Loading loading={loading} error={error}>
						{user && (
							<div>
								<Helmet>
									<title>Edit User | Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
									<div className="row wrap">
										<div className="column w-228px m-10px">
											<li>
												<label htmlFor="first_name">First Name</label>
												<input
													type="text"
													name="first_name"
													value={first_name}
													id="first_name"
													onChange={(e) => set_first_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="last_name">Last Name</label>
												<input
													type="text"
													name="last_name"
													value={last_name}
													id="last_name"
													onChange={(e) => set_last_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="email">Email</label>
												<input
													type="text"
													name="email"
													value={email}
													id="email"
													onChange={(e) => set_email(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="affiliate">Affiliate</label>
												<input
													type="text"
													name="affiliate"
													value={affiliate}
													id="affiliate"
													onChange={(e) => set_affiliate(e.target.value)}
												/>
											</li>
											{affiliates && (
												<div className="ai-c h-25px mv-10px mb-30px jc-c">
													<div className="custom-select w-100per">
														<select
															className="qty_select_dropdown w-100per"
															// defaultValue={{
															// 	label: user.first_name + ' ' + user.last_name,
															// 	value: user._id
															// }}
															onChange={(e) => set_affiliate(e.target.value)}
														>
															<option key={1} defaultValue="">
																---Choose Affiliate---
															</option>
															{affiliates.map((affiliate, index) => (
																<option key={index} value={affiliate._id}>
																	{affiliate.facebook_name}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="is_affiliated">Affiliated</label>
													<input
														type="checkbox"
														name="is_affiliated"
														defaultChecked={is_affiliated}
														id="is_affiliated"
														onChange={(e) => {
															set_is_affiliated(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isVerified">Verified</label>
													<input
														type="checkbox"
														name="isVerified"
														defaultChecked={isVerified}
														id="isVerified"
														onChange={(e) => {
															set_isVerified(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isAdmin">Admin</label>
													<input
														type="checkbox"
														name="isAdmin"
														defaultChecked={isAdmin}
														id="isAdmin"
														onChange={(e) => {
															set_isAdmin(e.target.checked);
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
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Users
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
export default EditUserPage;
