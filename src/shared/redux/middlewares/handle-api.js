import { prop, omit } from 'lodash/fp';

import api from 'axios';
import { start, fail } from '../utils/redux-actions';
import getEntity from '../get-entity';
import { throwAPIError } from '../api-error/actions';

class FetchException {
  constructor({ errors, status }) {
    this.errors = errors;
    this.status = status;
  }
}

const handleSuccess = (dispatch, action) => ({ data }) =>
  dispatch({ ...action, payload: data });

const handleFailed = (dispatch, action) => ({ response: { data, status, statusText } }) => {
  const { meta, type } = action;
  dispatch({ ...action, type: fail(type), payload: data });
  dispatch(throwAPIError({
    errors: data,
  }, {
    status,
    statusText,
    ignoreGlobalWarning: prop('ignoreGlobalWarning', meta),
    ignoreAuthRedirection: prop('ignoreAuthRedirection', meta),
  }));
  throw new FetchException({
    errors: data,
    status,
  });
};

export default ({ apiBaseUrl }) => ({ getState, dispatch }) => next => (action) => {
  const { payload, type } = action;
  if (payload) {
    const { isAPI, withoutAuth, ...options } = payload;
    if (isAPI) {
      const authorization = getEntity('auth.authorization')(getState());
      dispatch({ ...action, type: start(type), payload: omit(['isAPI'])(payload) });
      return api({
        ...options,
        headers: {
          ...options.headers,
          ...(!withoutAuth && authorization ? { authorization } : null),
        },
        baseURL: apiBaseUrl,
      }).then(handleSuccess(dispatch, action))
        .catch(handleFailed(dispatch, action));
    }
  }
  return next(action);
};
