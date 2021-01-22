import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDevice, listMyDevices } from '../../actions/deviceActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search } from '../../components/SpecialtyComponents';

const DevicesPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';

	const myDeviceList = useSelector((state) => state.myDeviceList);
	const { loading, devices, error } = myDeviceList;
	console.log({ devices });

	const deviceSave = useSelector((state) => state.deviceSave);
	const { success: successSave } = deviceSave;

	const deviceDelete = useSelector((state) => state.deviceDelete);
	const { success: successDelete } = deviceDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listMyDevices());
			return () => {
				//
			};
		},
		[ successSave, successDelete, dispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listMyDevices(category, searchKeyword));
	};

	const deleteHandler = (device) => {
		dispatch(deleteDevice(device._id));
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Devices | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{/* {colors.map((color) => {
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
					})} */}
				</div>
				<div className=" jc-fe w-500px">
					<label className="p-10px ">Click Here to Get Started!</label>
					<Link to="/secure/account/editdevice">
						<button className="btn primary">Add Device</button>
					</Link>
				</div>
			</div>

			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Devices</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				{/* <Sort sortHandler={sortHandler} sort_options={sort_options} /> */}
			</div>
			<Loading loading={loading} error={error}>
				{devices && (
					<div className="device-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>URL</th>
									<th>Location</th>
									<th>View</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{devices.map((device) => (
									<tr
										key={device._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td>{device.device_name}</td>
										<td>{device.query_url}</td>
										<td>{device.location}</td>
										<td>
											<Link to={'/secure/account/glowcontrol/' + device._id}>
												<button className="btn icon">
													<i class="fas fa-eye" />
												</button>
											</Link>
										</td>
										<td>
											<div className="jc-b">
												<Link to={'/secure/account/editdevice/' + device._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(device)}>
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
export default DevicesPage;
