import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import { rootReducer } from './root.reducer';

const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
