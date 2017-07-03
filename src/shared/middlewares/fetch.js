import { prop, omit } from 'lodash/fp';

import fetch from 'isomorphic-fetch';
import { start, fail } from '../redux/utils/redux-actions';
import getEntity from '../redux/get-entity';
import { throwAPIError } from '../redux/api-error/actions';

class FetchException {
  constructor({ errors, status }) {
    this.errors = errors;
    this.status = status;
  }
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw response;
};

const deserialize = (response) => {
  const header = response.headers.get('Content-Type') || '';
  if (header.indexOf('application/json') > -1) {
    return response.json();
  }
  if (header.indexOf('application/octet-stream') > -1) {
    return response.arrayBuffer();
  }
  return response.text();
};

const handleSuccess = (dispatch, action) => response =>
  deserialize(response)
    .then(data => dispatch({ ...action, payload: data }));

const handleFailed = (dispatch, action) => (response) => {
  if (response instanceof Error) {
    throw response;
  }
  return deserialize(response)
    .then((data) => {
      const { meta, type } = action;
      dispatch({ ...action, type: fail(type), payload: data });
      dispatch(throwAPIError({
        errors: data,
      }, {
        status: response.status,
        statusText: response.statusText,
        ignoreGlobalWarning: prop('ignoreGlobalWarning', meta),
        ignoreAuthRedirection: prop('ignoreAuthRedirection', meta),
      }));
      throw new FetchException({
        errors: data,
        status: response.status,
      });
    });
};

export default ({ apiBaseUrl }) => ({ getState, dispatch }) => next => (action) => {
  const { payload, type } = action;
  if (payload) {
    const { url, isApi, withoutAuth, ...options } = payload;
    if (isApi) {
      const authorization = getEntity('auth.authorization')(getState());
      dispatch({ ...action, type: start(type), payload: omit('isApi')(payload) });
      return fetch(`${apiBaseUrl}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          authorization: !withoutAuth && authorization ? authorization : undefined,
        },
      }).then(checkStatus)
        .then(handleSuccess(dispatch, action))
        .catch(handleFailed(dispatch, action));
    }
  }
  return next(action);
};
