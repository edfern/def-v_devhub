export const SETAUTHINFO = 'SET_AUTH_INFO';
export const SETREGISTERED = 'SET_REGISTERED';
export const SET_AVATAR = 'SET_AVATAR';
export const SIGNOUT = 'SIGNOUT';
export const SET_ID = 'SET_ID';
export const RELOAD_ID = 'RELOAD_ID';

export const setAuthInfo = (authInfo) => {
  return {
    type: SETAUTHINFO,
    payload: authInfo,
  };
};

export const setRegistered = (registered) => {
  return {
    type: SETREGISTERED,
    payload: registered,
  };
};

export const setAvatar = (avatar) => {
  return {
    type: SET_AVATAR,
    payload: avatar,
  };
};

export const signOut = () => {
  localStorage.clear();
  return {
    type: SIGNOUT,
  };
};

export const setId = (id) => {
  return {
    type: SET_ID,
    payload: id,
  };
};

export const reloadId = () => {
  const userInfo = localStorage.getItem('userInfo');
  const info = JSON.parse(userInfo);
  return {
    type: RELOAD_ID,
    payload: info,
  };
};
