import axios from 'axios';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = (user) => {
	return {
		type: RECEIVE_CURRENT_USER,
		user
	};
};

export const fetchCurrentUser = () => {
	return async (dispatch) => {
		const { data } = await axios.get('/api/current_user');
		dispatch(receiveCurrentUser(data));
	};
}
