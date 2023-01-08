import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';
import { rootReducer } from './root.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(
  Boolean
);

const composeEnhancer =
  process.env.NODE_ENV !== 'production' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
