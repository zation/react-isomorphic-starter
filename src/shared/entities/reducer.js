import { combineReducers } from 'redux';

import article from './reducers/article';
import fetchError from './reducers/fetch-error';
import user from './reducers/user';
import auth from './reducers/auth';

export default {
  entities: combineReducers({
    ...article,
    ...fetchError,
    ...user,
    ...auth,
  }),
};
