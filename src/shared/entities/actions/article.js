import { createAction, actionTypeCreator } from '../../redux-actions';

import { read } from '../request';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');

export const readAllArticles = createAction(
  READ_ALL,
  () => read('/article/all'),
);
