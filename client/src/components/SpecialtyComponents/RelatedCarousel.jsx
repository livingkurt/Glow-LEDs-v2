// React
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { Loading } from '../UtilityComponents';
import { CarouselItem } from '.';

const RelatedProducts = (props) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	useEffect(
		() => {
			if (props.product) {
				dispatch(listProducts(props.product.category));
			}
		},
		[ props.product ]
	);

	const [ product_number, set_product_number ] = useState(0);
	const [ number_of_items, set_number_of_items ] = useState(5);

	const move_left = () => {
		if (product_number != 0) {
			set_product_number((product_number) => {
				return product_number - 1;
			});
		}
	};
	const move_right = () => {
		if (product_number != products.filter((product) => product.hidden === false).length - 5) {
			set_product_number((product_number) => {
				return product_number + 1;
			});
		}
	};
	const handleWindowResize = (width) => {
		if (width > 1530) {
			set_number_of_items(5);
		} else if (width > 1137 && width < 1529) {
			set_number_of_items(4);
		} else if (width > 911 && width < 1136) {
			set_number_of_items(3);
		} else if (width > 646 && width < 910) {
			set_number_of_items(2);
		} else if (width < 645) {
			set_number_of_items(1);
		}
	};

	const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	function useCurrentWidth() {
		// save current window width in the state object
		let [ width, setWidth ] = useState(getWidth());
		// in this case useEffect will execute only once because
		// it does not have any dependencies.
		useEffect(() => {
			// timeoutId for debounce mechanism
			let timeoutId = null;
			let numberId = null;
			const resizeListener = () => {
				// prevent execution of previous setTimeout
				clearTimeout(timeoutId);
				clearTimeout(numberId);
				// change width from the state object after 150 milliseconds
				timeoutId = setTimeout(() => setWidth(getWidth()), 150);
				numberId = setTimeout(() => handleWindowResize(getWidth()), 150);
			};
			// handleWindowResize(width);

			// set resize listener
			window.addEventListener('resize', resizeListener);
			// clean up function
			return () => {
				// remove resize listener
				window.removeEventListener('resize', resizeListener);
			};
		}, []);
		return width;
	}

	let width = useCurrentWidth();

	return (
		<div className="column mh-10px">
			<h2 className="ta-c w-100per jc-c">Related Products</h2>
			<Loading loading={loading} error={error}>
				{products && (
					<div className="row p-10px" style={{ overflowX: 'scroll' }}>
						<div className="row jc-b w-100per">
							{/* {product_number != 0 && ( */}
							<div className="ai-c">
								<button
									style={{ borderRadius: '50%' }}
									className="btn icon h-59px"
									onClick={() => move_left()}
								>
									<i className="fas fa-arrow-circle-left fs-40px" />
								</button>
							</div>
							{/* )} */}
							{[ ...Array(number_of_items).keys() ].map((x) => (
								<div className="w-259px">
									<CarouselItem
										key={product_number + x}
										size="175px"
										product={
											products.filter((product) => product.hidden === false)[product_number + x]
										}
										styles={{ listStyleType: 'none' }}
									/>
								</div>
							))}
							{/* {product_number < products.filter((product) => product.hidden === false).length - 5 && ( */}
							<div className="ai-c">
								<button
									style={{ borderRadius: '50%' }}
									className="btn icon h-59px"
									onClick={() => move_right()}
								>
									<i className="fas fa-arrow-circle-right fs-40px" />
								</button>
							</div>
							{/* )} */}
						</div>

						{/* )
						)} */}
					</div>
				)}
			</Loading>
		</div>
	);
};

export default RelatedProducts;
