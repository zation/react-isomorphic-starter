import { prop, curry, flow, values, omit } from 'lodash/fp';

export const getEntityArray = curry((entityName, store) =>
  flow(
    prop(`entities.${entityName}`),
    omit(['__meta']),
    values,
  )(store));

export const getEntityMeta = curry((entityName, metaName, store) =>
  prop(`entities.${entityName}.__meta.${metaName}`)(store));

export default curry((entityName, store) =>
  flow(
    prop(`entities.${entityName}`),
    result => (prop('__meta')(result) ? omit('__meta')(result) : result),
  )(store));
