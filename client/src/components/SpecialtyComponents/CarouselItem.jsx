// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';

const CarouselItem = (props) => {
	const [ product, set_product ] = useState(props.product);
	const [ loading, set_loading ] = useState(true);

	useEffect(
		() => {
			set_loading(false);
			return () => {};
		},
		[ props.product ]
	);

	return (
		<div>
			{!loading && (
				<li key={props.product && product.pathname} style={props.styles}>
					<Link to={product && '/collections/all/products/' + product.pathname}>
						<div className="product">
							<LazyLoadImage
								className="product-image"
								alt={product.name}
								title="Product Image"
								style={{ height: props.size, width: props.size }}
								effect="blur"
								src={product.images && product.images[0]} // use normal <img> attributes as props
							/>

							<label style={{ fontSize: '1.3rem' }}>{product.brand}</label>
							<label style={{ fontSize: '1.6rem' }}>{product.name}</label>
							{product.name === 'Custom Infinity Mirror' ? (
								<label className="product-price">
									$549.99 - $<i className="fas fa-arrow-up" />
								</label>
							) : (
								<label className="product-price">{sale_price_switch(props.product)}</label>
							)}

							{product.rating ? (
								<Rating value={product.rating} text={product.numReviews + ' reviews'} />
							) : (
								<span className="rating vis-hid ta-c">No Reviews</span>
							)}
						</div>
					</Link>
				</li>
			)}
		</div>
	);
};

export default CarouselItem;
