import { createLogger as reduxLogger } from 'redux-logger';

export default () =>
  reduxLogger({
    collapsed: true,
  });
