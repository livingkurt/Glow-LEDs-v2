import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsContent, listContents } from '../../actions/contentActions';
import { FlexContainer } from './index';

const Prompt = () => {
	useEffect(() => {}, []);

	return (
		<dialog className="prompt">
			<button>Confirm</button>
		</dialog>
	);
};

export default Prompt;
