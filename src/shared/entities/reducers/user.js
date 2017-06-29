import { prop } from 'lodash/fp';

import merge from '../merge';
import { user } from '../schema';
import { handleActions } from '../redux-actions';
import { LOGIN } from '../actions/auth';
import {
  READ_MINE,
  READ_ALL,
} from '../actions/user';

export default {
  user: handleActions({
    [READ_ALL]: merge(user),

    [LOGIN]: (originalData, { payload }) =>
      merge(user)(originalData, { payload: prop('user')(payload) }),

    [READ_MINE]: merge(user),

  }, {}),
};
