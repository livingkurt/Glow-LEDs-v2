import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAffiliate, detailsAffiliate } from '../../actions/affiliateActions';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listUsers } from '../../actions/userActions';

const CreateAffiliatePage = (props) => {
	const user_data = props.userInfo;
	console.log({ user_data });
	const [ id, set_id ] = useState('');
	const [ user, set_user ] = useState('');
	const [ artist_name, set_artist_name ] = useState('');
	const [ instagram_handle, set_instagram_handle ] = useState('');
	const [ facebook_name, set_facebook_name ] = useState('');
	const [ percentage_off, set_percentage_off ] = useState('');
	const [ promo_code, set_promo_code ] = useState('');
	const [ funds_generated, set_funds_generated ] = useState('');
	const [ sponsor, set_sponsor ] = useState('');
	const [ promoter, set_promoter ] = useState('');
	const [ style, set_style ] = useState('');
	const [ inspiration, set_inspiration ] = useState('');
	const [ bio, set_bio ] = useState('');
	const [ link, set_link ] = useState('');
	const [ active, set_active ] = useState('');

	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const history = useHistory();

	const affiliateDetails = useSelector((state) => state.affiliateDetails);
	const { affiliate, loading, error } = affiliateDetails;

	const set_state = () => {
		set_id(affiliate._id);
		set_user(affiliate.user && affiliate.user._id);
		set_artist_name(affiliate.artist_name);
		set_instagram_handle(affiliate.instagram_handle);
		set_facebook_name(affiliate.facebook_name);
		set_percentage_off(affiliate.percentage_off);
		set_promo_code(affiliate.promo_code);
		set_funds_generated(affiliate.funds_generated);
		set_promoter(affiliate.promoter);
		set_sponsor(affiliate.sponsor);
		set_active(affiliate.active);
		set_bio(affiliate.bio);
		set_link(affiliate.link);
		set_style(affiliate.style);
		set_inspiration(affiliate.inspiration);
	};
	const unset_state = () => {
		set_id('');
		set_user('');
		set_artist_name('');
		set_instagram_handle('');
		set_facebook_name('');
		set_percentage_off('');
		set_promo_code('');
		set_funds_generated('');
		set_promoter('');
		set_sponsor('');
		set_active('');
		set_bio('');
		set_link('');
		set_style('');
		set_inspiration('');
	};

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsAffiliate(props.match.params.id));
				stableDispatch(detailsAffiliate(props.match.params.id));
			} else {
				stableDispatch(detailsAffiliate(''));
			}
			stableDispatch(listUsers(''));
			set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id ]
	);

	useEffect(
		() => {
			if (affiliate) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ affiliate ]
	);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveAffiliate({
				_id: id,
				user: props.userInfo._id,
				artist_name,
				instagram_handle,
				facebook_name,
				percentage_off,
				promo_code,
				funds_generated,
				sponsor,
				promoter,
				active,
				bio,
				link,
				style,
				inspiration
			})
		);
		e.target.reset();
		unset_state();
		if (props.match.params.id) {
			history.push('/secure/account/profile');
		} else {
			history.push('/secure/account/affiliate_sign_up_complete');
		}
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Update Affiliate' : 'Affiliate Sign Up'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{affiliate && (
							<div>
								<Helmet>
									<title>Edit Affiliate| Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
									<div className="row wrap">
										<div className="column w-228px m-10px">
											{/* <li>
												<label htmlFor="user">User</label>
												<input
													type="text"
													name="user"
													value={user}
													id="user"
													onChange={(e) => set_user(e.target.value)}
												/>
											</li>
											{users && (
												<div className="ai-c h-25px mv-10px mb-30px jc-c">
													<div className="custom-select w-100per">
														<select
															className="qty_select_dropdown w-100per"
															// defaultValue={{
															// 	label: user.first_name + ' ' + user.last_name,
															// 	value: user._id
															// }}
															onChange={(e) => set_user(e.target.value)}
														>
															<option key={1} defaultValue="">
																---Choose User---
															</option>
															{users.map((user, index) => (
																<option key={index} value={user._id}>
																	{user.first_name} {user.last_name}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											)} */}

											<li>
												<label htmlFor="artist_name">Artist Name</label>
												<input
													type="text"
													name="artist_name"
													value={artist_name}
													id="artist_name"
													placeholder="Glover Name..."
													onfocus="this.placeholder = ''"
													onblur="this.placeholder = 'Glover Name...'"
													onChange={(e) => set_artist_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="instagram_handle">Instagram Handle</label>
												<input
													type="text"
													name="instagram_handle"
													value={instagram_handle}
													id="instagram_handle"
													onChange={(e) => set_instagram_handle(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="facebook_name">Facebook Name</label>
												<input
													type="text"
													name="facebook_name"
													value={facebook_name}
													id="facebook_name"
													onChange={(e) => set_facebook_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="style">Your Style</label>
												<input
													type="text"
													name="style"
													value={style}
													placeholder="Wave Tuts, Clusters, Whips..."
													onfocus="this.placeholder = ''"
													onblur="this.placeholder = 'Wave Tuts, Clusters, Whips...'"
													id="style"
													onChange={(e) => set_style(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="inspiration">Inspiration</label>
												<input
													type="text"
													name="inspiration"
													value={inspiration}
													placeholder="Flow, Megasloth, Jest..."
													onfocus="this.placeholder = ''"
													onblur="this.placeholder = ''Flow, Megasloth, Jest..."
													id="inspiration"
													onChange={(e) => set_inspiration(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="bio">Bio</label>
												<textarea
													className="edit_product_textarea"
													name="bio"
													placeholder="Write a little something to introduce yourself..."
													onfocus="this.placeholder = ''"
													onblur="this.placeholder = 'Write a little something to introduce yourself...'"
													defaultValue={bio}
													id="bio"
													onChange={(e) => set_bio(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="link">Website</label>
												<input
													type="text"
													name="link"
													value={link}
													placeholder="https://www..."
													onfocus="this.placeholder = ''"
													onblur="this.placeholder = 'https://www...'"
													id="link"
													onChange={(e) => set_link(e.target.value)}
												/>
											</li>
										</div>
									</div>
									<li>
										<button type="submit" className="btn primary">
											{props.match.params.id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Profile
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
export default CreateAffiliatePage;
