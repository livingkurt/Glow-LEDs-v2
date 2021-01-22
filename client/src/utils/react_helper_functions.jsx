import React from 'react';

export const sale_price_switch = (product) => {
	const today = new Date();
	if (
		today > new Date(product.sale_start_date) &&
		today < new Date(product.sale_end_date) &&
		product.sale_price !== 0
	) {
		return (
			<label className="">
				<del style={{ color: 'red' }}>
					<label className="" style={{ color: 'white' }}>
						${product.price ? product.price.toFixed(2) : product.price}
					</label>
				</del>{' '}
				<i className="fas fa-arrow-right" /> ${product.sale_price ? (
					product.sale_price.toFixed(2)
				) : (
					product.sale_price
				)}{' '}
				On Sale!
			</label>
		);
	} else if (!product.countInStock) {
		return (
			<label>
				<del style={{ color: 'red' }}>
					<label style={{ color: 'white' }} className="ml-7px">
						${product.price ? product.price.toFixed(2) : product.price}
					</label>
				</del>{' '}
				<i className="fas fa-arrow-right" />
				<label className="ml-7px">Sold Out</label>
			</label>
		);
	} else {
		return <label>${product.price ? product.price.toFixed(2) : product.price}</label>;
	}
};

export const email_sale_price_switch = (item, color) => {
	if (item.sale_price !== 0) {
		return (
			<label>
				{/* <label style={{ marginRight: '3px' }}>On Sale!</label> */}
				<del style={{ color: 'red' }}>
					<label style={{ color: color }}>${item.price && (item.price * item.qty).toFixed(2)}</label>
				</del>{' '}
				{'-->'} ${item.sale_price && (item.sale_price * item.qty).toFixed(2)}
			</label>
		);
	} else if (item.countInStock === 0) {
		return (
			<label>
				<del style={{ color: 'red' }}>
					<label style={{ color: color, marginLeft: '7px' }}>
						${item.price && (item.price * item.qty).toFixed(2)}
					</label>
				</del>{' '}
				{'-->'} <label style={{ color: color, marginLeft: '7px' }}>Sold Out</label>
			</label>
		);
	} else {
		return <label>${item.price && (item.price * item.qty).toFixed(2)}</label>;
	}
};
