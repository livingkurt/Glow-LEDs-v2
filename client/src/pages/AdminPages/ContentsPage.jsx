import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listContents, deleteContent } from '../../actions/contentActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search } from '../../components/SpecialtyComponents';

const ContentsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const contentList = useSelector((state) => state.contentList);
	const { loading, contents, error } = contentList;

	const contentSave = useSelector((state) => state.contentSave);
	const { success: successSave } = contentSave;

	const contentDelete = useSelector((state) => state.contentDelete);
	const { success: successDelete } = contentDelete;
	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listContents());
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listContents(category, searchKeyword));
	};

	const deleteHandler = (content) => {
		dispatch(deleteContent(content._id));
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Contents | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-fe">
				<Link to="/secure/glow/editcontent">
					<button className="btn primary" style={{ width: '160px' }}>
						Create Content
					</button>
				</Link>
			</div>

			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Contents</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
			</div>
			<Loading loading={loading} error={error}>
				{contents && (
					<div className="content-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Home Page</th>
									<th>Banner</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{contents.map((content) => (
									<tr
										key={content._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px" style={{ minWidth: '5rem' }}>
											{content._id}
										</td>
										<td className="p-10px" style={{ minWidth: '5rem' }}>
											{content.home_page && content.home_page.h1}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{content.banner && content.banner.label}
										</td>
										{/* <td className="p-10px" style={{ minWidth: '10rem' }}>{content.about_page}</td> */}
										<td className="p-10px">
											<div className="jc-c">
												<Link to={'/secure/glow/editcontent/' + content._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(content)}>
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
export default ContentsPage;
