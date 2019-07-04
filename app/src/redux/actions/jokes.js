import * as types from './types';
import ChuckNorrisAPI from '../../services/chuckNorris';

export const getJokeFromAPI = ({
  category,
  onStart = () => {},
  onFinish = () => {}
}) => {};

export const getRandomJokeFromApi = ({
  category,
  onStart = () => {},
  onFinish = () => {}
}) => {
  async function thunk(dispatch, getState) {
    await onStart();
    const {
      data,
      ok,
      error,
      response
    } = await ChuckNorrisAPI.randomJokeFromCategory(category);
    if (ok && data) {
      dispatch(setJoke({ joke: data }));
    }
    await onFinish({ ok, error, response, data });
  }
  return thunk;
};

export const setJoke = ({ joke }) => ({
  type: types.SET_JOKE,
  joke
});
