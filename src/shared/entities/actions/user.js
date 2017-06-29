import { createAction, actionTypeCreator } from '../redux-actions';

import { read } from '../request';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');
export const READ_MINE = actionType('READ_MINE');

export const readAll = createAction(
  READ_ALL,
  () => read('/user/all'),
);

export const readMine = createAction(
  READ_MINE,
  () => read('/user/mine'),
);
