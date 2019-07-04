import { combineReducers } from 'redux';
import * as categoriesReducer from './categories';
import * as jokesReducer from './jokes';

export const Reducers = combineReducers({
  ...categoriesReducer,
  ...jokesReducer
});
