import { combineReducers } from 'redux';

import article from './reducers/article';

export default {
  entities: combineReducers({
    ...article,
  }),
};
