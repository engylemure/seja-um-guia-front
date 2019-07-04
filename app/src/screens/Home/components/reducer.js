export const types = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

export const initialState = {
  loading: false,
  error: undefined
};

export const reducer = (state, { type, ...params }) => {
  switch (type) {
    case types.SET_ERROR:
      return { ...state, error: params.error };
    case types.SET_LOADING:
      return { ...state, loading: params.loading };
    default:
      throw new Error();
  }
};
