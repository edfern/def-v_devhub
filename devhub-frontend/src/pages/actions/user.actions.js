export const CREATE_USER = 'CREATE_USER';
export const SET_USERNAME = 'SET_USERNAME';

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
};
export const setNewUser = (userInfo) => {
  return {
    type: CREATE_USER,
    payload: userInfo,
  };
};
