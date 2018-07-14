export const TOGGLE_CHARACTER_SHEET_SECTION = 'TOGGLE_CHARACTER_SHEET_SECTION';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const toggleCharacterSheetSection = (section) => {
	return {
		type: TOGGLE_CHARACTER_SHEET_SECTION,
		section
	};
};
export const addNotification = (notification) => {
	const code = notification.type ? Math.random() : null;
	notification.code = code;
	return {
		type: ADD_NOTIFICATION,
		notification,
	};
};
