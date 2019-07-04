import React, { useEffect, useReducer } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './../../../style/CategoryGrid.css';
import Grid from '../../../components/Grid';
import CategoryGridItem from './CategoryGridItem';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import {
  reducer as localReducer,
  initialState as localInitialState,
  types as localReducerTypes
} from './reducer';

const CategoryGrid = props => {
  const { categories } = useSelector(({ categories }) => ({ categories }));
  const { getCategoriesFromApi } = bindActionCreators(
    ActionCreators,
    useDispatch()
  );
  const [{ loading, error }, localDispatch] = useReducer(
    localReducer,
    localInitialState
  );
  useEffect(() => {
    getCategoriesFromApi({
      onStart: () =>
        localDispatch({ type: localReducerTypes.SET_LOADING, loading: true }),
      onFinish: ({ error }) =>
        localDispatch({ type: localReducerTypes.SET_LOADING, loading: false })
    });
  }, []);
  const _renderItem = ({ item }) => <CategoryGridItem category={item} />;
  if (loading) {
    return (
      <div className={'Loading-container'}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={'Grid-div-root'}>
        <Grid
          data={categories}
          renderItem={_renderItem}
          getItemKey={item => item}
        />
      </div>
    );
  }
};

export default CategoryGrid;
