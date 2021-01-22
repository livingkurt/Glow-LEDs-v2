import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { listFeatures } from '../../actions/featureActions';
import { humanize } from '../../utils/helper_functions';

const FeaturedPage = (props) => {
	const featureList = useSelector((state) => state.featureList);
	const { features } = featureList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listFeatures());
		return () => {};
	}, []);

	const date = new Date();

	const today = date.toISOString();
	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Featured | Glow LEDs</title>
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
				<h1> Featured</h1>
			</div>

			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				Here is an archive of the lightshows and product reviews that you have so graciously given to us. We
				appreciate each and every one of you.
			</p>
			{features &&
				features.filter((feature) => feature.release_date <= today).map((feature) => {
					return (
						<div className="home_page_divs">
							<div className="column jc-c">
								<h2 style={{ textAlign: 'center' }}>{feature.artist_name} Light Show</h2>
								<p className="p_descriptions" style={{ textAlign: 'center', marginBottom: 0 }}>
									Check out {feature.artist_name} with the {humanize(feature.product)}!
								</p>
								<p className="p_descriptions" style={{ textAlign: 'center' }}>
									Follow him @ {feature.facebook_name} on Facebook and @{feature.instagram_handle} on
									Instagram
								</p>
								<Link to={`/collections/all/products/${feature.product}`}>
									<div className="column jc-c">
										<div className="p_descriptions" style={{ textAlign: 'center' }}>
											<button
												className="btn primary "
												style={{ margin: 'auto', marginBottom: '10px' }}
											>
												{humanize(feature.product)}
											</button>
										</div>
									</div>
								</Link>
							</div>
							<div className="jc-c pos-rel">
								<div className="iframe-container">
									<iframe
										width="996"
										height="560"
										style={{ borderRadius: '20px' }}
										src={`https://www.youtube.com/embed/${feature.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
										frameborder="0"
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen="1"
									/>
								</div>
							</div>

							<p className="p_descriptions" style={{ textAlign: 'center' }}>
								{feature.song_id}
							</p>
							<p className="p_descriptions" style={{ textAlign: 'center' }}>
								For Information on how to become featured on our pages. Check our Frequently Asked
								Questions page.
							</p>
							<Link to="/pages/faq">
								<div className="jc-c">
									<button className="btn primary " style={{ margin: 'auto', marginBottom: '10px' }}>
										Frequently Asked Questions
									</button>
								</div>
							</Link>
						</div>
					);
				})}
		</div>
	);
};
export default FeaturedPage;
