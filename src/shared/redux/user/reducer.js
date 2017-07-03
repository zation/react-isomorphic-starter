import { prop } from 'lodash/fp';

import merge from '../utils/merge';
import { user } from '../schema';
import { handleAPIActions, combineActions } from '../utils/redux-actions';
import { LOGIN } from '../auth/actions';
import {
  READ_MINE,
  READ_ALL,
} from './actions';

export default {
  user: handleAPIActions({
    [combineActions(READ_ALL, READ_MINE)]: merge(user),

    [LOGIN]: (originalData, { payload }) =>
      merge(user)(originalData, { payload: prop('user')(payload) }),

  }, {}),
};
