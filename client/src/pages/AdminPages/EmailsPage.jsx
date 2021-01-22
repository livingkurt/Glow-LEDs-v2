import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listEmails, deleteEmail } from '../../actions/emailActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';

const EmailsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const emailList = useSelector((state) => state.emailList);
	const { loading, emails, error } = emailList;

	const emailSave = useSelector((state) => state.emailSave);
	const { success: successSave } = emailSave;

	const emailDelete = useSelector((state) => state.emailDelete);
	const { success: successDelete } = emailDelete;
	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listEmails());
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listEmails(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listEmails(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listEmails(category, searchKeyword, sortOrder));
		},
		[ stableDispatch, category, searchKeyword, sortOrder ]
	);
	const deleteHandler = (email) => {
		dispatch(deleteEmail(email._id));
	};

	const colors = [ { name: 'Announcements', color: '#7d5555' }, { name: 'General', color: '#3e4c6d' } ];

	const determine_color = (email) => {
		let result = '';
		if (email.email_type === 'Announcements') {
			result = colors[0].color;
		} else {
			result = colors[1].color;
		}
		console.log(result);
		return result;
	};

	const sort_options = [ 'Email Type' ];

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Emails | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<Link to="/secure/glow/emails/announcement">
					<button className="btn primary">Announcement</button>
				</Link>
				<Link to="/secure/glow/emails/review">
					<button className="btn primary">Review</button>
				</Link>
				<Link to="/secure/glow/emails/account_created">
					<button className="btn primary">Account Created</button>
				</Link>
				<Link to="/secure/glow/emails/reset_password">
					<button className="btn primary">Reset Password</button>
				</Link>
				<Link to="/secure/glow/emails/password_changed">
					<button className="btn primary">Password Changed</button>
				</Link>
				<Link to="/secure/glow/emails/order/5fa43d5f248dcacd5d8e2d3f/order/false">
					<button className="btn primary">Order</button>
				</Link>
				<Link to="/secure/glow/emails/order_status/5fa43d5f248dcacd5d8e2d3f/reassurance">
					<button className="btn primary">Reassurance</button>
				</Link>
				<Link to="/secure/glow/emails/order_status/5fa43d5f248dcacd5d8e2d3f/manufactured">
					<button className="btn primary">Manufactured</button>
				</Link>
				<Link to="/secure/glow/emails/order_status/5fa43d5f248dcacd5d8e2d3f/packaged">
					<button className="btn primary">Packaged</button>
				</Link>
				<Link to="/secure/glow/emails/order_status/5fa43d5f248dcacd5d8e2d3f/shipped">
					<button className="btn primary">Shipped</button>
				</Link>
				<Link to="/secure/glow/emails/order_status/5fa43d5f248dcacd5d8e2d3f/delivered">
					<button className="btn primary">Delivered</button>
				</Link>
				<Link to="/secure/glow/emails/order/5fb354daca1b495d41e1375b/refunded/false">
					<button className="btn primary">Refunded</button>
				</Link>
				<Link to="/secure/glow/emails/invoice">
					<button className="btn primary">Invoice</button>
				</Link>
				<Link to="/secure/glow/editemail">
					<button className="btn primary">Create Email</button>
				</Link>
			</div>
			<div className="wrap jc-b">
				{colors.map((color) => {
					return (
						<div className="wrap jc-b m-1rem">
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
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Emails</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{emails && (
					<div className="email-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>

									<th>Email Type</th>
									<th>H1</th>
									<th>Show Image</th>
									<th>H2</th>
									<th>Button</th>
									<th>Active</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{emails.map((email) => (
									<tr
										key={email._id}
										style={{
											backgroundColor: determine_color(email),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px">{email._id}</td>
										<td className="min-w-16rem p-10px">{email.email_type}</td>
										<td className="p-10px">{email.h1}</td>
										<td className="min-w-14rem p-10px">
											{email.show_image ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">{email.h2}</td>
										<td className="p-10px">{email.button}</td>
										<td className="p-10px">
											{email.active ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editemail/' + email._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(email)}>
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
export default EmailsPage;
