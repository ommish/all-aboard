import axios from 'axios';

export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const RECEIVE_CHARACTER = 'RECEIVE_CHARACTER';
export const receiveCharacters = (characters) => {
	return {
		type: RECEIVE_CHARACTERS,
		characters
	};
};
export const receiveCharacter = (character) => {
	return {
		type: RECEIVE_CHARACTER,
		character
	};
};

export const fetchCharacters = (userId) => {
	return async (dispatch) => {
		const { data } = await axios.get(`/api/users/${userId}/characters`);
		dispatch(receiveCharacters(data));
	};
};

export const createCharacter = (character) => {
	character.name = 'peika';
  character.hitDice = 6;
	return async (dispatch) => {
		const { data } = await axios.post(`/api/characters`, character);
		dispatch(receiveCharacter(data));
	};
};
