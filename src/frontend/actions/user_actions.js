export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};
