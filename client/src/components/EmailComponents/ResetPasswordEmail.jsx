import React, { useEffect, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { API_Emails } from '../../utils';

const ResetPasswordEmail = () => {
	const history = useHistory();
	const emailDetails = useSelector((state) => state.emailDetails);
	const { email } = emailDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	console.log({ emails });

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listEmails('Reset Password'));
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

	const jsx = (
		<body style={{ padding: 0, margin: 0 }}>
			<div>
				{email && (
					<div
						style={{
							fontFamily: 'helvetica',
							margin: '0px',
							padding: '0px',
							width: '100%',
							borderRadius: '20px'
						}}
					>
						<div style={{ backgroundColor: '#333333', padding: '20px' }}>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<table width="100%" style={{ maxWidth: '500px' }}>
									<tr>
										<td>
											<img
												src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png"
												alt="Glow LEDs Logo"
												title="Glow LEDs Logo"
												style={{
													textAlign: 'center',
													width: '100%',
													marginRight: '20px'
												}}
											/>
										</td>
									</tr>
								</table>
							</div>
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
						<div style={{ backgroundColor: '#5f5f5f', padding: '20px' }}>
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
						<div style={{ backgroundColor: '#333333', padding: '20px' }}>
							<div
								style={{
									marginLeft: '10px',
									display: 'flex',
									justifyContent: 'space-between',
									maxWidth: '250px',
									width: '100%',
									margin: '0 auto',
									color: 'white'
								}}
							>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.facebook.com/Glow-LEDscom-100365571740684"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="fab fa-facebook zoom" style={{ color: 'white' }} />
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.instagram.com/glow_leds/"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="fab fa-instagram zoom" style={{ color: 'white' }} />
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="fab fa-youtube zoom" style={{ color: 'white' }} />
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://soundcloud.com/ntre/tracks"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="fab fa-soundcloud" style={{ color: 'white' }} />
									</a>
								</div>
							</div>
							<div
								style={{
									borderBottom: '1px white solid',
									maxWidth: '600px',
									width: '100%',
									margin: '15px auto'
								}}
							/>
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								Our mailing address is: <br />404 Kenniston Dr Apt D, Austin, TX 78752{' '}
							</p>
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								If you have any questions or concerns <br /> You can visit our {' '}
								<a
									href="https://www.glow-leds.com/pages/faq"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									frequently asked questions
								</a>{' '}
								page or contact us{' '}
								<a
									href="https://www.glow-leds.com/pages/contact"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									here
								</a>
								.
							</p>
						</div>
					</div>
				)}
			</div>
		</body>
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const save_html = async () => {
		const data = await API_Emails.save_html(email_template, email, userInfo.token);
		console.log(data);
		console.log('Success');
	};

	console.log({ email_template });
	return (
		<div className="">
			<div className="jc-b mb-1rem">
				<button className="btn primary" onClick={() => history.goBack()}>
					Back to Emails
				</button>
				<button className="btn primary mb-1rem" onClick={() => save_html()}>
					Save HTML
				</button>
			</div>
			{jsx}
		</div>
	);
};

export default ResetPasswordEmail;
