import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../../../style/CategoryGridItem.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Button from './../../../components/Button';
import Typography from '@material-ui/core/Typography';
import { ChevronLeftRounded, ChevronRightRounded } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import Badge from '@material-ui/core/Badge';

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
}) => (<Typography component="p">{value}</Typography>);

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

  const _getNewJoke = async () =>{
    await getRandomJokeFromApi({
      category,
      onStart: () =>
        localDispatch({ type: localReducerTypes.SET_LOADING, loading: true }),
      onFinish: ({ error }) => {
        localDispatch({ type: localReducerTypes.SET_LOADING, loading: false })
        localDispatch({ type: localReducerTypes.SET_ERROR, error })
      }
    })
  }

  const _onForwardIndex = () => {
    if (jokesFromCategory) {
      let newIndex = jokeIndex + 1;
      if (newIndex >= jokesFromCategory.length) {
        newIndex = 0;
      }
      changeJokeIndex(newIndex);
    }
  }

  const _onBackIndex = () => {
    if (jokesFromCategory) {
      let newIndex = jokeIndex - 1;
      if (newIndex < 0) {
        newIndex = jokesFromCategory.length - 1;
      }
      changeJokeIndex(newIndex);
    }
  }

  useEffect(() => {
    _getNewJoke();
  }, []);

  useEffect(() => {
    if (jokesFromCategory.length > 0) {
      changeJokeIndex(jokesFromCategory.length - 1 )
    }
  }, [jokesFromCategory.length])

  return (
    <Badge color="primary" badgeContent={jokesFromCategory.length} className={'Badge'} >
      <Card className={'Card'}>
        <CardMedia
          className={'Image'}
          image={`https://source.unsplash.com/400x240/?${category}`}
          title={category}
        />
        <CardContent className={"CardContent"}>
          <div className={"LoadingContainer"}>
            { loading && <LinearProgress />}
          </div>
          <Typography gutterBottom variant="h5" component="h2">
            {category.replace(/\b\w/g, l => l.toUpperCase())}
          </Typography>
          <Joke joke={jokesFromCategory[jokeIndex]} loading={loading} />
        </CardContent>
        <CardActions className={'CardActions'}>
          <IconButton onClick={_onBackIndex}>
            <ChevronLeftRounded />
          </IconButton>
          <Button disabled={loading} onClick={_getNewJoke}>
            Get New Joke
          </Button>
          <IconButton onClick={_onForwardIndex}>
            <ChevronRightRounded/>
          </IconButton>
        </CardActions>
      </Card>
    </Badge>
  );
};

CategoryGridItem.propTypes = {
  category: PropTypes.string.isRequired
};

export default CategoryGridItem;
