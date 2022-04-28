import { createStore, combineReducers } from 'redux';
import Reducers from '.';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...Reducers,
    }),
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
