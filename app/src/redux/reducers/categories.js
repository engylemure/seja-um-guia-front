import * as types from '../actions/types';
import { uniqueValueOnMergedArray } from '../../util/helpers';

const initialState = [];

export const categories = (state = initialState, { type, ...params }) => {
  switch (type) {
    case types.SET_CATEGORIES:
      return uniqueValueOnMergedArray(state, params.categories);
    default:
      return state;
  }
};
