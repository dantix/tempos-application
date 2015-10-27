import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import { default as promiseMiddleware } from '../middlewares/promises.js';
import { default as loggerMiddleware } from '../middlewares/logger.js';
import rootReducer from '../reducers';

import { persistState } from 'redux-devtools';
import DevTools from '../containers/dev-tools/dev-tools.jsx';

let createStoreWithMiddleware;
const middlewares = applyMiddleware(
      thunk,
      promiseMiddleware,
      loggerMiddleware
    );

if (__DEVELOPMENT__ && __DEVTOOLS__) {
  createStoreWithMiddleware = compose(
      middlewares,
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(
      thunk,
      promiseMiddleware,
      loggerMiddleware
    )(createStore);
}

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (__DEVELOPMENT__ && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
