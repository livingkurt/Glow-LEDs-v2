import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { detailsContent, listContents } from '../../actions/contentActions';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const AboutPage = () => {
	const contentDetails = useSelector((state) => state.contentDetails);
	const { content } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listContents());
		return () => {};
	}, []);

	useEffect(
		() => {
			const active_content = contents.find((content) => content.active === true);
			if (active_content) {
				dispatch(detailsContent(active_content._id));
			}
			return () => {};
		},
		[ contents ]
	);
	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>About | Glow LEDs</title>
				<meta property="og:title" content="About" />
				<meta name="twitter:title" content="About" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/about" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/about" />
				<meta name="description" content="Learn how Glow LEDs got started and more in our About Page" />
				<meta property="og:description" content="Learn how Glow LEDs got started and more in our About Page" />
				<meta name="twitter:description" content="Learn how Glow LEDs got started and more in our About Page" />
			</Helmet>
			<MessengerCustomerChat
				pageId="100365571740684"
				appId="379385106779969"
				htmlRef={window.location.pathname}
			/>
			<div class="inner_content">
				<h1 style={{ fontSize: 40, textAlign: 'center' }}>About Glow-LEDs</h1>
				<div>
					<div
						style={{
							float: 'left',
							margin: '0 25px 25px 0'
						}}
						className="about_pictures"
					>
						<h2
							className="about_names"
							style={{ fontFamily: 'heading_font', marginTop: 0, marginBottom: '25px' }}
						>
							Hi, My Name is Kurt!
						</h2>
						<img
							alt="Picture of Kurt"
							title="Founder Picture"
							style={{
								borderRadius: '15px',
								width: '100%',
								height: 'auto',
								maxWidth: '400px'
							}}
							src="/images/optimized_images/personal_images/IMG_8989_optimized.jpeg"
						/>
					</div>
					{content && content.banner && <p className="paragraph_font">{content.about_page.kurt_p}</p>}
					<div
						className="about_pictures"
						style={{
							float: 'right',
							margin: '0px 0px 25px 25px'
						}}
					>
						<h2
							className="about_names"
							style={{
								fontFamily: 'heading_font',
								display: 'flex',
								marginTop: 0,
								justifyContent: 'flex-end',
								marginBottom: '25px'
							}}
						>
							Hi, My Name is Destanye!
						</h2>
						<img
							alt="Picture of Destanye"
							title="Partner Picture"
							style={{
								borderRadius: '15px',
								width: '100%',
								height: 'auto',
								maxWidth: '400px'
							}}
							src="/images/optimized_images/personal_images/img_0345_optimized.jpg"
						/>
					</div>
					{/* <p >
						I (Destanye) help with orders, designs, marketing, customer service and anything that doesn’t
						involve coding or engineering. This business is truly a labor of love and we hope that something
						here brings happiness into your life.
					</p> */}
					{content && content.banner && <p className="paragraph_font">{content.about_page.destanye_p}</p>}
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
