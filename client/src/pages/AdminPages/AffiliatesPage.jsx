import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listAffiliates, deleteAffiliate } from '../../actions/affiliateActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';

const AffiliatesPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const affiliateList = useSelector((state) => state.affiliateList);
	const { loading, affiliates, error } = affiliateList;

	const affiliateSave = useSelector((state) => state.affiliateSave);
	const { success: successSave } = affiliateSave;

	const affiliateDelete = useSelector((state) => state.affiliateDelete);
	const { success: successDelete } = affiliateDelete;
	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			stableDispatch(listAffiliates());
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listAffiliates(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listAffiliates(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listAffiliates(category, searchKeyword, sortOrder));
		},
		[ stableDispatch, category, searchKeyword, sortOrder ]
	);
	const deleteHandler = (affiliate) => {
		dispatch(deleteAffiliate(affiliate._id));
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [ { name: 'Sponsor', color: '#3e4c6d' }, { name: 'Promoter', color: '#7d5555' } ];

	const determine_color = (affiliate) => {
		let result = '';

		if (affiliate.sponsor) {
			result = colors[0].color;
		}
		if (affiliate.promoter) {
			result = colors[1].color;
		}
		return result;
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Affiliates | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{colors.map((color) => {
						return (
							<div className="wrap jc-b  m-1rem">
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
				<Link to="/secure/glow/editaffiliate">
					<button className="btn primary" style={{ width: '160px' }}>
						Create Affiliate
					</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Affiliates</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{affiliates && (
					<div className="affiliate-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Artist Name</th>
									<th>Instagram Handle</th>
									<th>Facebook Name</th>
									<th>Percentage Off</th>
									<th>Promo Code</th>
									<th>Sponsor</th>
									<th>Promotor</th>
									<th>active</th>
								</tr>
							</thead>
							<tbody>
								{affiliates.map((affiliate) => (
									<tr
										key={affiliate._id}
										style={{
											backgroundColor: determine_color(affiliate),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px">{affiliate._id}</td>
										<td className="p-10px">{affiliate.artist_name}</td>
										<td className="p-10px">{affiliate.instagram_handle}</td>
										<td className="p-10px">{affiliate.facebook_name}</td>
										<td className="p-10px">{affiliate.percentage_off}%</td>
										<td className="p-10px">{affiliate.promo_code}</td>
										<td className="p-10px">
											{affiliate.sponsor ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{affiliate.promoter ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{affiliate.active ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editaffiliate/' + affiliate._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(affiliate)}>
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
export default AffiliatesPage;
