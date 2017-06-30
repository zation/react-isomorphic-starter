import { prop, curry, flow, values } from 'lodash/fp';

export const getEntityArray = curry(
  (keyPath, store) => flow(prop(`entities.${keyPath}`), values)(store),
);

export const getEntityIsFetching = curry(
  (keyPath, store) => flow(prop(`entities.${keyPath}.__isFetching`), values)(store),
);

export default curry((keyPath, store) => prop(`entities.${keyPath}`, store));
