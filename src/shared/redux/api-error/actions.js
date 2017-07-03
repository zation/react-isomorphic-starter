import { actionTypeCreator } from '../utils/redux-actions';

const actionType = actionTypeCreator(__filename);
export const THROW_API_ERROR = actionType('THROW_API_ERROR');

export const throwAPIError = (payload, meta) => ({
  type: THROW_API_ERROR,
  payload,
  meta,
  error: true,
});
