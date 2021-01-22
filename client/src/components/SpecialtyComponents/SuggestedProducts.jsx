// React
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import Product from './Product';
import { Loading } from '../UtilityComponents';
// import EmblaCarousel from './EmblaCarousel';
// import Slider from './Slider';

const SuggestedProducts = (props) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	// console.log({ products });

	useEffect(() => {
		// if (props.product) {
		dispatch(listProducts(''));
		// }
	}, []);

	// buttonRight.onclick = function () {
	//   document.getElementById('container').scrollLeft += 20;
	// };
	// buttonLeft.onclick = function () {
	//   document.getElementById('container').scrollLeft -= 20;
	// };

	return (
		<div className="column mh-10px">
			<h2
				style={{
					textAlign: 'center',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				Suggested Products
			</h2>
			{/* <Slider /> */}

			<Loading loading={loading} error={error}>
				<div className="row p-10px" style={{ overflowX: 'scroll' }}>
					{/* <EmblaCarousel> */}
					{products &&
						products.map(
							(item, index) =>
								!item.hidden && (
									// <div className="embla__slide" key={index}>
									// 	<div className="embla__slide__inner">
									// 		<div className="embla__slide__img">

									<Product
										key={index}
										size="175px"
										product={item}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>

									// 		</div>
									// 	</div>
									// </div>
								)
						)}
					{/* </EmblaCarousel> */}
				</div>
			</Loading>
		</div>
	);
};

export default SuggestedProducts;
