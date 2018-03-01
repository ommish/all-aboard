import axios from 'axios';

export const RECEIVE_COMPENDIUM = 'RECEIVE_COMPENDIUM';
export const receiveCompendium = ({ races }) => {
	return {
		type: RECEIVE_COMPENDIUM,
		races,
	};
};

export const fetchCompendium = () => {
	return async (dispatch) => {
		const { data } = await axios.get(`/api/compendium`);
		dispatch(receiveCompendium(data));
	};
};
