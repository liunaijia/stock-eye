import { createStore, combineReducers } from 'redux';
import * as reducers from './modules';

export default createStore(
  combineReducers(reducers),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
