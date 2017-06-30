import { getEntityArray } from 'shared/entities/get-entity';

export default state => ({
  articles: getEntityArray('article')(state),
});
