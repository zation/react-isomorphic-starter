import { inspect } from 'util';

const inspectObject = object =>
  inspect(object, {
    colors: true,
  });

// Server side redux action logger
export default () => next => (action) => {
  if (action.error) {
    console.error(` * ${action.type}: ${inspectObject(action.payload)}, ${inspectObject(action.meta)}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(` * ${action.type}`);
  }

  return next(action);
};
