import { createAction, actionTypeCreator } from '../utils/redux-actions';

import { read } from '../utils/request';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');
export const READ_MINE = actionType('READ_MINE');

export const readAllUsers = createAction(
  READ_ALL,
  () => read('/user/all'),
);

export const readMineUser = createAction(
  READ_MINE,
  () => read('/user/mine'),
);
