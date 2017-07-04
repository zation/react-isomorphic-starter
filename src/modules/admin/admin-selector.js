import { getEntityArray, getEntityMeta } from 'shared/redux/get-entity';
import getCurrentUser from 'shared/redux/user/current-user';

export default state => ({
  users: getEntityArray('user', state),
  currentUser: getCurrentUser(state),
  isUsersFetching: getEntityMeta('user', 'isFetching', state),
});
