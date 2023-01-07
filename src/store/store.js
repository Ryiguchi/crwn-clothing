import { compose, createStore, applyMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';

import { rootSaga } from './root-saga/root-saga';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  // array of strings for the reducers that you don't want to store, whitelist/blacklist
  whitelist: ['cart'],
};

// create a sage middleware to put in the middelwares array
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//whenever you dispath an action it goes throught the middleware before the reducers
// process.env.. only returns true if in development
// filter(BOolean) removes boolean values - if process.env... returns false, returns nothing
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter(Boolean);

// to use redux tools in chrome/firefox
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// need to compose middlewares to use it
// if not using a compose enhancer, replace with 'compose'
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// 2nd argument is to add any additional default states (makes it easier to test)
// If useing persistedReducer then replace rootReducer with persistedReducer
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// IMport persistGate from index.js and pass in the persistor
