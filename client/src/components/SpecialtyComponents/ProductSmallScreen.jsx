// React
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';

const ProductSmallScreen = (props) => {
	return (
		<li key={props.product.pathname} className=" w-100per" style={props.styles}>
			{props.product_occurrences && (
				<Link to={'/collections/all/products/' + props.product.pathname}>
					<div className="small_screen_product row">
						<div className="row mt-15px">
							<div className="column ai-c pos-rel">
								<LazyLoadImage
									className="product-image w-200px h-200px "
									alt={props.product.name}
									title="Product Image"
									effect="blur"
									src={props.product.images && props.product.images[0]} // use normal <img> attributes as props
								/>
								{props.product_occurrences &&
								props.product_occurrences[0] &&
								props.product_occurrences[0].name === props.product.name && (
									<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
										<img
											className=" mt-3px ml-2px h-100px w-100px"
											alt={props.product.name}
											title="Product Image"
											src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
										/>
									</div>
								)}
								{props.product_occurrences &&
								props.product_occurrences[1] &&
								props.product_occurrences[1].name === props.product.name && (
									<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
										<img
											className=" mt-3px ml-2px h-100px w-100px"
											alt={props.product.name}
											title="Product Image"
											src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
										/>
									</div>
								)}
								{props.product_occurrences &&
								props.product_occurrences[2] &&
								props.product_occurrences[2].name === props.product.name && (
									<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
										<img
											className=" mt-3px ml-2px h-100px w-100px"
											alt={props.product.name}
											title="Product Image"
											src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
										/>
									</div>
								)}
								{props.product_occurrences &&
								props.product_occurrences[3] &&
								props.product_occurrences[3].name === props.product.name && (
									<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
										<img
											className=" mt-3px ml-2px h-100px w-100px"
											alt={props.product.name}
											title="Product Image"
											src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
										/>
									</div>
								)}
								{props.product_occurrences &&
								props.product_occurrences[4] &&
								props.product_occurrences[4].name === props.product.name && (
									<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
										<img
											className=" mt-3px ml-2px h-100px w-100px"
											alt={props.product.name}
											title="Product Image"
											src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
										/>
									</div>
								)}
							</div>
						</div>
						<div className="p-10px">
							<div className="product_text" style={{ fontSize: '1.6rem' }}>
								{props.product.name}
							</div>
							<div className="product_text mt-10px">
								{props.product.name === 'Custom Infinity Mirror' ? (
									<div className="">
										$549.99 - $<i className="fas fa-arrow-up" />
									</div>
								) : (
									<div className="">{sale_price_switch(props.product)}</div>
								)}
							</div>
							{props.product.rating ? (
								<Rating value={props.product.rating} text={props.product.numReviews + ' reviews'} />
							) : (
								<span className="rating vis-hid ta-c">No Reviews</span>
							)}
						</div>
					</div>
				</Link>
			)}
		</li>
	);
};

export default ProductSmallScreen;
