export const charactersByUser = (state, userId) => {
  return Object.values(state.characters).filter((character) => character._user === userId);
};
