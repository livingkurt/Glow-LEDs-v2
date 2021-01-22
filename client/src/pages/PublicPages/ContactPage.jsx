import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contact } from '../../actions/userActions';
import { validate_contact } from '../../utils/validations';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { humanize } from '../../utils/helper_functions';
import ReactFilestack from 'filestack-react';
import { saveFeature } from '../../actions/featureActions';
require('dotenv').config();

const ContactPage = (props) => {
	const dispatch = useDispatch();
	const userInfo = props.userInfo;
	// console.log({ userInfo });

	const [ first_name, set_first_name ] = useState(userInfo ? userInfo.first_name : '');
	const [ last_name, set_last_name ] = useState(userInfo ? userInfo.last_name : '');
	const [ email, set_email ] = useState(userInfo ? userInfo.email : '');
	const [ order_number, set_order_number ] = useState(userInfo ? userInfo.order_number : '');
	const [ reason_for_contact, set_reason_for_contact ] = useState(
		props.match.params.reason ? props.match.params.reason : ''
	);
	const [ message, set_message ] = useState('');
	const [ song_id, set_song_id ] = useState('');
	const [ instagram_handle, set_instagram_handle ] = useState('');
	const [ facebook_name, set_facebook_name ] = useState('');
	const [ artist_name, set_artist_name ] = useState('');
	const [ inspirational_pictures, set_inspirational_pictures ] = useState([]);

	const [ first_name_validations, set_first_name_Validations ] = useState('');
	const [ last_name_validations, set_last_name_Validations ] = useState('');
	const [ email_validations, set_email_validations ] = useState('');
	const [ order_number_validations, set_order_number_validations ] = useState('');
	const [ reason_for_contact_validations, set_reason_for_contact_validations ] = useState('');
	const [ message_validations, set_message_validations ] = useState('');

	const userContact = useSelector((state) => state.userContact);
	const { loading, completed, error } = userContact;

	useEffect(
		() => {
			set_reason_for_contact(props.match.params.reason);
			return () => {};
		},
		[ props.match.params.reason ]
	);
	useEffect(
		() => {
			if (completed) {
				props.history.push('/account/emailsent');
			}

			return () => {};
		},
		[ completed, props.history ]
	);

	let request;
	const sendEmail = (e) => {
		e.preventDefault();

		if ([ 'order_issues', 'returns', 'technical_support' ].includes(reason_for_contact)) {
			set_order_number_validations('55555555');
		}
		const data = {
			first_name,
			last_name,
			email,
			reason_for_contact,
			message
		};
		request = validate_contact(data);

		set_first_name_Validations(request.errors.first_name);
		set_last_name_Validations(request.errors.last_name);
		set_email_validations(request.errors.email);
		// if ([ 'order_issues', 'returns', 'technical_support' ].includes(reason_for_contact)) {
		// set_order_number_validations(request.errors.order_number);
		// }
		// else {
		set_order_number_validations(request.errors.order_number);
		// }
		set_reason_for_contact_validations(request.errors.reason_for_contact);
		set_message_validations(request.errors.message);

		// console.log(request);
		if (request.isValid) {
			const reason = humanize(reason_for_contact);
			dispatch(
				contact(
					first_name,
					last_name,
					email,
					order_number,
					reason,
					message,
					inspirational_pictures,
					artist_name,
					instagram_handle,
					facebook_name,
					song_id
				)
			);
			if (reason_for_contact === 'submit_content_to_be_featured') {
				dispatch(
					saveFeature({
						user: userInfo,
						artist_name,
						instagram_handle,
						facebook_name,
						product: '',
						song_id,
						release_date: '2020-12-29'
					})
				);
			}
			// set_last_name_Validations('');
			// set_first_name_Validations('');
			// set_email_validations('');
			// set_order_number_validations('');
			// set_reason_for_contact_validations('');
			// set_message_validations('');
			// // e.target.reset();
			// document.getElementsByName('first_name').value = '';
			// document.getElementsByName('last_name').value = '';
			// document.getElementsByName('email').value = '';
			// document.getElementsByName('order_number').value = '';
			// document.getElementsByName('reason_for_contact').value = '';
			// document.getElementsByName('message').value = '';
		}
	};

	const finishUploading = async (fsData) => {
		const pictures = [];
		const src = fsData.filesUploaded[0].url;
		// console.log(src);
		set_inspirational_pictures((inspirational_pictures) => [ ...inspirational_pictures, src ]);
	};
	// console.log(process.env.REACT_APP_FILESTACK_API);

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Contact | Glow LEDs</title>
				<meta property="og:title" content="Contact" />
				<meta name="twitter:title" content="Contact" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/contact" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/contact" />
				<meta
					name="description"
					content="If you have any questions, do not hesitate to use our contact page for support."
				/>
				<meta
					property="og:description"
					content="If you have any questions, do not hesitate to use our contact page for support."
				/>
				<meta
					name="twitter:description"
					content="If you have any questions, do not hesitate to use our contact page for support."
				/>
			</Helmet>
			<div className="jc-c">
				<h1>Contact</h1>
			</div>
			<div className="column jc-c">
				<div className="ta-c">We are avaiable from 9 AM to 8 PM on Weekdays</div>
				<div className="ta-c mt-1rem">
					Need a quicker reply? 💬 Use the Facebook Chat <i class="fab fa-facebook zoom" /> at the Bottom
					right of your screen to chat with us instantly! 💨
				</div>
			</div>
			<div className="jc-c">
				<Loading loading={loading} error={error}>
					{/* {completed && (
						<h3 style={{ textAlign: 'center' }}>
							{completed ? completed : request.isValid ? 'Error Sending Email' : ''}
						</h3>
					)} */}
				</Loading>
			</div>
			<form style={{ display: 'flex', flexDirection: 'column' }} className="contact-form">
				<label>First Name</label>
				<input
					onChange={(e) => set_first_name(e.target.value)}
					defaultValue={first_name}
					value={first_name}
					className="zoom_f form_input"
					type="text"
					name="first_name"
					placeholder="First Name"
				/>
				<label className="validation_text">{first_name_validations}</label>
				<label>Last Name</label>
				<input
					onChange={(e) => set_last_name(e.target.value)}
					defaultValue={last_name}
					value={last_name}
					className="zoom_f form_input"
					type="text"
					name="last_name"
					placeholder="Last Name"
				/>
				<label className="validation_text">{last_name_validations}</label>
				<label>Email</label>
				<input
					onChange={(e) => set_email(e.target.value)}
					defaultValue={email}
					value={email}
					className="zoom_f form_input"
					type="text"
					name="email"
					placeholder="Email"
				/>
				<label className="validation_text">{email_validations}</label>

				<label>Reason for Contact</label>
				{/* <input onChange={(e) => set_}defaultValue={} className="zoom_f form_input" type="text" name="order_number" placeholder="Order Number" /> */}

				<div className="custom-select mt-8px mb-15px">
					<select
						onChange={(e) => set_reason_for_contact(e.target.value)}
						defaultValue={reason_for_contact}
						value={reason_for_contact}
						className=" contact_dropdown w-100per"
						name="reason_for_contact"
						placeholder="----Click Here to Choose Reason----"
					>
						<option className="grey_option" disabled="disabled" selected="selected" value="">
							----Click Here to Choose Reason----
						</option>

						<option className="options" value="did_not_recieve_verification_email">
							Did not Recieve Verification Email
						</option>
						<option className="options" value="order_issues">
							Order Issues
						</option>
						<option className="options" value="returns">
							Returns
						</option>
						<option className="options" value="technical_support">
							Technical Support
						</option>
						<option className="options" value="website_bugs">
							Website Bugs
						</option>
						<option className="options" value="custom_orders">
							Custom Orders
						</option>
						<option className="options" value="product_suggestions">
							Product Suggestions
						</option>
						<option className="options" value="submit_content_to_be_featured">
							Submit Content to be Featured
						</option>
					</select>
					<span className="custom-arrow" />
				</div>
				{/* <select
					onChange={(e) => set_reason_for_contact(e.target.value)}
					defaultValue={reason_for_contact}
					value={reason_for_contact}
					className="form_input contact_dropdown"
					name="reason_for_contact"
					placeholder="----Click Here to Choose Reason----"
				>
					<option className="grey_option" disabled="disabled" selected="selected" value="">
						----Click Here to Choose Reason----
					</option>

					<option className="options" value="did_not_recieve_verification_email">
						Did not Recieve Verification Email
					</option>
					<option className="options" value="order_issues">
						Order Issues
					</option>
					<option className="options" value="returns">
						Returns
					</option>
					<option className="options" value="technical_support">
						Technical Support
					</option>
					<option className="options" value="website_bugs">
						Website Bugs
					</option>
					<option className="options" value="custom_orders">
						Custom Orders
					</option>
					<option className="options" value="product_suggestions">
						Product Suggestions
					</option>
					<option className="options" value="submit_content_to_be_featured">
						Submit Content to be Featured
					</option>
				</select> */}
				<label className="validation_text">{reason_for_contact_validations}</label>
				{/* {console.log({ reason_for_contact })} */}
				{[ 'order_issues', 'returns', 'technical_support' ].includes(reason_for_contact) && (
					<div className="100per">
						<label>Order Number</label>
						<input
							onChange={(e) => set_order_number(e.target.value)}
							defaultValue={order_number}
							className="zoom_f form_input w-100per"
							type="text"
							name="order_number"
							placeholder="Order Number"
						/>
						<label className="validation_text">{order_number_validations}</label>
					</div>
				)}
				{[ 'custom_orders' ].includes(reason_for_contact) && (
					<div className="100per">
						<label>Upload your Pictures</label>
						<ReactFilestack
							apikey={process.env.REACT_APP_FILESTACK_API}
							customRender={({ onPick }) => (
								<div>
									<button class="btn primary mv-10px" onClick={onPick}>
										Upload image
									</button>
								</div>
							)}
							onSuccess={finishUploading}
						/>
						<div className="row">
							{inspirational_pictures.map((picture) => {
								return (
									<img
										style={{
											width: '100%',
											height: 'auto',
											maxWidth: '150px',
											maxHeight: '150px',
											borderRadius: '15px',
											marginRight: '10px'
										}}
										className="mv-10px"
										src={picture}
									/>
								);
							})}
						</div>
					</div>
				)}

				{[ 'submit_content_to_be_featured' ].includes(reason_for_contact) && (
					<div>
						<div className="wrap jc-b" style={{ gap: '10px' }}>
							<div style={{ width: '330px' }}>
								<label>Instagram Handle</label>
								<input
									onChange={(e) => set_instagram_handle(e.target.value)}
									defaultValue={instagram_handle}
									value={instagram_handle}
									className="zoom_f form_input"
									type="text"
									name="instagram_handle"
									placeholder="Instagram Handle (optional)"
								/>
							</div>
							<div style={{ width: '330px' }}>
								<label>Facebook Name</label>
								<input
									onChange={(e) => set_facebook_name(e.target.value)}
									defaultValue={facebook_name}
									value={facebook_name}
									className="zoom_f form_input"
									type="text"
									name="facebook_name"
									placeholder="Facebook (optional) "
								/>
							</div>
							<div style={{ width: '330px' }}>
								<label>Glover Name</label>
								<input
									onChange={(e) => set_artist_name(e.target.value)}
									defaultValue={artist_name}
									value={artist_name}
									className="zoom_f form_input"
									type="text"
									name="artist_name"
									placeholder="Glover Name (optional)"
								/>
							</div>
						</div>
						<label>Song ID</label>
						<input
							onChange={(e) => set_song_id(e.target.value)}
							defaultValue={song_id}
							value={song_id}
							className="zoom_f form_input"
							type="text"
							name="song_id"
							placeholder="Song ID (optional)"
						/>
					</div>
				)}
				<label>Message</label>
				<textarea
					onChange={(e) => set_message(e.target.value)}
					defaultValue={message}
					className="zoom_f form_input"
					name="message"
					style={{ fontFamily: 'Helvetica' }}
					placeholder="Enter Message Here"
				/>
				<label className="validation_text">{message_validations}</label>

				{[ 'order_issues', 'returns', 'technical_support' ].includes(reason_for_contact) && (
					<p className="paragraph_font">
						You can find your order number by logging in and going to the drop down with your name on it and
						clicking orders. The order Number will be in the far left column. Or by checking the email you
						recieved for making your order.
					</p>
				)}

				<div>
					{[ 'submit_content_to_be_featured' ].includes(reason_for_contact) && (
						<div>
							<h2>Steps to Ensure Content Gets Featured </h2>
							<ol className="paragraph_font" style={{ paddingLeft: '20px' }}>
								<li>Fill out relevant info above </li>
								<li>Then upload your content using the WeTransfer button below.</li>
								<li>For "Email To" put info.glowleds@gmail.com</li>
								<li>After completing steps on wetransfer click the send button below.</li>
							</ol>

							<button className="zoom_b btn primary">
								<a
									target="_blank"
									href="https://wetransfer.com/"
									rel="noreferrer"
									rel="noopener noreferrer"
								>
									WeTransfer{' '}
								</a>
							</button>
						</div>
					)}
					<button
						style={{ width: '100px', marginTop: '10px' }}
						className="zoom_b btn primary"
						id="button"
						onClick={(e) => sendEmail(e)}
					>
						Send
					</button>
					{[ 'submit_content_to_be_featured' ].includes(reason_for_contact) && (
						<div>
							<h2>Content includes: </h2>
							<ul className="paragraph_font" style={{ paddingLeft: '20px' }}>
								<li>Pictures or Video of your Lightshow with Glow LEDs Diffusers or Diffuser Caps. </li>
								<li>Pictures or Video of art or music.</li>
								<li>Pictures or Video of your Glow LEDs Glow Strings.</li>
							</ul>
						</div>
					)}
				</div>
			</form>
		</div>
	);
};

export default ContactPage;
