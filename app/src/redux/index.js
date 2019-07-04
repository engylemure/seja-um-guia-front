import { createStore, applyMiddleware } from 'redux';
import { Reducers } from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => true
});

export const Store = createStore(
  Reducers,
  {},
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
