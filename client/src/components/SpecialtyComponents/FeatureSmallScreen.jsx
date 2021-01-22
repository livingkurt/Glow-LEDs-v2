// React
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';
import { humanize } from '../../utils/helper_functions';

const FeatureSmallScreen = (props) => {
	return (
		<li key={props.feature._id} className=" w-100per" style={props.styles}>
			<Link to={`/collections/all/features/category/${props.category.toLowerCase()}/${props.feature.pathname}`}>
				<div className="small_screen_product row">
					<div className="">
						<LazyLoadImage
							className="feature-image w-200px h-auto br-10px"
							alt={props.feature.artist_name}
							title="Feature Image"
							effect="blur"
							src={
								props.category.toLowerCase() === 'glovers' ? (
									`http://img.youtube.com/vi/${props.feature.video}/hqdefault.jpg`
								) : (
									props.feature.logo
								)
							}
						/>
					</div>
					<div className="p-10px">
						<div className="product_text" style={{ fontSize: '1.6rem' }}>
							{props.feature.artist_name}
						</div>
						<label style={{ fontSize: '1.3rem' }}>
							{props.feature.product && humanize(props.feature.product)}
						</label>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default FeatureSmallScreen;
