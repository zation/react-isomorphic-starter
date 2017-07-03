import { createStore, applyMiddleware, compose } from 'redux';

import handleAPI from 'shared/redux/middlewares/handle-api';
import handleAPIError from 'shared/redux/middlewares/handle-client-api-error';
import handleHistory from 'shared/redux/middlewares/handle-client-history';
import reducers from 'shared/reducers';

const { __REDUX_DEVTOOLS_EXTENSION__ } = global;

export default ({ initialState, apiBaseUrl, history }) => {
  const middlewares = [
    handleAPI({ apiBaseUrl }),
    handleAPIError(),
    handleHistory({ history }),
  ];

  if (__DEV__) {
    // eslint-disable-next-line global-require
    middlewares.push(require('shared/redux/middlewares/log-client').default);
  }

  return compose(
    applyMiddleware(...middlewares),
  )(createStore)(
    reducers,
    initialState,
    __DEV__ && __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
  );
};
