import * as Actions from '../pages/actions/user.actions';

const initialState = {
  name: null,
  username: null,
  email: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.CREATE_USER: {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };
    }
    case Actions.SET_USERNAME: {
      return {
        ...state,
        username: action.payload,
      };
    }
    default:
      return state;
  }
};

export default UserReducer;
