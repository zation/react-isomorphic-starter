import { keys, map } from 'lodash/fp';
import reduceReducers from 'reduce-reducers';
import {
  createAction as originalCreateAction,
  handleAction,
  combineActions,
} from 'redux-actions';

const START = 'START';
const FAIL = 'FAIL';

export const start = action => `${action}_${START}`;
export const fail = action => `${action}_${FAIL}`;

export const actionTypeCreator = filename => actionName => `~${filename}#${actionName}`;

export const createAction = (type, payloadCreator, metaCreator) =>
  originalCreateAction(type, payloadCreator, metaCreator || (data => data));

export { handleActions, combineActions } from 'redux-actions';

export const handleAPIActions = (handlers, defaultState) => {
  const actions = keys(handlers);
  const reducers = map(type => handleAction(type, handlers[type], defaultState))(actions);
  const reducer = reduceReducers(
    ...reducers,
    handleAction(
      combineActions(...actions, ...map(fail)(actions)),
      state => ({ ...state, __isFetching: false }),
      defaultState,
    ),
    handleAction(
      combineActions(...map(start)(actions)),
      state => ({ ...state, __isFetching: true }),
      defaultState,
    ),
  );
  return (state = defaultState, action) => reducer(state, action);
};
