import { handleAPIActions } from '../redux-actions';
import { READ_MINE } from '../actions/user';
import { LOGIN } from '../actions/auth';

export default {
  auth: handleAPIActions({
    [LOGIN]: (auth, { payload: { user: { id }, authorization } }) => ({
      isLogin: true,
      authorization,
      currentUserId: id,
    }),

    [READ_MINE]: (auth, { payload }) => ({
      ...auth,
      isLogin: true,
      currentUserId: payload.id,
    }),

  }, {
    authorization: null,
    isLogin: false,
    currentUserId: null,
  }),
};
