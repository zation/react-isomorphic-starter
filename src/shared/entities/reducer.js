import { combineReducers } from 'redux';

import article from './reducers/article';
import serverError from './reducers/server-error';
import user from './reducers/user';
import auth from './reducers/auth';

export default {
  entities: combineReducers({
    ...article,
    ...serverError,
    ...user,
    ...auth,
  }),
};
