import * as types from './types';
import ChuckNorrisAPI from '../../services/chuckNorris';

export function getCategoriesFromApi({
  onStart = () => {},
  onFinish = () => {}
}) {
  async function thunk(dispatch, getState) {
    await onStart();
    const { data, ok, error, response } = await ChuckNorrisAPI.categories();
    if (ok) {
      dispatch(setCategories({ categories: data }));
    }
    await onFinish({ ok, error, response, data });
  }
  return thunk;
}

export function setCategories({ categories }) {
  return {
    type: types.SET_CATEGORIES,
    categories
  };
}
