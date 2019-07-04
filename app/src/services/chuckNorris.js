async function processFetch(fetchFunction = () => {}) {
  try {
    const response = await fetchFunction();
    if (response.ok) {
      return { data: await response.json(), error: null, ok: true, response };
    } else {
      return {
        data: null,
        error: new Error(response.statusText),
        ok: false,
        response
      };
    }
  } catch (e) {
    return { data: null, error: e, ok: false, response: undefined };
  }
}

class ChuckNorrisAPI {
  _address = 'https://api.chucknorris.io';
  categories = async () => {
    return processFetch(async () => fetch(`${this._address}/jokes/categories`));
  };
  randomJokeFromCategory = async category => {
    return processFetch(async () =>
      fetch(`${this._address}/jokes/random?category=${category}`)
    );
  };
}

export default new ChuckNorrisAPI();
