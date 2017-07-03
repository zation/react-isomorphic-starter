import { getEntityArray } from 'shared/redux/get-entity';

export default state => ({
  articles: getEntityArray('article')(state),
});
