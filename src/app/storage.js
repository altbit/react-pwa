import AppConfig from 'AppConfig';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import registration from './../user/reducers/registration';
import auth from './../user/reducers/auth';

const storage = () => {
  const middlewares = [thunkMiddleware];

  if (AppConfig.env !== 'production') {
    const { createLogger } = require('redux-logger');
    middlewares.push(createLogger());
  }

  const reducers = {
    form: formReducer,
    registration,
    auth,
  };

  return createStore(
    combineReducers(reducers),
    applyMiddleware(...middlewares)
  );
};

export default storage;
