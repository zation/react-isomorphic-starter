import { createStore, applyMiddleware, compose } from 'redux';

import fetch from 'shared/middlewares/fetch';
import reducers from './reducers';

const { __REDUX_DEVTOOLS_EXTENSION__ } = global;

export default ({ initialState, apiBaseUrl }) => {
  const middlewares = [
    fetch({ apiBaseUrl }),
  ];

  if (__DEV__) {
    const createLogger = process.env.BROWSER
      // eslint-disable-next-line global-require
      ? require('./middlewares/log-client').default : require('./middlewares/log-server').default;

    middlewares.push(createLogger());
  }

  return compose(
    applyMiddleware(...middlewares),
  )(createStore)(
    reducers,
    initialState,
    __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
  );
};
