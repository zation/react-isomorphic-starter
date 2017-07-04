import { createStore, applyMiddleware, compose } from 'redux';

import handleAPI from 'shared/redux/middlewares/handle-api';
import reducers from 'shared/reducers';
import logger from './logger';

const { __REDUX_DEVTOOLS_EXTENSION__ } = global;

export default ({ initialState, apiBaseUrl }) => {
  const middlewares = [
    handleAPI({ apiBaseUrl }),
  ];

  if (__DEV__) {
    // eslint-disable-next-line global-require
    middlewares.push(require('shared/redux/middlewares/log-server').default({ logger }));
  }

  return compose(
    applyMiddleware(...middlewares),
  )(createStore)(
    reducers,
    initialState,
    __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
  );
};
