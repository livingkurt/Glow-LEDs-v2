import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsContent, listContents } from '../../actions/contentActions';

const HomePage = (props) => {
	const contentDetails = useSelector((state) => state.contentDetails);
	const { content } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;
	const [ inactive, set_inactive ] = useState(false);

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
			} else {
				set_inactive(true);
			}
			return () => {};
		},
		[ contents ]
	);

	const homepage_videos = [
		{
			name: 'Glowskins',
			category: 'glowskins',
			video: '3Yk0QOMBlAo',
			color: '#8e4a4a',
			description:
				'What makes Glowskins special? Glowskins are a Casing and Diffuser all in one! Place your entire chip inside and create a glow throughout the whole casing! This differs from our Frosted Diffusers which create a glow only around the bulb. There are 3 unique sizes, each designed for Coffin, Nano or Coin chip microlights. Glowskins are made with semi-flexible TPU plastic so your fingers will always feel comfortable! They do not inhibit access to your microlight button for mode switching. Our light and streamline design makes your fingers feel weightless. Smooth finish for easy removal from whites.'
		},
		{
			name: 'Diffuser Caps',
			category: 'diffuser_caps',
			video: '0b1cn_3EczE',
			color: '#b1832f',
			description:
				'Take your light shows to a new dimension with Diffuser Caps! This new gloving tech puts patterns and designs on the outside of your glove to add a mesmerizing and unique effect to your lightshows. These Diffuser Adapters are the secret to the technology. Simply place the Diffuser Adapters (sold separately) on your microlight inside of the glove and then twist on the cap to the Diffuser Adapter from the outside of the glove! Diffuser caps are about the size of a classic dome diffuser. 15mm in Diameter. People will be speechless at your tracers and effects! 100% facemelt guarantee. Lights not included. Patent pending. The Diffuser Caps are compatible with the Mini Diffuser Caps purchased before 12/3/20. View the graphic below for visual representation of what we'
		},
		{
			name: 'Mega Diffuser Caps',
			category: 'mega_diffuser_caps',
			video: 'CaC-86DAql4',
			color: '#427942',
			description:
				'Take your light shows to a new dimension with Mega Diffuser Caps! This new gloving tech puts patterns and designs on the outside of your glove to add a mesmerizing and unique effect to your lightshows. Now in Mega Size! These Mega Diffuser Caps are Just like our regular sized Diffuser Caps, but 20% bigger! 20mm in Diameter (Same size as our Mega Dome Diffusers) The mega size allows for a more intricate design that may be too complex for the regular sized diffuser caps. Simply place the Diffuser Adapters (sold separately) on your microlight like normal diffusers and the caps screw on on the outside of the glove! People will be speechless at your tracers and trails! 100% facemelt guarantee. Lights not included. Patent pending. The Mega Diffuser Caps are compatible with the Original Diffuser Caps purchased before 12/3/20. View the graphic below for visual representation of what we mean.'
		},
		{
			name: 'Frosted Diffusers',
			category: 'frosted_diffusers',
			video: 'uY2xjrGrZd0',
			color: '#3f3f80',
			description:
				'Tired of diffusers that dont actually diffuse? these frosted diffusers will give your lightshow an added smoothness and flow. these diffusers will distribute the light into an even glow without a bright center point.'
		},
		{
			name: 'Glow Strings',
			category: 'glow_strings',
			video: 'TCArM88Ll1s',
			color: '#6d416d',
			description:
				'Make your space glow! Our Glow Strings come with many preprogrammed patterns that will turn your home into a festival. Strobes, fades, flashes, they have it all. fill your universe with a swimming pool of light in every color of the rainbow. Available in 12 ft (50 LED), 23 ft (100 LED), 34 ft (150 LED), and 46 ft (200 LED) options so there’s a size for every need.'
		}
	];

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
				<meta property="og:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<meta name="twitter:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<link rel="canonical" href="https://www.glow-leds.com/" />
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta
					name="description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>

				<meta
					property="og:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>
				<meta
					name="twitter:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>

				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</Helmet>

			<div className="jc-c">
				<h1 className="welcome_text mb-1rem ta-c" style={{ fontSize: '4rem' }}>
					Welcome to Glow-LEDs
				</h1>
			</div>
			{content &&
			inactive &&
			content.home_page && (
				<div className="home_page_divs">
					<h4 className="fs-25px mt-8px ta-c">{content.home_page.h1}</h4>
					{content.home_page.show_image && (
						<Link to={content.home_page.link}>
							<img
								style={{ borderRadius: '20px', width: '100%' }}
								src={content.home_page.image}
								className="max-w-800px jc-c m-auto"
								alt="Promo Image"
								title="Promo Image"
							/>
						</Link>
					)}
					{content.home_page.show_video && (
						<div className="jc-c pos-rel">
							<div className="iframe-container">
								<iframe
									title="Content Video"
									width="996"
									height="560"
									style={{ borderRadius: '20px' }}
									src={`https://www.youtube.com/embed/${content.home_page
										.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
									frameborder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen="1"
								/>
							</div>
						</div>
					)}

					<div className="jc-c">
						<h4 className="fs-18px mb-0px ta-c">{content.home_page.h2}</h4>
					</div>
					<p className="p_descriptions paragraph_font" style={{ textAlign: 'center' }}>
						{content.home_page.p}
					</p>
					<div className="jc-c">
						<Link to={content.home_page.link}>
							<button className="btn primary">{content.home_page.button}</button>
						</Link>
					</div>
				</div>
			)}
			<div className="jc-c">
				{/* <h2 className="ta-c phrase_font">From a Glover that just wants the world to stay lit 🔥 </h2> */}
				{/* <h2 className="ta-c phrase_font">Lighting up your world one LED at a time </h2> */}
			</div>
			<p className="p_descriptions paragraph_font ta-c home_page_description">
				Here at Glow-LEDs.com we strive to bring as much light in to as many lives as possible. All items are
				handmade at my home in Austin, TX and all ideas came from my own brain. Our items were dreamt up with
				the intention of turning your home into a glowing rainbow dreamland with infinite hours of
				entertainment. You don’t need a party to enjoy our products (although parties are definitely
				encouraged). The beautiful colors have the ability to turn your home into the next best festival or into
				a relaxing retreat, you decide.
			</p>
			<div className="big_home_page_cards">
				{homepage_videos.map((card) => {
					return (
						<Link to={`/collections/all/products/category/${card.category}`}>
							<div className="home_page_divs max-h-66rem" style={{ backgroundColor: card.color }}>
								<div className="jc-c">
									<h2 className="ta-c">{card.name}</h2>
								</div>
								<div className="row">
									<div className="iframe-container-big">
										<iframe
											title={`${card.name} Promo Video`}
											width="996"
											height="560"
											className="br-20px"
											src={`https://www.youtube.com/embed/${card.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
											frameborder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen="1"
										/>
									</div>
									<div className="ml-2rem">
										<p className="p_descriptions paragraph_font w-50rem">{card.description}</p>
										<div className="jc-c">
											<Link
												className="w-100per"
												to={`/collections/all/products/category/${card.category}`}
											>
												<button className="btn primary w-100per">Shop {card.name}</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
			<div className="small_home_page_cards none">
				{homepage_videos.map((card) => {
					return (
						<Link to={`/collections/all/products/category/${card.category}`}>
							<div className="home_page_divs" style={{ backgroundColor: card.color }}>
								<div className="jc-c">
									<h2 className="ta-c">{card.name}</h2>
								</div>
								<div className="jc-c pos-rel mb-2rem">
									<div className="iframe-container">
										<iframe
											title={`${card.name} Promo Video`}
											style={{ borderRadius: '20px' }}
											src={`https://www.youtube.com/embed/${card.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
											frameborder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen="1"
										/>
									</div>
								</div>
								<p className="p_descriptions paragraph_font home_page_description">
									{card.description}
								</p>
								<div className="jc-c">
									<Link
										className="w-100per"
										to={`/collections/all/products/category/${card.category}`}
									>
										<button className="btn primary w-100per">Shop {card.name}</button>
									</Link>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
export default HomePage;
