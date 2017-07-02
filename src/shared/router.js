import Router from 'universal-router';
import routes from 'modules/routes';
import { isFunction } from 'lodash/fp';

export default new Router(routes, {
  resolveRoute(context, params) {
    if (isFunction(context.route.load)) {
      return context.route.load().then(action => action.default(context, params));
    }
    if (isFunction(context.route.action)) {
      return context.route.action(context, params);
    }
    return null;
  },
});
