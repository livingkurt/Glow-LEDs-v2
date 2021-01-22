// React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';
// import Resizer from 'react-image-file-resizer';

const Product = (props) => {
	// console.log(props.product_occurrences);
	// useEffect(
	// 	() => {
	// 		onChange();
	// 		return () => {};
	// 	},
	// 	[ props.product.images ]
	// );

	// const resizeFile = (file) =>
	// 	new Promise((resolve) => {
	// 		Resizer.imageFileResizer(
	// 			file,
	// 			300,
	// 			300,
	// 			'JPEG',
	// 			5,
	// 			0,
	// 			(uri) => {
	// 				resolve(uri);
	// 			},
	// 			'base64'
	// 		);
	// 	});

	// const onChange = async (image_) => {
	// 	const file = image_;
	// 	const image = await resizeFile(file);
	// 	console.log(image);
	// 	return image;
	// };

	return (
		<li key={props.product.pathname} style={props.styles}>
			{props.product_occurrences && (
				<div className="tooltip">
					<div className="tooltipoverlay">
						{/* <span className="tooltiptext">
						{props.product.name === 'Diffuser Caps + Adapters Starter Kit' ||
						props.product.name === 'Mega Diffuser Caps + Adapters Starter Kit' ? (
							<div />
						) : props.product.name === 'Custom Infinity Mirror' ? (
							<Link to="/pages/contact/custom_orders">
								<button className="btn primary">Contact</button>
							</Link>
						) : (
							<li>
								{props.product.countInStock > 0 ? (
									<button onClick={handleAddToCart} className="btn primary">
										Quick Add to Cart
									</button>
								) : (
									<button className="btn inactive">Out of Stock</button>
								)}
							</li>
						)}
					</span> */}
						<div className="product">
							<Link to={'/collections/all/products/' + props.product.pathname}>
								<div className="row mt-15px">
									<div className="column ai-c pos-rel">
										{/* <Link to={'/collections/all/products/' + item.pathname}> */}
										<LazyLoadImage
											className="product-image"
											alt={props.product.name}
											title="Product Image"
											style={{ height: props.size, width: props.size }}
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
							</Link>

							<label style={{ fontSize: '1.3rem' }}>{props.product.brand}</label>
							<Link to={'/collections/all/products/' + props.product.pathname}>
								<label style={{ fontSize: '1.6rem' }}>{props.product.name}</label>
							</Link>
							{props.product.name === 'Custom Infinity Mirror' ? (
								<label className="product-price">
									$549.99 - $<i className="fas fa-arrow-up" />
								</label>
							) : (
								<label className="product-price">{sale_price_switch(props.product)}</label>
							)}

							{props.product.rating ? (
								<Rating value={props.product.rating} text={props.product.numReviews + ' reviews'} />
							) : (
								<span className="rating vis-hid ta-c">No Reviews</span>
							)}
						</div>
					</div>
				</div>
			)}
		</li>
	);
};

export default Product;
