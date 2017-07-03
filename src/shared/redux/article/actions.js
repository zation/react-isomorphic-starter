import { createAction, actionTypeCreator } from '../utils/redux-actions';

import { read } from '../utils/request';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');

export const readAllArticles = createAction(
  READ_ALL,
  () => read('/article/all'),
);
