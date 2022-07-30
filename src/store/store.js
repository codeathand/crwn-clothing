import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const test = (num) => (num2, num3) => (num4) => {
   return num-num2+num3-num4;
}

const test1 = test(10);
const test2 = test1(10, 5)
console.log('test', test2(1));

// const middleWares = [loggerMiddleware];
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger, 
    sagaMiddleware // thunk
].filter(Boolean);

// const thunkMiddleware = (store) => (next) => (action) => {
//     if (typeof action === 'function') {
//         action(dispatch)
//     }
// }

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);