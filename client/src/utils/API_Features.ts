import axios from 'axios';

export default {
	get_features_by_category: (category: string) => {
		return axios.get('/api/features/category/' + category);
	}
};
