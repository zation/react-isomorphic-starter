import { createStore, applyMiddleware, compose } from 'redux';

import fetch from 'shared/middlewares/fetch';
import handleAPIError from 'shared/middlewares/handle-client-api-error';
import handleHistory from 'shared/middlewares/handle-client-history';
import reducers from 'shared/reducers';

const { __REDUX_DEVTOOLS_EXTENSION__ } = global;

export default ({ initialState, apiBaseUrl, history }) => {
  const middlewares = [
    fetch({ apiBaseUrl }),
    handleAPIError(),
    handleHistory({ history }),
  ];

  if (__DEV__) {
    // eslint-disable-next-line global-require
    middlewares.push(require('shared/middlewares/log-client').default);
  }

  return compose(
    applyMiddleware(...middlewares),
  )(createStore)(
    reducers,
    initialState,
    __DEV__ && __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
  );
};
