import * as Actions from '../pages/actions/page.actions';

const initialState = {
  loading: false,
  deleteRepository: {
    successDelete: false,
    nameRepository: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case Actions.SUCCESS_DELETE: {
      return {
        ...state,
        deleteRepository: {
          successDelete: action.payload.successDelete,
          nameRepository: action.payload.nameRepository,
        },
      };
    }
    case Actions.RESET_INFO_DELETE: {
      return {
        ...state,
        deleteRepository: {
          successDelete: false,
          nameRepository: '',
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
