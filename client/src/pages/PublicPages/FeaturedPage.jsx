import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsFeature, listFeatures } from '../../actions/featureActions';
import { humanize } from '../../utils/helper_functions';
import { useHistory } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const FeaturedPage = (props) => {
	const history = useHistory();
	const featureDetails = useSelector((state) => state.featureDetails);
	console.log({ featureDetails });
	const { feature } = featureDetails;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsFeature(props.match.params.pathname));
		console.log(props.match.params.pathname);
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

			{feature && (
				<div className="">
					<div className="jc-b">
						<button className="btn secondary" onClick={() => history.goBack()}>
							Back to Features
						</button>
						{props.userInfo &&
						props.userInfo.isAdmin && (
							<Link to={'/secure/glow/editfeature/' + props.match.params.pathname}>
								<button className="btn secondary" style={{ width: '156px' }}>
									Edit Feature
								</button>
							</Link>
						)}
					</div>
					<div className="column jc-c">
						<h2 style={{ textAlign: 'center' }}>{feature.artist_name}</h2>
					</div>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						{feature.description}
					</p>
					{feature.video && (
						<div className="jc-c pos-rel">
							<div className="iframe-container">
								<iframe
									width="996"
									height="560"
									style={{ borderRadius: '20px' }}
									src={`https://www.youtube.com/embed/${feature.video}?mute=0&showinfo=0&rel=0&autoplay=1&loop=1`}
									frameborder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen="1"
								/>
							</div>
						</div>
					)}
					<div className="products">
						{feature.images &&
							feature.images.map((image) => {
								return (
									<Zoom className="m-auto">
										<img className="m-1rem br-15px w-100per h-auto max-w-30rem ta-c" src={image} />
									</Zoom>
								);
							})}
					</div>

					{/* <p className="p_descriptions" style={{ textAlign: 'center', marginBottom: 0 }}>
						Check out {feature.artist_name} with the {feature.product && humanize(feature.product)}!
					</p> */}

					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Follow {feature.facebook_name} on Facebook and @{feature.instagram_handle} on Instagram
					</p>
					{feature.song_id && (
						<p className="p_descriptions" style={{ textAlign: 'center' }}>
							Song ID: {feature.song_id}
						</p>
					)}

					<div className="p_descriptions" style={{ textAlign: 'center' }}>
						<a
							rel="noreferrer"
							className="jc-c w-100per"
							href={feature.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<button className="btn primary " style={{ margin: 'auto', marginBottom: '10px' }}>
								{feature.product ? humanize(feature.product) : `See More from ${feature.artist_name}`}
							</button>
						</a>
					</div>
				</div>
			)}
		</div>
	);
};
export default FeaturedPage;
