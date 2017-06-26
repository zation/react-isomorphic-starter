import { combineReducers } from 'redux';

import entities from 'shared/entities/reducer';

export default combineReducers({
  ...entities,
});
