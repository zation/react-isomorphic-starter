import { createAction, actionTypeCreator } from '../utils/redux-actions';

import { post } from '../utils/request';

const actionType = actionTypeCreator(__filename);
export const LOGIN = actionType('LOGIN');

export const login = createAction(
  LOGIN,
  ({ username, password }) => post(
    '/auth/local', {
      username,
      password,
    }, {
      withoutAuth: true,
    },
  ),
);
