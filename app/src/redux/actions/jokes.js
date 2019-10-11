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
  onFinish = () => {},
  numberOfTriesToGetANewJoke = 10
}) => {
  async function thunk(dispatch, getState) {
    await onStart();
    let tries = 0;
    while(tries < numberOfTriesToGetANewJoke) {
      const {
        data,
        ok,
        error,
        response
      } = await ChuckNorrisAPI.randomJokeFromCategory(category);
      const { jokes } = getState()
      const hasData = !!(jokes.byId[data.id])
      if (!hasData && ok && data) {
        dispatch(setJoke({ joke: data }));
        await onFinish({ ok, error, response, data });
        break;
      }
      tries++;
    }
    await onFinish({
      ok: false,
      error: Error('Number of tries to get a random and new joke exceeded the numberOfTriesToGetANewJoke'),
      response: undefined,
      data: null
    });
  }
  return thunk;
};

export const setJoke = ({ joke }) => ({
  type: types.SET_JOKE,
  joke
});
