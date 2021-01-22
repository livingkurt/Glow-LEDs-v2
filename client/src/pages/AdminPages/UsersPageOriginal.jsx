import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format_date } from '../../utils/helper_functions';
import { Loading } from '../../components/UtilityComponents';
import { listUsers, deleteUser } from '../../actions/userActions';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';

const UsersPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const userList = useSelector((state) => state.userList);
	const { loading, users, error } = userList;

	const userDelete = useSelector((state) => state.userDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listUsers());
		},
		[ successDelete ]
	);

	const deleteHandler = (user) => {
		dispatch(deleteUser(user._id));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listUsers(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listUsers(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			dispatch(listUsers(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);

	const colors = [
		{ name: 'Not Verified', color: '#333333' },
		{ name: 'Verified', color: '#626262' },
		{ name: 'Admin', color: '#8e8e8e' }
	];

	const determine_color = (order) => {
		let result = '';
		if (!order.isVerified) {
			result = colors[0].color;
		}
		if (order.isVerified) {
			result = colors[1].color;
		}
		if (order.isAdmin) {
			result = colors[2].color;
		}
		console.log(result);
		return result;
	};

	const sort_options = [ 'Date', 'First Name', 'Last Name' ];

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Users | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				{colors.map((color) => {
					return (
						<div className="wrap jc-b w-20rem m-1rem">
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
				<Link to="/secure/glow/edituser">
					<button className="btn primary" style={{ width: '160px' }}>
						Create User
					</button>
				</Link>
			</div>
			<div className="order-header">
				<h1
					style={{
						textAlign: 'center',
						width: '100%',
						margin: '20px auto',
						justifyContent: 'center'
					}}
				>
					Users
				</h1>
			</div>

			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{users && (
					<div className="order-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>FIRST</th>
									<th>LAST</th>
									<th>EMAIL</th>
									<th>Affiliate</th>
									<th>Affiliated</th>
									<th>VERIFIED</th>
									<th>ADMIN</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr
										key={user._id}
										style={{
											backgroundColor: determine_color(user)
										}}
									>
										<td>{user._id}</td>
										<td>{format_date(user.createdAt)}</td>
										<td>{user.first_name}</td>
										<td>{user.last_name}</td>
										<td>{user.email}</td>
										<td>{user.affiliate}</td>
										<td>
											{user.is_affiliated ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>
											{user.isVerified ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>
											{user.isAdmin ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>
											<div className="jc-b">
												<Link to={'/secure/glow/edituser/' + user._id}>
													<button className="btn icon">
														<i className="fas fa-info-circle" />
													</button>
												</Link>
												{/* <Link to={'/secure/glow/userprofile/' + user._id}>
													<button className="btn icon">
														<i class="fas fa-mountain" />
													</button>
												</Link> */}
												<button className="btn icon" onClick={() => deleteHandler(user)}>
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
export default UsersPage;
