import { createAction, actionTypeCreator } from '../../redux-actions';

import { post } from '../request';

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
