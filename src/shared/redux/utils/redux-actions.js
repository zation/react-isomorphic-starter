import { keys, map, prop, flow, split, flatten } from 'lodash/fp';
import reduceReducers from 'reduce-reducers';
import {
  createAction as originalCreateAction,
  handleAction,
  combineActions,
} from 'redux-actions';
import { ACTION_TYPE_DELIMITER } from 'redux-actions/lib/combineActions';

const START = 'START';
const FAIL = 'FAIL';

export const start = action => `${action}_${START}`;
export const fail = action => `${action}_${FAIL}`;

export const actionTypeCreator = filename => actionName => `~${filename}#${actionName}`;

export const createAction = (type, payloadCreator, metaCreator) =>
  originalCreateAction(type, payloadCreator, metaCreator || (data => data));

export { handleActions, combineActions } from 'redux-actions';

const updateMeta = meta => state => ({
  ...state,
  __meta: {
    ...prop('__meta')(state),
    ...meta,
  },
});

export const handleAPIActions = (handlers, defaultState) => {
  const actions = keys(handlers);
  const reducers = map(action => handleAction(action, handlers[action], defaultState))(actions);

  const splitActions = flow(
    map(split(ACTION_TYPE_DELIMITER)),
    flatten,
  )(actions);
  const reducer = reduceReducers(
    ...reducers,
    handleAction(
      combineActions(...actions, ...map(fail)(splitActions)),
      updateMeta({ isFetching: false }),
      defaultState,
    ),
    handleAction(
      combineActions(...map(start)(splitActions)),
      updateMeta({ isFetching: true }),
      defaultState,
    ),
  );
  return (state = defaultState, action) => reducer(state, action);
};
