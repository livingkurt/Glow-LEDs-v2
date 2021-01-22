import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listExpenses, deleteExpense } from '../../actions/expenseActions';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Search, Sort } from '../../components/SpecialtyComponents/index';
import { Helmet } from 'react-helmet';
import { format_date, unformat_date } from '../../utils/helper_functions';
import { API_Revenue } from '../../utils';
import CSVReader from 'react-csv-reader';

const ExpensesPage = (props) => {
	// const user_data = props.userinfo;
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ card_type, set_card_type ] = useState('GL AMEX');
	const history = useHistory();

	const category = props.match.params.category ? props.match.params.category : '';

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const expenseList = useSelector((state) => state.expenseList);
	const { loading, expenses, error } = expenseList;

	const expenseSave = useSelector((state) => state.expenseSave);
	const { success: successSave } = expenseSave;

	const expenseDelete = useSelector((state) => state.expenseDelete);
	const { success: successDelete } = expenseDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listExpenses(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listExpenses(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listExpenses(category, searchKeyword, e.target.value));
	};

	// useEffect(() => {
	// 	dispatch(listExpenses());
	// 	return () => {
	// 		//
	// 	};
	// }, []);
	useEffect(
		() => {
			dispatch(listExpenses());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);
	const deleteHandler = (expense) => {
		dispatch(deleteExpense(expense._id));
	};

	const colors = [
		{ name: 'Supplies', color: '#6d3e3e' },
		{ name: 'Website', color: '#6d3e5c' },
		{ name: 'Shipping', color: '#3e4c6d' },
		{ name: 'Business', color: '#6d5a3e' },
		{ name: 'Equipment', color: '#3f6561' },
		{ name: 'Refunds', color: '#4a4a4a' }
	];

	const determine_color = (expense) => {
		let result = '';
		if (expense.category === 'Supplies') {
			result = colors[0].color;
		}
		if (expense.category === 'Website') {
			result = colors[1].color;
		}
		if (expense.category === 'Shipping') {
			result = colors[2].color;
		}
		if (expense.category === 'Business') {
			result = colors[3].color;
		}
		if (expense.category === 'Equipment') {
			result = colors[4].color;
		}
		if (expense.amount < 0) {
			result = colors[5].color;
		}
		// console.log(result);
		return result;
	};

	const sort_options = [ 'Date', 'Category', 'Application', 'Newest', 'Lowest', 'Highest' ];

	const handle_csv_expenses = async (data, fileInfo, properties, card) => {
		const expenses = [];
		for (let line = 1; line < data.length; line++) {
			const object = {};
			for (let i = 0; i < data[line].length; i++) {
				object[properties[i]] = data[line][i];
			}
			expenses.push(object);
		}
		expenses.forEach(async (expense) => {
			expense = { ...expense, date: unformat_date(expense.date) };
			const post_expense = await API_Revenue.post_expense(expense, userInfo, card);
		});
		dispatch(listExpenses(category, searchKeyword, sortOrder));
	};

	const card_types = [ 'FID', 'GL AMEX', 'AMZNK' ];

	const determine_card_type = (data, fileInfo) => {
		let properties = [];
		switch (card_type) {
			case 'FID':
				properties = [ 'date', 'transaction', 'place', 'memo', 'amount' ];
				return handle_csv_expenses(data, fileInfo, properties, 'FID');
			case 'GL AMEX':
				properties = [ 'date', 'receipt', 'place', 'amount' ];
				return handle_csv_expenses(data, fileInfo, properties, 'GL AMEX');
			case 'AMZNK':
				properties = [ 'date', 'post_date', 'place', 'category', 'type', 'amount' ];
				return handle_csv_expenses(data, fileInfo, properties, 'AMZNK');
		}
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Expenses | Glow LEDs</title>
			</Helmet>

			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{colors.map((color) => {
						return (
							<div className="wrap jc-b w-16rem m-1rem">
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</div>
						);
					})}
				</div>
				<Link to="/secure/glow/editexpense">
					<button className="btn primary" style={{ width: '160px' }}>
						Create Expense
					</button>
				</Link>
			</div>
			<div className="ai-c w-325px jc-b">
				<div className="">
					<div className="custom-select">
						<select
							className="qty_select_dropdown"
							onChange={(e) => set_card_type(e.target.value)}
							value={card_type}
						>
							<option key={1} defaultValue="">
								---Card Type---
							</option>
							{card_types.map((type, index) => (
								<option key={index} value={type}>
									{type}
								</option>
							))}
						</select>
						<span className="custom-arrow" />
					</div>
				</div>
				<label className="btn primary">
					Upload CSV
					<CSVReader onFileLoaded={(data, fileInfo) => determine_card_type(data, fileInfo)} />
				</label>
			</div>

			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Expenses</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{expenses && (
					<div className="expense-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Total</th>
									<th>Supplies</th>
									<th>Website</th>
									<th>Shipping</th>
									<th>Business</th>
								</tr>
							</thead>
							<tbody>
								<tr
									// key={expense._id}
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem'
									}}
								>
									<td className="p-10px">
										<label>
											${expenses.reduce((a, expense) => a + expense.amount, 0).toFixed(2)}
										</label>
									</td>
									<td className="p-10px">
										<label>
											${expenses
												.filter((expense) => expense.category === 'Supplies')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
									<td className="p-10px">
										<label>
											${expenses
												.filter((expense) => expense.category === 'Website')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
									<td className="p-10px">
										<label>
											${expenses
												.filter((expense) => expense.category === 'Shipping')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
									<td className="p-10px">
										<label>
											${expenses
												.filter((expense) => expense.category === 'Business')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
								</tr>
							</tbody>
						</table>
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>expense name</th>
									<th>date</th>
									<th>category</th>
									<th>amount</th>
									<th>card</th>
									<th>place</th>
									<th>application</th>
									{/* <th>url</th> */}
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{expenses.map((expense) => (
									<tr
										key={expense._id}
										style={{
											backgroundColor: determine_color(expense),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px">{expense._id}</td>
										<td className="p-10px min-w-300px">{expense.expense_name}</td>
										<td className="p-10px">{format_date(expense.date_of_purchase)}</td>
										<td className="p-10px">{expense.category}</td>
										<td className="p-10px">
											${expense.amount ? expense.amount.toFixed(2) : expense.amount}
										</td>
										<td className="p-10px min-w-100px">{expense.card}</td>
										<td className="p-10px min-w-150px">{expense.place_of_purchase}</td>
										<td className="p-10px min-w-200px">{expense.application}</td>
										{/* <td className="p-10px min-w-800px">{expense.url}</td> */}
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editexpense/' + expense._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(expense)}>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default ExpensesPage;
