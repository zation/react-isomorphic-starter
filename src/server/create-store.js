import { createStore, applyMiddleware, compose } from 'redux';

import fetch from 'shared/middlewares/fetch';
import reducers from 'shared/reducers';

const { __REDUX_DEVTOOLS_EXTENSION__ } = global;

export default ({ initialState, apiBaseUrl }) => {
  const middlewares = [
    fetch({ apiBaseUrl }),
  ];

  if (__DEV__) {
    // eslint-disable-next-line global-require
    middlewares.push(require('shared/middlewares/log-server').default);
  }

  return compose(
    applyMiddleware(...middlewares),
  )(createStore)(
    reducers,
    initialState,
    __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
  );
};
