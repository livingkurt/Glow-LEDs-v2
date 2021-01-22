import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listLogs, deleteLog } from '../../actions/logActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { format_date, format_time } from '../../utils/helper_functions';
import { Search, Sort } from '../../components/SpecialtyComponents';

const LogsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const logList = useSelector((state) => state.logList);
	const { loading, logs, error } = logList;

	const logSave = useSelector((state) => state.logSave);
	const { success: successSave } = logSave;

	const logDelete = useSelector((state) => state.logDelete);
	const { success: successDelete } = logDelete;
	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listLogs(''));
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listLogs(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listLogs(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listLogs(category, searchKeyword, sortOrder));
		},
		[ category, searchKeyword, sortOrder, stableDispatch ]
	);
	const deleteHandler = (log) => {
		dispatch(deleteLog(log._id));
	};

	const colors = [
		{ name: '200-299', color: '#3e4c6d' },
		{ name: '300-399', color: '#6d3e5c' },
		{ name: '400-499', color: '#6d3e3e' },
		{ name: '500-599', color: '#3f6561' }
	];

	const determine_color = (log) => {
		let result = '';
		if (log.status <= 299 && log.status >= 200) {
			result = colors[0].color;
		}
		if (log.status <= 399 && log.status >= 300) {
			result = colors[1].color;
		}
		if (log.status <= 499 && log.status >= 400) {
			result = colors[2].color;
		}
		if (log.status <= 599 && log.status >= 500) {
			result = colors[3].color;
		}
		console.log(result);
		return result;
	};
	const sort_options = [ 'Newest', 'File', 'Method', 'Status', 'Success', 'Error', 'Newest' ];

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Logs | Glow LEDs</title>
			</Helmet>

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
				<Link to="/secure/glow/editlog">
					<button className="btn primary" style={{ width: '160px' }}>
						Create Log
					</button>
				</Link>
			</div>

			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Logs</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{logs && (
					<div className="log-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Time</th>
									<th>Method</th>
									<th>Status</th>
									<th>Path</th>
									<th>File</th>
									<th>Success</th>
									<th>Error</th>
									<th>IP</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{logs.map((log) => (
									<tr
										key={log._id}
										style={{
											backgroundColor: determine_color(log),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px">{format_date(log.createdAt)} </td>
										<td className="p-10px">{format_time(log.createdAt)} </td>
										<td className="p-10px">{log.method}</td>
										<td className="p-10px">{log.status}</td>
										<td className="min-w-200px p-10px">{log.path}%</td>
										<td className="p-10px">{log.file}</td>
										<td className="p-10px">
											{log.success ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">{log.error && log.error.code}</td>
										<td className="p-10px">{log.ip}</td>

										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editlog/' + log._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(log)}>
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
export default LogsPage;
