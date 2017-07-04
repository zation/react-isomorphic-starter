import { inspect } from 'util';

const inspectObject = object =>
  inspect(object, {
    colors: true,
  });

// Server side redux action logger
export default ({ logger }) => () => next => (action) => {
  if (action.error) {
    logger.error(` * ${action.type}: ${inspectObject(action.payload)}, ${inspectObject(action.meta)}`);
  } else {
    logger.info(` * ${action.type}`);
  }

  return next(action);
};
