export const TOGGLE_CHARACTER_SHEET_SECTION = 'TOGGLE_CHARACTER_SHEET_SECTION';

export const toggleCharacterSheetSection = (section) => {
  return {
    type: TOGGLE_CHARACTER_SHEET_SECTION,
    section,
  };
};
