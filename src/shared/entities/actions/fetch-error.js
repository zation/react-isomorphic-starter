import { actionTypeCreator } from '../redux-actions';

const actionType = actionTypeCreator(__filename);
export const THROW_FETCH_ERROR = actionType('THROW_FETCH_ERROR');

export const throwFetchError = (payload, meta) => ({
  type: THROW_FETCH_ERROR,
  payload,
  meta,
  error: true,
});
