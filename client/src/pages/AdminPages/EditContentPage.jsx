import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveContent, detailsContent } from '../../actions/contentActions';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

const EditContentPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ home_page, set_home_page ] = useState({});
	const [ about_page, set_about_page ] = useState({});
	const [ banner, set_banner ] = useState({});

	const [ active, set_active ] = useState(true);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ using_template, set_using_template ] = useState(false);

	const history = useHistory();

	const contentDetails = useSelector((state) => state.contentDetails);
	const { content, loading, error } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;

	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);

	const set_state = () => {
		set_id(content._id);
		set_home_page(content.home_page);
		set_banner(content.banner);
		set_about_page(content.about_page);
		set_active(content.active);
	};
	const unset_state = () => {
		set_id('');
		set_home_page('');
		set_banner('');
		set_about_page('');
		set_active(true);
	};

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsContent(props.match.params.id));
				stableDispatch(detailsContent(props.match.params.id));
			} else {
				stableDispatch(detailsContent(''));
			}

			// set_loading_data(false);
			set_state();
			return () => {};
		},
		[ stableDispatch ]
	);

	const use_template = (e) => {
		dispatch(detailsContent(e.target.value));
		set_using_template(true);
	};

	useEffect(
		() => {
			if (content) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ content ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log({ id });
		dispatch(
			saveContent({
				_id: using_template ? null : id,
				home_page,
				banner,
				about_page,
				active
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/contents');
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Content' : 'Create Content'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{content && (
							<div>
								<Helmet>
									<title>Edit Content | Glow LEDs</title>
								</Helmet>

								<ul
									className="edit-form-container jc-b"
									style={{ maxWidth: '105rem', marginBottom: '20px' }}
								>
									<div className="ai-c h-25px mb-15px jc-c">
										<div className="custom-select">
											<select className="qty_select_dropdown" onChange={(e) => use_template(e)}>
												<option key={1} defaultValue="">
													---Choose Product as a Template---
												</option>
												{contents.map((content, index) => (
													<option key={index} value={content._id}>
														{content.home_page.h1}
													</option>
												))}
											</select>
											<span className="custom-arrow" />
										</div>
									</div>
									<div className="row wrap jc-b">
										<div className="w-228px m-10px">
											<h2>Home Page</h2>
											<li>
												<label htmlFor="home_page_h1">Home Page H1</label>
												<input
													type="text"
													name="home_page_h1"
													value={home_page && home_page.h1}
													id="home_page_h1"
													onChange={(e) =>
														set_home_page({ ...home_page, h1: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="home_page_image">Home Page Image</label>
												<input
													type="text"
													name="home_page_image"
													value={home_page && home_page.image}
													id="home_page_image"
													onChange={(e) =>
														set_home_page({ ...home_page, image: e.target.value })}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="show_image">Show Image</label>
													<input
														type="checkbox"
														name="show_image"
														// defaultChecked={show_image ? 'checked' : 'unchecked'}
														// defaultValue={show_image}
														defaultChecked={home_page && home_page.show_image}
														// value={show_image && show_image ? '1' : '0'}
														id="show_image"
														onChange={(e) => {
															set_home_page({
																...home_page,
																show_image: e.target.checked
															});
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="home_page_video">Home Page Video</label>
												<input
													type="text"
													name="home_page_video"
													value={home_page && home_page.video}
													id="home_page_video"
													onChange={(e) =>
														set_home_page({ ...home_page, video: e.target.value })}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="show_video">Show Video</label>
													<input
														type="checkbox"
														name="show_video"
														// defaultChecked={show_video ? 'checked' : 'unchecked'}
														// defaultValue={show_video}
														defaultChecked={home_page && home_page.show_video}
														// value={show_video && show_video ? '1' : '0'}
														id="show_video"
														onChange={(e) => {
															set_home_page({
																...home_page,
																show_video: e.target.checked
															});
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="home_page_h2">Home Page H2</label>
												<input
													type="text"
													name="home_page_h2"
													value={home_page && home_page.h2}
													id="home_page_h2"
													onChange={(e) =>
														set_home_page({ ...home_page, h2: e.target.value })}
												/>
											</li>

											<li>
												<label htmlFor="home_page_p">Home Page P</label>
												<textarea
													className="edit_product_textarea"
													name="home_page_p"
													value={home_page && home_page.p}
													id="home_page_p"
													onChange={(e) => set_home_page({ ...home_page, p: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="home_page_button">Home Page Button</label>
												<input
													type="text"
													name="home_page_button"
													value={home_page && home_page.button}
													id="home_page_button"
													onChange={(e) =>
														set_home_page({ ...home_page, button: e.target.value })}
												/>
											</li>

											<li>
												<label htmlFor="home_page_link">Home Page Link</label>
												<input
													type="text"
													name="home_page_link"
													value={home_page && home_page.link}
													id="home_page_link"
													onChange={(e) =>
														set_home_page({ ...home_page, link: e.target.value })}
												/>
											</li>
										</div>

										<div className="w-228px m-10px">
											<h2>Banner</h2>
											<li>
												<label htmlFor="banner_label">Banner Label</label>
												<input
													type="text"
													name="banner_label"
													value={banner && banner.label}
													id="banner_label"
													onChange={(e) => set_banner({ ...banner, label: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="banner_button_text">Banner Button Text</label>
												<input
													type="text"
													name="banner_button_text"
													value={banner && banner.button}
													id="banner_button_text"
													onChange={(e) => set_banner({ ...banner, button: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="banner_link">Banner Link</label>
												<input
													type="text"
													name="banner_link"
													value={banner && banner.link}
													id="banner_link"
													onChange={(e) => set_banner({ ...banner, link: e.target.value })}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="active">Active?</label>
													<input
														type="checkbox"
														name="active"
														// defaultChecked={active ? 'checked' : 'unchecked'}
														// defaultValue={active}
														defaultChecked={active}
														// value={active && active ? '1' : '0'}
														id="active"
														onChange={(e) => {
															set_active(e.target.checked);
														}}
													/>
												</li>
											)}
										</div>

										<div className="w-228px m-10px">
											<h2>About Page</h2>
											<li>
												<label htmlFor="about_page_kurt_p">About Page Kurt P</label>
												<textarea
													className="edit_product_textarea"
													name="about_page_kurt_p"
													value={about_page && about_page.kurt_p}
													id="about_page_kurt_p"
													onChange={(e) =>
														set_about_page({ ...about_page, kurt_p: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="about_page_destanye_p">About Page Kurt P</label>
												<textarea
													className="edit_product_textarea"
													name="about_page_destanye_p"
													value={about_page && about_page.destanye_p}
													id="about_page_destanye_p"
													onChange={(e) =>
														set_about_page({ ...about_page, destanye_p: e.target.value })}
												/>
											</li>
										</div>
									</div>
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Contents
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
export default EditContentPage;
