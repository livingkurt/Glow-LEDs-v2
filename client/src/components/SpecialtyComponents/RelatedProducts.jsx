// React
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, detailsProduct } from '../../actions/productActions';
import Product from './Product';
import { Loading } from '../UtilityComponents';

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

	useEffect(
		() => {
			dispatch(detailsProduct(props.product_pathname));
			return () => {};
		},
		[ props.product_pathname ]
	);

	return (
		<div className="column mh-10px">
			<h2 className="ta-c w-100per jc-c">Related Products</h2>
			<Loading loading={loading} error={error}>
				<div className="row p-10px overflow-s">
					{products &&
						products.map(
							(item, index) =>
								!item.hidden &&
								props.product_pathname &&
								item.pathname !== props.product_pathname && (
									<Product
										key={index}
										size="300px"
										product={item}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>
								)
						)}
				</div>
			</Loading>
		</div>
	);
};

export default RelatedProducts;
