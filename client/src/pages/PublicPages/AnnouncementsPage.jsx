import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';

const AnnouncementPage = (props) => {
	// const history = useHistory();
	// const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	// const [ test, set_test ] = useState(true);
	// const emailDetails = useSelector((state) => state.emailDetails);
	// const { email } = emailDetails;

	// const userLogin = useSelector((state) => state.userLogin);
	// const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	console.log({ emails });

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listEmails('Announcements'));
			return () => {};
		},
		[ stableDispatch ]
	);

	useEffect(
		() => {
			const active_email = emails.find((email) => email.active === true);
			if (active_email) {
				stableDispatch(detailsEmail(active_email._id));
			}
			return () => {};
		},
		[ emails, stableDispatch ]
	);

	// setTimeout(() => {
	// 	set_loading_checkboxes(false);
	// }, 500);

	// const date = new Date();

	// const today = date.toISOString();
	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Announcements | Glow LEDs</title>
				<meta property="og:title" content="Featured" />
				<meta name="twitter:title" content="Featured" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/featured" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/featured" />
				<meta
					name="description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
				<meta
					property="og:description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
				<meta
					name="twitter:description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
			</Helmet>
			<div className="jc-c">
				<h1>Annoucements</h1>
			</div>

			{emails &&
				emails.slice(0).reverse().map((email) => {
					return (
						<div className="home_page_divs">
							<div style={{ backgroundColor: '#333333', padding: '20px' }} className="br-10px">
								<h4
									style={{
										textAlign: 'center',
										fontFamily: 'helvetica',
										width: '100%',
										margin: '0 auto',
										lineHeight: '50px',
										color: 'white',
										fontSize: '2em'
									}}
								>
									{email.h1}
								</h4>
							</div>
							<div style={{ padding: '20px' }}>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									{email.show_image && (
										<table width="100%" style={{ maxWidth: '900px' }}>
											<tr>
												<td>
													<img
														src={email.image}
														alt="Promo Image"
														title="Promo Image"
														style={{
															textAlign: 'center',
															width: '100%',
															borderRadius: '20px'
														}}
													/>
												</td>
											</tr>
										</table>
									)}
								</div>
								<h4
									style={{
										textAlign: 'center',
										fontFamily: 'helvetica',
										color: 'white',
										fontSize: '1.5em',
										marginTop: '20px',
										marginBottom: '0'
									}}
								>
									{email.h2}
								</h4>
								<p
									style={{
										fontSize: '16px',
										lineHeight: '30px',
										maxWidth: '800px',
										textAlign: 'center',
										width: '100%',
										margin: '20px auto',
										color: 'white'
									}}
								>
									{email.p}
								</p>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center'
									}}
								>
									<a
										href={email.link}
										style={{
											backgroundColor: '#4c4f60',
											color: 'white',
											borderRadius: '10px',
											border: 0,
											padding: '15px'
										}}
									>
										<h4
											style={{
												fontFamily: 'helvetica',
												margin: 0,
												fontSize: '1.2em',
												textAlign: 'center'
											}}
										>
											{email.button}
										</h4>
									</a>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};
export default AnnouncementPage;
