// React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { format_date } from '../../utils/helper_functions';
import { useSelector, useDispatch } from 'react-redux';
import { saveProductReview, detailsProduct } from '../../actions/productActions';
import { PRODUCT_REVIEW_SAVE_RESET } from '../../constants/productConstants';
// Components

const Review = (props) => {
	// console.log(props.product);
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);

	let { userInfo } = userLogin;
	const productReviewSave = useSelector((state) => state.productReviewSave);
	const { success: productSaveSuccess } = productReviewSave;

	const [ review_modal, setReviewModal ] = useState('none');
	const [ rating, setRating ] = useState(5);
	const [ comment, setComment ] = useState('');
	const show_write_review = () => {
		setReviewModal('block');
	};
	const hide_write_review = (e) => {
		e.preventDefault();
		setReviewModal('none');
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveProductReview(props.pathname, {
				first_name: userInfo.first_name,
				last_name: userInfo.last_name,
				rating: rating,
				comment: comment
			})
		);
		setRating(0);
		setComment('');
		dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
		dispatch(detailsProduct(props.pathname));
		setReviewModal('none');
	};

	const remove_review = (review_id) => {
		dispatch(saveProductReview(props.pathname, review_id));
	};

	return (
		<div className="review" id="reviews">
			{props.product.reviews.map((review) => (
				<li
					key={review._id}
					style={{
						listStyleType: 'none',
						background: '#616161',
						padding: '5px',
						borderRadius: '15px',
						boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
					}}
				>
					<div className="jc-b">
						<div>
							<div>{review.first_name + ' ' + review.last_name}</div>
							{/* <div>{review.last_name}</div> */}
							<div>
								<Rating value={review.rating} />
							</div>
							<div>{format_date(review.createdAt.substring(0, 10))}</div>
							<div>{review.comment}</div>
						</div>
						{userInfo &&
						userInfo.isAdmin && (
							<div className="ta-r">
								<button className="btn icon" onClick={() => remove_review(review._id)}>
									<i className="fas fa-trash-alt" />
								</button>
							</div>
						)}
					</div>
				</li>
			))}

			<button className="btn primary" onClick={show_write_review}>
				Write a Review
			</button>

			<li style={{ listStyleType: 'none', display: review_modal }}>
				<h2
					style={{
						textAlign: 'center',
						width: '100%',
						justifyContent: 'center'
					}}
				>
					Write a Review
				</h2>
				{userInfo ? (
					<form>
						<div className="form-container">
							<li style={{ marginBottom: 0 }}>
								<h3
									style={{
										textAlign: 'center',
										width: '100%',
										justifyContent: 'center',
										marginTop: '-35px'
									}}
								>
									{productSaveSuccess ? 'Review Saved Successfully' : ''}
								</h3>
								<div className="ai-c">
									<h3 htmlFor="rating">Rating</h3>
									<div className="review_select_dropdown_container">
										<select
											first_name="rating"
											id="rating"
											className="review_select_dropdown"
											defaultValue={rating}
											onChange={(e) => setRating(e.target.value)}
										>
											<option value="5">5 - Excellent </option>
											<option value="4">4 - Very Good</option>
											<option value="3">3 - Good</option>
											<option value="2">2 - Fair</option>
											<option value="1">1 - Poor</option>
										</select>
										<i className="fas fa-sort-up review_icon_styles" />
									</div>
								</div>
							</li>
							<li>
								<label htmlFor="comment" id="comment" />
								<textarea
									htmlFor="comment"
									className="rating_textarea"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
							</li>
							<li>
								<button
									style={{ marginBottom: '10px' }}
									onClick={submitHandler}
									className="btn primary"
								>
									Submit
								</button>

								<button onClick={hide_write_review} className="btn secondary">
									Cancel
								</button>
							</li>
						</div>
					</form>
				) : (
					<div>
						Please{' '}
						<Link to={`/account/login?redirect=/collections/all/products/${props.pathname}`}>
							<button className="btn primary">Login</button>
						</Link>{' '}
						to Write a Review
					</div>
				)}
			</li>
		</div>
	);
};

export default Review;
