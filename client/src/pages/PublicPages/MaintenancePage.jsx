import React from 'react';
import { Helmet } from 'react-helmet';

const MaintenancePage = (props) => {
	const header_styles = {
		gridArea: 'header',
		backgroundColor: '#333333',
		color: '#ffffff',
		display: 'flex',
		alignItems: 'center',
		padding: '15px',
		listStyleType: 'none',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
	};

	const video_wrapper = {
		position: 'relative'
	};

	const content_styles = {
		backgroundColor: '#737373',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		background: 'linear-gradient(180deg, rgba(138, 138, 138, 1) 0%, rgba(39, 39, 39, 1) 100%)',
		padding: '2rem',
		minHeight: '81vh'
	};

	return (
		<div style={{ padding: 0 }}>
			<Helmet>
				<title>Maintenance | Glow LEDs</title>
				<meta property="og:title" content="Maintenance" />
				<meta name="twitter:title" content="Maintenance" />
				<link rel="canonical" href="https://www.glow-leds.com/" />
				<meta property="og:url" content="https://www.glow-leds.com" />
			</Helmet>
			<div style={header_styles}>
				<div className="jc-c column ta-c">
					<div className="brand">
						<img
							className="zoom logo"
							height="125px"
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs Logo"
							title="Glow LEDs"
						/>
					</div>
					<div className="jc-c ai-c logo_text">
						<img
							className="logo_2"
							style={{ display: 'none', height: '80px' }}
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs Logo"
							title="Glow LEDs"
						/>
					</div>
					<h1
						class="glow_leds_text"
						styles={{
							fontSize: '67px',
							margin: 0,
							textAlign: 'center',
							justifyContent: 'center',
							width: '100%',
							marginBottom: '10px',
							marginTop: '17px'
						}}
					>
						Glow LEDs
					</h1>
				</div>
			</div>
			<div style={content_styles}>
				<div className="jc-c">
					<h2 className="welcome_text" style={{ fontSize: '6rem', marginBottom: '3vh' }}>
						Glow LEDs Coming Soon!
					</h2>
				</div>
				<div className="jc-c">
					<h2>From a Glover that just wants the world to stay lit</h2>
				</div>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Here at Glow-LEDs.com we strive to bring as much light in to as many lives as possible. All items
					are handmade at my home in Austin, TX and all ideas came from my own brain. Our items were dreamt up
					with the intention of turning your home into a glowing rainbow dreamland with infinite hours of
					entertainment. You don’t need a party to enjoy our products (although parties are definitely
					encouraged). The beautiful colors have the ability to turn your home into the next best festival or
					into a relaxing retreat, you decide.
				</p>
				<div className="home_page_divs">
					<div className="jc-c">
						<h2>Diffuser Caps</h2>
					</div>
					<div className="jc-c" style={video_wrapper}>
						<div className="iframe-container">
							<iframe
								width="996"
								height="560"
								title="Diffuser Caps"
								style={{ borderRadius: '20px' }}
								src="https://www.youtube.com/embed/CaC-86DAql4?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen="1"
							/>
						</div>
					</div>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						It's been too long since a truly new element has been introduced to gloving. We are here to
						change lightshows forever. This new technology puts designs on the outside of your glove for
						ultimate definition. Using a propriety design, you will be able to simply screw on the caps
						through the gloves to the adapter and start throwing heat right away. Mix and match the cap
						designs create truly ridiculous light shows. 100% facemelt guarantee.
					</p>
				</div>
				{/* <div className="home_page_divs">
					<div className="jc-c">
						<h2>Infinity Mirrors</h2>
					</div>
					<div className="jc-c" style={video_wrapper}>
						<div className="iframe-container">
							<iframe
								width="996"
								height="560"
								title="Infinity Mirrors"
								style={{ borderRadius: '20px' }}
								src="https://www.youtube.com/embed/RLiFZahHbjU?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen="1"
							/>
						</div>
					</div>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Wanting to invoke a sense of wonder and amazement in your guests (and yourself)? Infinity
						mirrors are the perfect addition to any chill space. Look into another dimension as vibrant LEDs
						go on for miles of rainbow bliss. Order a custom infinity mirror to add that personal touch that
						will only be found in your space.
					</p>
				</div> */}
				<div className="home_page_divs">
					<div className="jc-c">
						<h2>Glow Strings</h2>
					</div>
					<div className="jc-c" style={video_wrapper}>
						<div className="iframe-container">
							<iframe
								width="996"
								height="560"
								title="Glow Strings"
								style={{ borderRadius: '20px' }}
								src="https://www.youtube.com/embed/TCArM88Ll1s?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen="1"
							/>
						</div>
					</div>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Make your space glow! Our string lights come with 14 preprogrammed patterns that will turn your
						home into a festival. Strobes, fades, flashes, they have it all. fill your universe with a
						swimming pool of light in every color of the rainbow. Available in 12 ft (50 LED), 23 ft (100
						LED), 34 ft (150 LED), and 46 ft (200 LED) options so there’s a size for every need.
					</p>
				</div>
			</div>
		</div>
	);
};
export default MaintenancePage;
