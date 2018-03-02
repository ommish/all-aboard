import axios from 'axios';

export const RECEIVE_COMPENDIUM = 'RECEIVE_COMPENDIUM';
export const receiveCompendium = ({ race, charClass }) => {
	return {
		type: RECEIVE_COMPENDIUM,
		races: race,
		charClasses: charClass,
	};
};

export const fetchCompendium = () => {
	return async (dispatch) => {
		const { data } = await axios.get(`/api/compendium`);
		dispatch(receiveCompendium(data));
	};
};
