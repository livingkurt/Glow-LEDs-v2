// React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';
import { humanize } from '../../utils/helper_functions';
// import Resizer from 'react-image-file-resizer';

const Feature = (props) => {
	console.log({ props });
	return (
		<li key={props.feature._id} style={{ ...props.styles, textDecoration: 'none' }}>
			<Link to={`/collections/all/features/category/${props.category.toLowerCase()}/${props.feature.pathname}`}>
				<div className="tooltip">
					<div className="tooltipoverlay">
						<div className="product">
							<LazyLoadImage
								className="product-image"
								alt={props.feature.name}
								title="Feature Image"
								style={{ height: props.size, width: 'auto' }}
								effect="blur"
								src={
									props.category.toLowerCase() === 'glovers' ? (
										`http://img.youtube.com/vi/${props.feature.video}/hqdefault.jpg`
									) : (
										props.feature.logo
									)
								} // use normal <img> attributes as props
							/>

							<label style={{ fontSize: '1.6rem' }}>{props.feature.artist_name}</label>
							{/* <label style={{ fontSize: '1.3rem' }}>{props.feature.song_id}</label> */}
							<label style={{ fontSize: '1.3rem' }}>
								{props.feature.product && humanize(props.feature.product)}
							</label>
							<Link
								to={`/collections/all/features/category/${props.category.toLowerCase()}/${props.feature
									.pathname}`}
							>
								<label style={{ fontSize: '1.6rem' }}>{props.feature.name}</label>
							</Link>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default Feature;
