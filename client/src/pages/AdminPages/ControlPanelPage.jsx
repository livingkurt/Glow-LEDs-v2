import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import { listOrders } from '../../actions/orderActions';
import { listExpenses } from '../../actions/expenseActions';
import { listUsers } from '../../actions/userActions';
import Chart from 'chart.js';
import { hslToHex, unformat_date } from '../../utils/helper_functions';
import { API_Revenue, API_Products } from '../../utils';
import { listAffiliates } from '../../actions/affiliateActions';
import { listPromos } from '../../actions/promoActions';
import { Helmet } from 'react-helmet';

const ControlPanelPage = (props) => {
	const dispatch = useDispatch();

	const occurrence_chart_ref = useRef();
	const monthly_income_chart_ref = useRef();

	const expenseList = useSelector((state) => state.expenseList);
	const { expenses } = expenseList;

	const orderList = useSelector((state) => state.orderList);
	const { orders } = orderList;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates } = affiliateList;

	const promoList = useSelector((state) => state.promoList);
	const { promos } = promoList;

	// const [ product_occurrences, set_product_occurrences ] = useState([]);
	const [ daily_orders, set_daily_orders ] = useState([]);
	const [ weekly_orders, set_weekly_orders ] = useState([]);
	const [ monthly_orders, set_monthly_orders ] = useState([]);
	const [ daily_income, set_daily_income ] = useState([]);
	const [ monthly_income, set_monthly_income ] = useState([]);
	const [ total_affiliate_revenue, set_total_affiliate_revenue ] = useState([]);
	const [ total_promo_code_usage, set_total_promo_code_usage ] = useState([]);

	useEffect(() => {
		dispatch(listOrders('', '', '', 'all'));
		dispatch(listExpenses());
		dispatch(listProducts());
		dispatch(listUsers());
		dispatch(listAffiliates());
		dispatch(listPromos());
		get_income();

		// get_daily_income();
		// get_monthly_income();
	}, []);

	useEffect(
		() => {
			get_occurrences();
			return () => {};
		},
		[ orders ]
	);

	useEffect(
		() => {
			if (orders && affiliates) {
				get_total();
			}

			return () => {};
		},
		[ affiliates, orders ]
	);
	useEffect(
		() => {
			setTimeout(() => {
				initialize_monthly_income_chart(monthly_income);
			}, 3000);
			return () => {};
		},
		[ monthly_income ]
	);

	const get_total = () => {
		const uses = affiliates.map((affiliate) => {
			return orders.filter((order) => {
				return order.promo_code && order.promo_code.toLowerCase() === affiliate.promo_code.toLowerCase();
			}).length;
		});
		set_total_promo_code_usage(uses.reduce((a, c) => a + c, 0));
		console.log({ uses });
		const revenue = affiliates.map((affiliate) => {
			return orders
				.filter(
					(order) => order.promo_code && order.promo_code.toLowerCase() === affiliate.promo_code.toLowerCase()
				)
				.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
				.toFixed(2);
		});
		set_total_affiliate_revenue(revenue.reduce((a, c) => parseFloat(a) + parseFloat(c), 0));
		console.log({ revenue });
	};

	const duration_of_opening = () => {
		const current_date = new Date();
		const start_date = new Date('2020-08-10');
		var difference_in_time = current_date.getTime() - start_date.getTime();
		var difference_in_day = difference_in_time / (1000 * 3600 * 24);
		return difference_in_day;
	};

	const get_occurrences = async () => {
		const { data: occurrences } = await API_Products.get_occurrences();
		// set_product_occurrences(occurrences);
		initialize_occurrence_chart(occurrences);
	};
	const initialize_occurrence_chart = (occurrences) => {
		const occurrence_occurrence_chart_ref = occurrence_chart_ref.current.getContext('2d');
		const multiplier = 360 / occurrences.filter((product) => product.occurrence > 1).length;

		let num = -multiplier;
		// console.log(
		// 	occurrences.map((item) => {
		// 		num += multiplier;
		// 		// return `hsl(${num}, 100%, 50%)`;
		// 		let color = hslToHex(num, 100, 50);
		// 		return color;
		// 	})
		// );
		new Chart(occurrence_occurrence_chart_ref, {
			type: 'bar',
			data: {
				//Bring in data
				labels: occurrences.filter((product) => product.occurrence > 1).map((product) => product.name),
				datasets: [
					{
						label: 'Product',
						data: occurrences
							.filter((product) => product.occurrence > 1)
							.map((product) => product.occurrence),
						fill: true,
						borderColor: '#3e4c6d',
						// backgroundColor: '#333333',
						// backgroundColor: [ 'red', 'blue', 'green', 'blue', 'red', 'blue' ],
						backgroundColor: occurrences.map((item) => {
							num += multiplier;
							let color = hslToHex(num, 100, 50);
							// return `hsl(${num}, 50%, 100%)`;
							return color;
						}),
						color: 'white'
					}
				]
			},
			options: {
				// Responsive Design
				responsive: true,
				maintainAspectRatio: true,
				// Customize the Layout
				layout: {
					padding: {
						top: 5,
						left: 15,
						right: 15,
						bottom: 15
					}
				},
				legend: {
					labels: {
						display: true,
						fontColor: 'white'
					}
				},
				title: {
					display: false,
					fontColor: 'white',
					text: 'Occurrences'
				},
				scales: {
					xAxes: [
						{
							ticks: {
								display: true,
								fontColor: 'white'
							},
							gridLines: {
								display: true,
								// drawBorder: false,
								fontColor: 'white'
							}
						}
					],
					yAxes: [
						{
							ticks: {
								display: true,
								fontColor: 'white'
							},
							gridLines: {
								display: true,
								// drawBorder: false,
								fontColor: 'white'
							}
						}
					]
				}
			}
			// // Removing Data Ticks, Graph Lines, and Borders
		});
		// const expense_doughnut_chart = expense_doughnut_ref.current.getContext('2d');
		// new Chart(expense_doughnut_chart, {
		// 	type: 'doughnut',
		// 	data: [
		// 		expenses.filter((expense) => expense === 'Supplies').map((expense) => expense.amount),
		// 		expenses.filter((expense) => expense === 'Business').map((expense) => expense.amount),
		// 		expenses.filter((expense) => expense === 'Website').map((expense) => expense.amount)
		// 	],
		// 	labels: [ 'Supplies', 'Business', 'Website' ],
		// 	options: {}
		// });
	};

	const get_income = async () => {
		const { data: daily } = await API_Revenue.get_daily_income();
		// console.log({ daily });
		set_daily_orders(daily);
		const { data: weekly } = await API_Revenue.get_weekly_income();
		// console.log({ weekly });
		set_weekly_orders(weekly);
		const { data: monthly } = await API_Revenue.get_monthly_income();
		// console.log({ monthly });
		set_monthly_orders(monthly);
	};
	const get_each_day_income = async (date) => {
		// console.log({ date });
		const data = await API_Revenue.get_each_day_income(date);
		return data;
		// console.log({ data });
		// return daily;
	};
	const get_each_month_income = async (date) => {
		// console.log({ date });
		const data = await API_Revenue.get_each_month_income(date);
		return data;
		// console.log({ data });
		// return daily;
	};

	// const month= ["January","February","March","April","May","June","July",
	//           "August","September","October","November","December"];
	const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

	const get_daily_income = async () => {
		const income_each_day = [];
		dates_in_year.forEach(async (month, month_number) => {
			[ ...Array(month.number_of_days).keys() ].map(async (day, index) => {
				const formatted_date =
					(month_number + 1 < 10 ? `0${month_number + 1}` : month_number + 1) + '/' + (day + 1) + '/' + 2020;
				const unformatted_date = unformat_date(
					`${month_number + 1 < 10 ? `0${month_number + 1}` : month_number + 1}/${day + 1}/2020`
				);
				const { data } = await get_each_day_income(unformatted_date);
				// console.log({ data });
				let income = 0;
				if (data.length > 1) {
					income = data.reduce((a, c) => a + c.totalPrice - c.taxPrice, 0);
					// console.log({ income });
				}
				income_each_day.push({ date: formatted_date, income });
			});
		});
		// console.log({ income_each_day });
		set_daily_income(income_each_day);
	};
	const get_monthly_income = async () => {
		const income_each_month = [];
		dates_in_year.map(async (month, month_number) => {
			const formatted_date = (month_number + 1 < 10 ? `0${month_number + 1}` : month_number + 1) + '/01/' + 2020;
			const unformatted_date = unformat_date(
				(month_number + 1 < 10 ? `0${month_number + 1}` : month_number + 1) + '/01/' + 2020
			);
			const { data } = await get_each_month_income(unformatted_date);
			console.log({ data });
			let income = 0;
			if (data.length > 1) {
				income = data.reduce((a, c) => a + c.totalPrice - c.taxPrice, 0);
				console.log({ month: dates_in_year[month_number].month, income });
			}
			income_each_month.push({ month: dates_in_year[month_number].month, income });
			// return unformatted_date;
		});
		console.log({ income_each_month });
		set_monthly_income(income_each_month);
		// initialize_monthly_income_chart(income_each_month);
	};
	console.log({ monthly_income });

	const initialize_monthly_income_chart = () => {
		const monthly_income_monthly_income_chart_ref = monthly_income_chart_ref.current.getContext('2d');
		const multiplier = 360 / monthly_income.length;
		console.log({ month: monthly_income.map((month) => month.month) });
		console.log({ monthly_income });

		let num = -multiplier;
		new Chart(monthly_income_monthly_income_chart_ref, {
			type: 'bar',
			data: {
				//Bring in data
				labels: monthly_income.map((month) => month.month),
				datasets: [
					{
						label: 'Income',
						data: monthly_income.map((month) => month.income),
						fill: true,
						borderColor: '#3e4c6d',
						backgroundColor: monthly_income.map((item) => {
							num += multiplier;
							let color = hslToHex(num, 100, 50);
							return color;
						}),
						color: 'white'
					}
				]
			},
			options: {
				// Responsive Design
				responsive: true,
				maintainAspectRatio: true,
				// Customize the Layout
				layout: {
					padding: {
						top: 5,
						left: 15,
						right: 15,
						bottom: 15
					}
				},
				legend: {
					labels: {
						display: true,
						fontColor: 'white'
					}
				},
				title: {
					display: false,
					fontColor: 'white',
					text: 'Occurrences'
				},
				scales: {
					xAxes: [
						{
							ticks: {
								display: true,
								fontColor: 'white'
							},
							gridLines: {
								display: true,
								// drawBorder: false,
								fontColor: 'white'
							}
						}
					],
					yAxes: [
						{
							ticks: {
								display: true,
								fontColor: 'white'
							},
							gridLines: {
								display: true,
								// drawBorder: false,
								fontColor: 'white'
							}
						}
					]
				}
			}
			// // Removing Data Ticks, Graph Lines, and Borders
		});
		// const expense_doughnut_chart = expense_doughnut_ref.current.getContext('2d');
		// new Chart(expense_doughnut_chart, {
		// 	type: 'doughnut',
		// 	data: [
		// 		expenses.filter((expense) => expense === 'Supplies').map((expense) => expense.amount),
		// 		expenses.filter((expense) => expense === 'Business').map((expense) => expense.amount),
		// 		expenses.filter((expense) => expense === 'Website').map((expense) => expense.amount)
		// 	],
		// 	labels: [ 'Supplies', 'Business', 'Website' ],
		// 	options: {}
		// });
	};

	const dates_in_year = [
		{ month: 'January', number_of_days: 31 },
		{ month: 'February', number_of_days: 28 },
		{ month: 'March', number_of_days: 31 },
		{ month: 'April', number_of_days: 30 },
		{ month: 'May', number_of_days: 31 },
		{ month: 'June', number_of_days: 30 },
		{ month: 'July', number_of_days: 31 },
		{ month: 'August', number_of_days: 31 },
		{ month: 'September', number_of_days: 30 },
		{ month: 'October', number_of_days: 31 },
		{ month: 'November', number_of_days: 30 },
		{ month: 'December', number_of_days: 31 }
	];

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Control Panel | Glow LEDs</title>8
			</Helmet>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Control Panel</h1>
			</div>
			<div className="jc-b">
				<Link to="/secure/glow/orders">
					<button className="btn primary">Orders</button>
				</Link>
				<Link to="/secure/glow/products">
					<button className="btn primary"> Products</button>
				</Link>
				<Link to="/secure/glow/users">
					<button className="btn primary"> Users</button>
				</Link>
				<Link to="/secure/glow/expenses">
					<button className="btn primary"> Expenses</button>
				</Link>
				<Link to="/secure/glow/features">
					<button className="btn primary"> Features</button>
				</Link>
				<Link to="/secure/glow/affiliates">
					<button className="btn primary"> Affiliates</button>
				</Link>
				<Link to="/secure/glow/promos">
					<button className="btn primary">Promos</button>
				</Link>
				<Link to="/secure/glow/carts">
					<button className="btn primary">Carts</button>
				</Link>
				<Link to="/secure/glow/contents">
					<button className="btn primary">Contents</button>
				</Link>
				<Link to="/secure/glow/emails">
					<button className="btn primary">Emails</button>
				</Link>
			</div>
			<div className="jc-b">
				{expenses &&
				orders && (
					<div className="order-list responsive_table">
						<h2 className="ta-c w-100per jc-c">Expenses</h2>
						<table className="table">
							<thead>
								<tr>
									<th>Category</th>
									<th>Expense</th>
								</tr>
							</thead>
							<tbody>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
									className=""
								>
									<th style={{ padding: '15px' }}>Total Expenses</th>
									<th style={{ padding: '15px' }}>
										${expenses.reduce((a, expense) => a + expense.amount, 0).toFixed(2)}
									</th>
								</tr>

								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Income</th>
									<th style={{ padding: '15px' }}>
										${orders
											.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
											.toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Taxes Collected</th>
									<th style={{ padding: '15px' }}>
										${orders.reduce((a, order) => a + order.taxPrice, 0).toFixed(2)}
									</th>
								</tr>

								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Profit</th>
									<th style={{ padding: '15px' }}>
										${(orders.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0) +
											expenses.reduce((a, order) => a + order.amount, 0)).toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Days Open</th>
									<th style={{ padding: '15px' }}>{duration_of_opening().toFixed(0)}</th>
								</tr>
							</tbody>
						</table>
					</div>
				)}
				{expenses &&
				orders &&
				weekly_orders &&
				daily_orders &&
				monthly_orders && (
					<div className="order-list responsive_table">
						<h2 className="ta-c w-100per jc-c">Income</h2>
						<table className="table">
							<thead>
								<tr>
									<th>Category</th>
									<th>Expense</th>
								</tr>
							</thead>
							<tbody>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Daily Income</th>
									<th style={{ padding: '15px' }}>
										${daily_orders &&
											daily_orders
												.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
												.toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Weekly Income</th>
									<th style={{ padding: '15px' }}>
										${weekly_orders &&
											weekly_orders
												.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
												.toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Monthly Income</th>
									<th style={{ padding: '15px' }}>
										${monthly_orders &&
											monthly_orders
												.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
												.toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Average Daily Income</th>
									<th style={{ padding: '15px' }}>
										${(orders.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0) /
											duration_of_opening()).toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Average Weekly Income</th>
									<th style={{ padding: '15px' }}>
										${(orders.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0) /
											(duration_of_opening() / 7)).toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Average Monthly Income</th>
									<th style={{ padding: '15px' }}>
										${(orders.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0) /
											(duration_of_opening() / 30)).toFixed(2)}
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				)}
				{expenses &&
				orders &&
				products &&
				users && (
					<div className="order-list responsive_table">
						<h2 className="ta-c w-100per jc-c">Metrics</h2>
						<table className="table">
							<thead>
								<tr>
									<th>Category</th>
									<th>Count</th>
								</tr>
							</thead>
							<tbody>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
									className=""
								>
									<th style={{ padding: '15px' }}>Total Products</th>
									<th style={{ padding: '15px' }}>{products.length}</th>
								</tr>

								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Orders</th>
									<th style={{ padding: '15px' }}>{orders.length}</th>
								</tr>

								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Users</th>
									<th style={{ padding: '15px' }}>{users.length}</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Expenses</th>
									<th style={{ padding: '15px' }}>{expenses.length}</th>
								</tr>
							</tbody>
						</table>
					</div>
				)}
				{console.log({ orders })}
				{orders &&
				promos &&
				affiliates && (
					<div className="order-list responsive_table">
						<h2 className="ta-c w-100per jc-c">Affiliate Revenue</h2>
						<table className="table">
							<thead>
								<tr>
									<th>Affiliate</th>
									<th>Number of Uses</th>
									<th>Revenue</th>
								</tr>
							</thead>
							<tbody>
								{affiliates.map((affiliate) => {
									return (
										<tr
											style={{
												backgroundColor: '#626262',
												fontSize: '1.4rem',
												height: '50px'
											}}
											className=""
										>
											<th style={{ padding: '15px' }}>{affiliate.promo_code}</th>
											<th style={{ padding: '15px' }}>
												{
													orders.filter((order) => {
														return (
															order.promo_code &&
															order.promo_code.toLowerCase() ===
																affiliate.promo_code.toLowerCase()
														);
													}).length
												}
											</th>
											<th style={{ padding: '15px' }}>
												${orders
													.filter(
														(order) =>
															order.promo_code &&
															order.promo_code.toLowerCase() ===
																affiliate.promo_code.toLowerCase()
													)
													.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
													.toFixed(2)}
											</th>
										</tr>
									);
								})}
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
									className=""
								>
									<th style={{ padding: '15px' }}>Total</th>
									<th style={{ padding: '15px' }}>
										{/* {
											orders.filter((order) => {
												return affiliates
													.map((affiliate) => affiliate.artist_name)
													.includes(order.promo_code);
											}).length
										} */}

										{total_promo_code_usage}
									</th>
									<th style={{ padding: '15px' }}>
										${total_affiliate_revenue > 0 && total_affiliate_revenue.toFixed(2)}
										{/* ${orders
											.filter((order) =>
												affiliates
													.map((affiliate) => affiliate.artist_name)
													.includes(order.promo_code)
											)
											.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
											.toFixed(2)} */}
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
			<h2 className="ta-c w-100per jc-c">Occurrences</h2>
			<canvas id="occurrence_chart" ref={occurrence_chart_ref} />
			{/* {product_occurrences && (
				<div className="order-list responsive_table">
					<table className="table">
						<thead>
							<tr>
								<th>Category</th>
								<th>Number of Occurrences</th>
							</tr>
						</thead>
						<tbody>
							{product_occurrences.map((item, index) => {
								return (
									<tr
										key={index}
										style={{
											backgroundColor: '#626262',
											fontSize: '1.4rem',
											height: '50px'
										}}
										className=""
									>
										<th style={{ padding: '15px' }}>{item.name}</th>
										<th style={{ padding: '15px' }}>{item.occurrence}</th>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)} */}
			<h2 className="ta-c w-100per jc-c">Monthly Income</h2>
			<canvas id="monthly_income_chart" ref={monthly_income_chart_ref} />
			{monthly_income.length > 1 && (
				<div className="order-list responsive_table">
					<table className="table">
						<thead>
							<tr>
								<th>Date</th>
								<th>Daily Income</th>
							</tr>
						</thead>
						<tbody>
							{monthly_income.map((month, index) => {
								return (
									<tr
										key={index}
										style={{
											backgroundColor: '#626262',
											fontSize: '1.4rem',
											height: '50px'
										}}
										className=""
									>
										<th style={{ padding: '15px' }}>{month.month}</th>
										<th style={{ padding: '15px' }}>${month.income.toFixed(2)}</th>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
			<h2 className="ta-c w-100per jc-c">Daily Income</h2>
			{daily_income && (
				<div className="order-list responsive_table">
					<table className="table">
						<thead>
							<tr>
								<th>Date</th>
								<th>Daily Income</th>
							</tr>
						</thead>
						<tbody>
							{daily_income.map((day, index) => {
								return (
									<tr
										key={index}
										style={{
											backgroundColor: '#626262',
											fontSize: '1.4rem',
											height: '50px'
										}}
										className=""
									>
										<th style={{ padding: '15px' }}>{day.date}</th>
										<th style={{ padding: '15px' }}>${day.income.toFixed(2)}</th>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
export default ControlPanelPage;
