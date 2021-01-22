import React from 'react';

const Rating = (props) => {
	return !props.value ? (
		<div />
	) : (
		<div className="rating">
			<span>
				<i
					className={
						props.value >= 1 ? 'fa fa-star' : props.value >= 0.5 ? 'fa fa-star-half' : 'fa fa-star-o'
					}
				/>
				<i className="fa fa-star-o pos-rel left-n18px" />
			</span>
			<span className="ml-n15px">
				<i
					className={
						props.value >= 2 ? 'fa fa-star' : props.value >= 1.5 ? 'fa fa-star-half' : 'fa fa-star-o'
					}
				/>
				<i className="fa fa-star-o pos-rel left-n18px" />
			</span>
			<span className="ml-n15px">
				<i
					className={
						props.value >= 3 ? 'fa fa-star' : props.value >= 2.5 ? 'fa fa-star-half' : 'fa fa-star-o'
					}
				/>
				<i className="fa fa-star-o pos-rel left-n18px" />
			</span>
			<span className="ml-n15px">
				<i
					className={
						props.value >= 4 ? 'fa fa-star' : props.value >= 3.5 ? 'fa fa-star-half' : 'fa fa-star-o'
					}
				/>
				<i className="fa fa-star-o pos-rel left-n18px" />
			</span>
			<span className="ml-n15px">
				<i
					className={
						props.value >= 5 ? 'fa fa-star' : props.value >= 4.5 ? 'fa fa-star-half' : 'fa fa-star-o'
					}
				/>
				<i className="fa fa-star-o pos-rel left-n18px" />
			</span>
			<span className="rating">{props.text ? props.text : ''}</span>
		</div>
	);
};

export default Rating;
