import { combineReducers } from 'redux';

import article from './article/reducer';
import apiError from './api-error/reducer';
import user from './user/reducer';
import auth from './auth/reducer';

export default {
  entities: combineReducers({
    ...article,
    ...apiError,
    ...user,
    ...auth,
  }),
};
