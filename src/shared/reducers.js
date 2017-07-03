import { combineReducers } from 'redux';

import entities from 'shared/redux/reducer';

export default combineReducers({
  ...entities,
});
