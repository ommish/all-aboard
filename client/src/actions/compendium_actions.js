import axios from 'axios';

export const RECEIVE_COMPENDIUM = 'RECEIVE_COMPENDIUM';
export const receiveCompendium = ({ Race, CharClass }) => {
	return {
		type: RECEIVE_COMPENDIUM,
		races: Race,
		charClasses: CharClass,
	};
};

export const fetchCompendium = () => {
	return async (dispatch) => {
		const { data } = await axios.get(`/api/compendium`);
		dispatch(receiveCompendium(data));
	};
};
