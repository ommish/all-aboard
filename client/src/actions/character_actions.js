import axios from 'axios';

export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const RECEIVE_CHARACTER = 'RECEIVE_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const receiveCharacters = (characters) => {
	return {
		type: RECEIVE_CHARACTERS,
		characters
	};
};
const receiveCharacter = (character) => {
	return {
		type: RECEIVE_CHARACTER,
		character
	};
};
const removeCharacter = (characterId) => {
	return {
		type: REMOVE_CHARACTER,
		characterId
	};
};

export const fetchCharacters = (userId) => {
	return async (dispatch) => {
		const { data } = await axios.get(`/api/users/${userId}/characters`);
		dispatch(receiveCharacters(data));
	};
};

export const createCharacter = (character) => {
	return async (dispatch) => {
		const { data } = await axios.post(`/api/characters`, character);
		return dispatch(receiveCharacter(data));
	};
};

export const deleteCharacter = (characterId) => {
	return async (dispatch) => {
		try {
			await axios.delete(`/api/characters/${characterId}`);
			return dispatch(removeCharacter(characterId));
		} catch (err) {
      // TODO: set up errors reducer to handle errors on front end
		}
	};
};

export const updateCharacter = (character) => {
	return async (dispatch) => {
		const { data } = await axios.put(`/api/characters/${character._id}`, character);
		return dispatch(receiveCharacter(data));
	};
};
