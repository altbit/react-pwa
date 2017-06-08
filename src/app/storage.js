import AppConfig from 'AppConfig';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import registration from './../user/reducers/registration';

const storage = () => {
  const middlewares = [thunkMiddleware];

  if (AppConfig.env !== 'production') {
    middlewares.push(createLogger());
  }

  const reducers = {
    registration,
  };

  return createStore(
    combineReducers(reducers),
    applyMiddleware(...middlewares)
  );
};

export default storage;
