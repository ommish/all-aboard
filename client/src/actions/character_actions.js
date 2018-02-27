import axios from 'axios';

export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const receiveCharacters = (characters) => {
  return {
    type: RECEIVE_CHARACTERS,
    characters,
  };
};

export const fetchCharacters = (userId) => {
	return async (dispatch) => {
		const { data } = await axios.get(`/api/users/${userId}/characters`);
		dispatch(receiveCharacters(data));
	};
};
