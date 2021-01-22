import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, detailsProduct, listProducts } from '../../actions/productActions';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { format_date, snake_case, unformat_date } from '../../utils/helper_functions';

const EditProductPage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);
	const [ id, setId ] = useState('');
	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState('');
	// const [ display_image, setDisplayImage ] = useState('');
	const [ images, set_images ] = useState([]);
	const [ image, set_image ] = useState('');
	const [ video, setVideo ] = useState('');
	const [ brand, setBrand ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ countInStock, setCountInStock ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ facts, setFacts ] = useState('');
	const [ included_items, setIncludedItems ] = useState('');
	const [ hidden, setHidden ] = useState(false);
	const [ sale_price, setSalePrice ] = useState(0);
	const [ sale_start_date, set_sale_start_date ] = useState('');
	const [ sale_end_date, set_sale_end_date ] = useState('');

	const [ package_volume, set_package_volume ] = useState(0);
	// const [ subcategories, set_subcategories ] = useState('');
	const [ subcategory, set_subcategory ] = useState('');
	const [ meta_title, set_meta_title ] = useState();
	const [ meta_description, set_meta_description ] = useState();
	const [ meta_keywords, set_meta_keywords ] = useState();
	const [ package_length, set_package_length ] = useState(0);
	const [ package_width, set_package_width ] = useState(0);
	const [ package_height, set_package_height ] = useState(0);
	const [ product_length, set_product_length ] = useState(0);
	const [ product_width, set_product_width ] = useState(0);
	const [ product_height, set_product_height ] = useState(0);
	const [ weight_pounds, set_weight_pounds ] = useState(0);
	const [ weight_ounces, set_weight_ounces ] = useState(0);
	const [ pathname, setPathname ] = useState();
	const [ order, setOrder ] = useState();
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	// const [ shouldBlockNavigation, set_shouldBlockNavigation ] = useState(false);

	const history = useHistory();

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const productReviewDelete = useSelector((state) => state.productReviewDelete);
	const { success: productDeleteSuccess } = productReviewDelete;

	const dispatch = useDispatch();

	// console.log({ product });

	// console.log({ ID: id });
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.pathname) {
				console.log('Is ID');
				stableDispatch(detailsProduct(props.match.params.pathname));
				stableDispatch(detailsProduct(props.match.params.pathname));
			} else {
				stableDispatch(detailsProduct(''));
			}
			stableDispatch(listProducts(''));

			// set_loading_data(false);
			set_state();
			return () => {};
		},
		[ stableDispatch ]
	);

	useEffect(() => {
		return () => {};
	}, []);

	const use_template = (e) => {
		dispatch(detailsProduct(e.target.value));
		// history.push('/secure/glow/products');
	};

	useEffect(
		() => {
			if (product) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ product, productDeleteSuccess ]
	);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const set_state = () => {
		console.log({ product_length: product.length });
		setId(product._id);
		setName(product.name);
		setPrice(product.price);
		setDescription(product.description);
		setFacts(product.facts);
		setIncludedItems(product.included_items);
		setHidden(product.hidden);
		setSalePrice(product.sale_price);
		if (product.sale_start_date) {
			set_sale_start_date(format_date(product.sale_start_date));
		}
		if (product.sale_end_date) {
			set_sale_end_date(format_date(product.sale_end_date));
		}
		set_package_volume(product.package_volume);
		set_meta_title(product.meta_title);
		set_meta_description(product.meta_description);
		set_meta_keywords(product.meta_keywords);
		set_package_length(product.package_length);
		set_package_width(product.package_width);
		set_package_height(product.package_height);
		set_product_length(product.product_length);
		set_product_width(product.product_width);
		set_product_height(product.product_height);
		set_weight_pounds(product.weight_pounds);
		set_weight_ounces(product.weight_ounces);
		// setDisplayImage(product.display_image);
		set_images(product.images);
		// set_image(product.image);
		setVideo(product.video);
		setBrand(product.brand);
		setCategory(product.category);
		set_subcategory(product.subcategory);
		setCountInStock(product.countInStock);
		props.match.params.pathname && setPathname(product.pathname);
		setOrder(product.order);
	};
	const unset_state = () => {
		setId('');
		setName('');
		setPrice(0);
		setDescription('');
		setFacts('');
		setIncludedItems('');
		// setDisplayImage([]);
		set_images([]);
		set_image('');
		setVideo('');
		setBrand('');
		setCategory('');
		// set_subcategories('');
		set_subcategory('');
		setCountInStock(0);
		setHidden(false);
		setSalePrice('');
		set_sale_start_date(format_date('2021-01-01'));
		set_sale_end_date(format_date('2021-01-01'));
		set_package_volume(1);
		set_meta_title('');
		set_meta_description('');
		set_meta_keywords('');
		// set_package_length(1);
		// set_package_width(1);
		// set_package_height(1);
		// set_product_length(1);
		// set_product_width(1);
		// set_product_height(1);
		set_weight_pounds(0);
		set_weight_ounces(0);
		setPathname('');
		setOrder(0);
	};
	// window.onbeforeunload = function() {
	// 	return 'Are you sure you want to leave?';
	// };

	const submitHandler = (e) => {
		console.log({ hidden });
		e.preventDefault();
		dispatch(
			saveProduct({
				_id: props.match.params.pathname && id,
				name,
				price,
				// display_image,
				images,
				video,
				brand,
				category,
				countInStock,
				facts,
				included_items,
				description,
				hidden,
				sale_price,
				sale_start_date: unformat_date(sale_start_date),
				sale_end_date: unformat_date(sale_end_date),
				package_volume: package_length * package_width * package_height,
				subcategory,
				meta_title: `${name} | Glow LEDs`,
				meta_description,
				meta_keywords,
				package_length,
				package_width,
				package_height,
				product_length,
				product_width,
				product_height,
				weight_pounds,
				weight_ounces,
				pathname: pathname ? pathname : snake_case(name),
				order
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/products');
	};

	// const format_effective_date = (start_date, end_date) => {
	//   console.log()
	//   return unformat_date(start_date) + 'T00:00-0800/' + unformat_date(end_date) + 'T23:59-0808'
	// }

	// useEffect(() => {
	// 	if (shouldBlockNavigation) {
	// 		window.onbeforeunload = () => true;
	// 	} else {
	// 		window.onbeforeunload = undefined;
	// 	}

	// 	return () => {};
	// }, []);

	// const delete_review = (review_id) => {
	// 	console.log({ review_id, id });
	// 	dispatch(deleteProductReview(id, review_id));
	// };

	const add_image = (e) => {
		e.preventDefault();
		console.log(image);
		if (image.indexOf(' ') >= 0) {
			console.log('indexOf');
			image.split(' ').map((image) => {
				set_images((images) => [ ...images, image ]);
			});
		} else if (images) {
			console.log('images.length > 0');
			set_images((images) => [ ...images, image ]);
		} else {
			console.log('images.length === 0');
			set_images([ image ]);
		}

		set_image('');
	};

	// const add_subcategory = (e) => {
	// 	e.preventDefault();
	// 	console.log(subcategory);
	// 	if (subcategory.indexOf(' ') >= 0) {
	// 		console.log('indexOf');
	// 		subcategory.split(' ').map((subcategory) => {
	// 			set_subcategories((subcategories) => [ ...subcategories, subcategory ]);
	// 		});
	// 	} else if (subcategories) {
	// 		console.log('subcategories.length > 0');
	// 		set_subcategories((subcategories) => [ ...subcategories, subcategory ]);
	// 	} else {
	// 		console.log('subcategories.length === 0');
	// 		set_subcategories([ subcategory ]);
	// 	}

	// 	set_subcategory('');
	// };

	const remove_image = (image_index, e) => {
		e.preventDefault();
		set_images((images) =>
			images.filter((image, index) => {
				return image_index !== index;
			})
		);
	};
	// const remove_subcategory = (subcategory_index, e) => {
	// 	e.preventDefault();
	// 	set_subcategories((subcategories) =>
	// 		subcategories.filter((subcategory, index) => {
	// 			return subcategory_index !== index;
	// 		})
	// 	);
	// };
	// const [ new_array, set_new_array ] = useState([]);
	// const [ new_array, set_new_array ] = useState([]);

	// useEffect(
	// 	() => {
	// 		set_images(new_array);

	// 		return () => {};
	// 	},
	// 	[ new_array ]
	// );

	const move_image_up = (image_index, e) => {
		e.preventDefault();
		const new_array = move(images, image_index, image_index - 1);
		set_images(new_array);
		// set_new_array(new_array);
		image_display(new_array);
	};
	const move_image_down = (image_index, e) => {
		e.preventDefault();
		const new_array = move(images, image_index, image_index + 1);
		set_images(new_array);
		// set_new_array(new_array);
		image_display(new_array);
	};

	function move(arr, old_index, new_index) {
		console.log({ arr, old_index, new_index });
		while (old_index < 0) {
			old_index += arr.length;
		}
		while (new_index < 0) {
			new_index += arr.length;
		}
		if (new_index >= arr.length) {
			var k = new_index - arr.length;
			while (k-- + 1) {
				arr.push(undefined);
			}
		}
		arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		console.log({ arr });
		return arr;
	}

	const image_display = (images) => {
		return (
			<div>
				<div className="row wrap">
					{images &&
						images.map((picture) => {
							return (
								<img
									style={{
										width: '100%',
										package_height: 'auto',
										maxWidth: '150px',
										maxHeight: '150px',
										borderRadius: '15px',
										marginRight: '10px'
									}}
									className="mv-10px"
									src={picture}
								/>
							);
						})}
				</div>
				<div className="jc-b">
					<div>
						{images &&
							images.map((picture, index) => {
								return (
									<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per">
										<div>
											<button className="btn icon" onClick={(e) => remove_image(index, e)}>
												<i className="fas fa-times mr-5px" />
											</button>
											{picture}
										</div>
										<div>
											{index > 0 && (
												<button className="btn icon" onClick={(e) => move_image_up(index, e)}>
													<i className=" fas fa-sort-up" />
												</button>
											)}

											{index < images.length - 1 && (
												<button className="btn icon" onClick={(e) => move_image_down(index, e)}>
													<i
														style={{ '-webkitTransform': 'rotate(-180deg)' }}
														className=" fas fa-sort-up"
													/>
												</button>
											)}
										</div>
									</div>
								);
							})}
					</div>
					<li>
						<label htmlFor="images">Images</label>
						<textarea
							className="edit_product_textarea w-450px h-100per"
							name="images"
							value={images}
							id="images"
							// onChange={(e) => set_images(e.target.value)}
						/>
					</li>
				</div>
			</div>
		);
	};
	// const subcategory_display = (subcategories) => {
	// 	return (
	// 		<div className=" w-100per">
	// 			{subcategories &&
	// 				subcategories.map((subcategory, index) => {
	// 					return (
	// 						<div className="promo_code mv-1rem w-100per row jc-b max-w-55rem w-100per">
	// 							<div className=" w-100per">
	// 								<button className="btn icon" onClick={(e) => remove_subcategory(index, e)}>
	// 									<i className="fas fa-times mr-5px" />
	// 								</button>
	// 								{subcategory}
	// 							</div>
	// 						</div>
	// 					);
	// 				})}
	// 		</div>
	// 	);
	// };

	const move_left = () => {};
	const move_right = () => {};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.pathname ? 'Edit Product' : 'Create Product'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} className="w-100per">
					<Loading loading={loading} error={error}>
						{product && (
							<div>
								<Helmet>
									<title>Edit Product | Glow LEDs</title>
								</Helmet>
								{/* <Prompt
									when={shouldBlockNavigation}
									message="You have unsaved changes, are you sure you want to leave?"
								/> */}
								<ul
									className="edit-form-container"
									style={{ maxWidth: '105rem', marginBottom: '20px' }}
								>
									<div className="row">
										<div className="ai-c">
											<button
												style={{ borderRadius: '50%' }}
												className="btn icon h-59px"
												onClick={() => move_left()}
											>
												<i className="fas fa-arrow-circle-left fs-40px" />
											</button>
										</div>
										<h2
											style={{
												textAlign: 'center',
												width: '100%',
												marginRight: 'auto',
												justifyContent: 'center'
											}}
											className="ta-c "
										>
											{loading ? 'Product' : product.name}
										</h2>
										<div className="ai-c">
											<button
												style={{ borderRadius: '50%' }}
												className="btn icon h-59px"
												onClick={() => move_right()}
											>
												<i className="fas fa-arrow-circle-right fs-40px" />
											</button>
										</div>
									</div>
									<li>
										{/* <label
											aria-label="sortOrder"
											htmlFor="sortOrder"
											className="select-label mb-15px jc-c"
										>
											Product
										</label> */}
										<div className="ai-c h-25px mb-15px jc-c">
											<div className="custom-select">
												<select
													className="qty_select_dropdown"
													onChange={(e) => use_template(e)}
												>
													<option key={1} defaultValue="">
														---Choose Product as a Template---
													</option>
													{products.map((product, index) => (
														<option key={index} value={product.pathname}>
															{product.name}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</li>
									<div className="row wrap jc-b">
										<div className="w-228px m-10px">
											<li>
												<label htmlFor="name">Name</label>
												<input
													type="text"
													name="name"
													value={name}
													id="name"
													onChange={(e) => setName(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="price">Price</label>
												<input
													type="text"
													name="price"
													value={price}
													id="price"
													onChange={(e) => setPrice(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="sale_price">Sale Price</label>
												<input
													type="text"
													name="sale_price"
													value={sale_price}
													id="sale_price"
													onChange={(e) => setSalePrice(e.target.value)}
												/>
											</li>
											<li>
												<div className="jc-b">
													<div>
														<label htmlFor="sale_start_date">Start Date</label>
														<input
															type="text"
															className="w-100per"
															name="sale_start_date"
															value={sale_start_date}
															id="sale_start_date"
															onChange={(e) => set_sale_start_date(e.target.value)}
														/>
													</div>
													<div className="m-7px pt-22px">
														<i className="fas fa-minus" />
													</div>
													<div>
														<label htmlFor="sale_end_date">End Date</label>
														<input
															type="text"
															className="w-100per"
															name="sale_end_date"
															value={sale_end_date}
															id="sale_end_date"
															onChange={(e) => set_sale_end_date(e.target.value)}
														/>
													</div>
												</div>
											</li>
											<li />
											<li>
												<label htmlFor="category">Category</label>
												<input
													type="text"
													name="category"
													value={category}
													id="category"
													onChange={(e) => setCategory(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="subcategory">Subcategories</label>
												<input
													type="text"
													name="subcategory"
													value={subcategory}
													id="subcategory"
													onChange={(e) => set_subcategory(e.target.value)}
												/>
												{/* <button className="btn primary" onClick={(e) => add_subcategory(e)}>
													Add Subcategory
												</button>
												{subcategory_display(subcategories)} */}
											</li>
											<li>
												<label htmlFor="brand">Brand</label>
												<input
													type="text"
													name="brand"
													value={brand}
													id="brand"
													onChange={(e) => setBrand(e.target.value)}
												/>
											</li>
											{/* <li>
												<label htmlFor="display_image">Display Image</label>
												<input
													type="text"
													name="display_image"
													value={display_image}
													id="display_image"
													onChange={(e) => setDisplayImage(e.target.value)}
												/>
											</li> */}
											{/* <li>
												<label htmlFor="display_image">Display Image</label>
												<input
													type="text"
													name="display_image"
													value={display_image}
													id="display_image"
													onChange={(e) => setDisplayImage(e.target.value)}
												/>
											</li> */}
											<li>
												<label htmlFor="video">Video</label>
												<input
													type="text"
													name="video"
													defaultValue={video}
													id="video"
													onChange={(e) => setVideo(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="hidden">Hide Product</label>
													<input
														type="checkbox"
														name="hidden"
														// defaultChecked={hidden ? 'checked' : 'unchecked'}
														// defaultValue={hidden}
														defaultChecked={hidden}
														// value={hidden ? '1' : '0'}
														id="hidden"
														onChange={(e) => {
															setHidden(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="image">image</label>
												<input
													type="text"
													name="image"
													value={image}
													id="image"
													onChange={(e) => set_image(e.target.value)}
												/>
												<button className="btn primary" onClick={(e) => add_image(e)}>
													Add Image
												</button>
											</li>
										</div>

										<div className="w-228px m-10px">
											<li>
												<label htmlFor="countInStock">Count In Stock</label>
												<input
													type="text"
													name="countInStock"
													value={countInStock}
													id="countInStock"
													onChange={(e) => setCountInStock(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="facts">Facts</label>
												<textarea
													className="edit_product_textarea"
													name="facts"
													defaultValue={facts}
													id="facts"
													onChange={(e) => setFacts(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="included_items">Included Items</label>
												<textarea
													className="edit_product_textarea"
													name="included_items"
													defaultValue={included_items}
													id="included_items"
													onChange={(e) => setIncludedItems(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="description">Description</label>
												<textarea
													className="edit_product_textarea"
													name="description"
													value={description}
													id="description"
													onChange={(e) => setDescription(e.target.value)}
												/>
											</li>
										</div>
										<div className="column" styles={{ width: '228px', margin: '10px' }}>
											<li>
												<label htmlFor="pathname">Pathname</label>
												<input
													type="text"
													name="pathname"
													defaultValue={pathname ? pathname : name && snake_case(name)}
													id="pathname"
													onChange={(e) => setPathname(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="order">Order</label>
												<input
													type="text"
													name="order"
													defaultValue={order}
													id="order"
													onChange={(e) => setOrder(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="meta_title">Meta Title</label>
												<input
													type="text"
													name="meta_title"
													value={name && `${name} | Glow LEDs`}
													id="meta_title"
													onChange={(e) => set_meta_title(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="meta_description">Meta Description</label>
												<textarea
													className="edit_product_textarea"
													name="meta_description"
													value={meta_description}
													id="meta_description"
													onChange={(e) => set_meta_description(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="meta_keywords">Meta Keywords</label>
												<textarea
													className="edit_product_textarea"
													name="meta_keywords"
													value={meta_keywords}
													id="meta_keywords"
													onChange={(e) => set_meta_keywords(e.target.value)}
												/>
											</li>
										</div>
										<div className="w-228px m-10px">
											<h3>Product Dimmensions</h3>
											<li>
												<label htmlFor="product_length">Product Length</label>
												<input
													type="text"
													name="product_length"
													defaultValue={product_length}
													id="product_length"
													onChange={(e) => set_product_length(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="product_width">Product Width</label>
												<input
													type="text"
													name="product_width"
													value={product_width}
													id="product_width"
													onChange={(e) => set_product_width(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="product_height">Product Height</label>
												<input
													type="text"
													name="product_height"
													value={product_height}
													id="product_height"
													onChange={(e) => set_product_height(e.target.value)}
												/>
											</li>
											<h3>Package Dimmensions</h3>
											<li>
												<label htmlFor="package_length">Package Length</label>
												<input
													type="text"
													name="package_length"
													defaultValue={package_length}
													id="package_length"
													onChange={(e) => set_package_length(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="package_width">Package Width</label>
												<input
													type="text"
													name="package_width"
													value={package_width}
													id="package_width"
													onChange={(e) => set_package_width(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="package_height">Package Height</label>
												<input
													type="text"
													name="package_height"
													value={package_height}
													id="package_height"
													onChange={(e) => set_package_height(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="package_volume">Package Volume</label>
												<input
													type="text"
													name="package_volume"
													value={
														package_length &&
														package_width &&
														package_height &&
														package_length * package_width * package_height
													}
													id="package_volume"
													onChange={(e) => set_package_volume(e.target.value)}
												/>
											</li>
											{/* <li>
												<label htmlFor="package_height">
													Calculated Volume {length && length * package_width * package_height}
												</label>
											</li> */}
											<li>
												<label htmlFor="weight_pounds">Package lbs</label>
												<input
													type="text"
													name="weight_pounds"
													value={weight_pounds}
													id="weight_pounds"
													onChange={(e) => set_weight_pounds(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="weight_ounces">Package oz</label>
												<input
													type="text"
													name="weight_ounces"
													value={weight_ounces}
													id="weight_ounces"
													onChange={(e) => set_weight_ounces(e.target.value)}
												/>
											</li>
										</div>
									</div>
									{image_display(images)}
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Products
										</button>
									</li>
								</ul>
							</div>
						)}
					</Loading>
				</form>
			</div>
		</div>
	);
};
export default EditProductPage;
