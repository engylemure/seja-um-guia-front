import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../../../style/CategoryGridItem.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from './../../../components/Button';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import {
  reducer as localReducer,
  initialState as localInitialState,
  types as localReducerTypes
} from './reducer';

const _selector = ({ state, category }) => {
  const {
    jokes: { byId, byCategory }
  } = state;
  return {
    jokesFromCategory: (byCategory[category] || []).map(
      categoryId => byId[categoryId]
    )
  };
};

const Joke = ({
  joke: { value = 'Error no Joke could be Find' } = {},
  loading
}) => {
  if (loading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  } else {
    return <Typography component="p">{value}</Typography>;
  }
};

const CategoryGridItem = props => {
  const { category } = props;
  const { jokesFromCategory } = useSelector(state =>
    _selector({ state, category })
  );

  const [jokeIndex, changeJokeIndex] = useState(0);

  const { getRandomJokeFromApi } = bindActionCreators(
    ActionCreators,
    useDispatch()
  );

  const [{ loading, error }, localDispatch] = useReducer(
    localReducer,
    localInitialState
  );

  const _getNewJoke = () =>
    getRandomJokeFromApi({
      category,
      onStart: () =>
        localDispatch({ type: localReducerTypes.SET_LOADING, loading: true }),
      onFinish: ({ error }) =>
        localDispatch({ type: localReducerTypes.SET_LOADING, loading: false })
    });

  const _onChangeIndex = () => {
    if (jokesFromCategory) {
      let newIndex = jokeIndex + 1;
      if (newIndex >= jokesFromCategory.length) {
        newIndex = 0;
      }
      changeJokeIndex(newIndex);
    }
  };

  useEffect(() => {
    _getNewJoke();
  }, []);

  return (
    <Card className={'Card'}>
      <CardMedia
        className={'Image'}
        image={`https://source.unsplash.com/400x240/?${category}`}
        title={category}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {category.replace(/\b\w/g, l => l.toUpperCase())}
        </Typography>
        <Joke joke={jokesFromCategory[jokeIndex]} loading={loading} />
      </CardContent>
      <CardActions>
        <Button disabled={loading} onClick={_getNewJoke}>
          Update Joke
        </Button>
        <Button
          disabled={loading || jokesFromCategory.length === 1}
          onClick={_onChangeIndex}
        >
          Change From History
        </Button>
      </CardActions>
    </Card>
  );
};

CategoryGridItem.propTypes = {
  category: PropTypes.string.isRequired
};

export default CategoryGridItem;
