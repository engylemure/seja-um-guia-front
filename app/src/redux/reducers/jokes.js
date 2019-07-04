import * as types from './../actions/types';
import { uniqueValueOnMergedArray } from '../../util/helpers';

const initialState = {
  // Array of Ids
  allIds: [],
  // Category Name to Id of Arrays
  byCategory: {},
  // Id To Object
  byId: {}
};

const _setJokeReducer = (state, { joke }) => {
  const allIds = uniqueValueOnMergedArray(state.allIds, [joke.id]);
  const byCategory = {
    ...state.byCategory
  };
  const byId = {
    ...state.byId
  };
  if (joke.categories.length === 0) {
    byCategory['undefined'] = byCategory['undefined'] || [];
    byCategory['undefined'] = uniqueValueOnMergedArray(
      byCategory['undefined'],
      [joke.id]
    );
  } else {
    joke.categories.forEach(category => {
      byCategory[category] = byCategory[category] || [];
      byCategory[category] = uniqueValueOnMergedArray(byCategory[category], [
        joke.id
      ]);
    });
  }
  byId[joke.id] = joke;
  return { allIds, byCategory, byId };
};

const _setJokesReducer = (state, { jokes }) => {
  let allIds = [...state.allIds];
  let byCategory = {
    ...state.byCategory
  };
  let byId = {
    ...state.byId
  };
  jokes.forEach(joke => {
    const newState = _setJokeReducer({ allIds, byCategory, byId }, joke);
    allIds = newState.allIds;
    byCategory = newState.byCategory;
    byId = newState.byId;
  });
  return { allIds, byCategory, byId };
};

export const jokes = (state = initialState, { type, ...params }) => {
  switch (type) {
    case types.SET_JOKE:
      return _setJokeReducer(state, params);
    case types.SET_JOKES:
      return _setJokesReducer(state, params);
    default:
      return state;
  }
};
