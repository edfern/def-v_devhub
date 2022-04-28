import * as Actions from '../Auth/actions/auth.actions';

const isAuth = () => {
  try {
    const state = localStorage.getItem('userInfo');
    const info = JSON.parse(state);
    return info;
  } catch (err) {
    return null;
  }
};

const getAvatar = () => {
  try {
    const avatar = localStorage.getItem('avatar');
    if (avatar === null) {
      return null;
    }
    return avatar;
  } catch (err) {
    return null;
  }
};

const initialState = {
  userInfo: {
    isAuthenticated: isAuth() ? isAuth().isAuthenticated : false,
    id: isAuth() ? isAuth().id : null,
    name: isAuth() ? isAuth().name : null,
    username: isAuth() ? isAuth().username : null,
    email: isAuth() ? isAuth().email : null,
    registrationDate: isAuth() ? isAuth().registrationDate : null,
    avatar: getAvatar() ? getAvatar() : null,
  },
  registered: null,
  invited: false,
  infoInvited: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SETAUTHINFO:
      return {
        ...state,
        userInfo: {
          isAuthenticated: action.payload.isAuthenticated,
          id: action.payload.id,
          name: action.payload.name,
          username: action.payload.username,
          email: action.payload.email,
          registrationDate: action.payload.registrationDate,
          avatar: action.payload.avatar,
        },
      };
    case Actions.SETREGISTERED:
      return {
        ...state,
        registered: action.payload,
      };

    case Actions.SET_AVATAR: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          avatar: action.payload,
        },
      };
    }
    case Actions.SIGNOUT: {
      return {
        ...state,
        userInfo: {
          isAuthenticated: false,
          name: null,
          username: null,
          email: null,
          registrationDate: null,
          avatar: null,
        },
      };
    }
    case Actions.SET_ID: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          id: action.payload.id,
        },
        invited: action.payload.invited,
        infoInvited: {
          ...state.infoInvited,
          name: action.payload.name,
          username: action.payload.username,
          avatar: 'https://avatars.githubusercontent.com/u/47313528?v=4',
        },
      };
    }
    case Actions.RELOAD_ID: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          id: action.payload.id,
        },
        invited: false,
        infoInvited: {},
      };
    }
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
