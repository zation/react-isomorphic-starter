import { getEntityArray, getEntityMeta } from 'shared/entities/get-entity';
import getCurrentUser from 'shared/selectors/current-user';

export default state => ({
  users: getEntityArray('user', state),
  currentUser: getCurrentUser(state),
  isUsersFetching: getEntityMeta('user', 'isFetching', state),
});
