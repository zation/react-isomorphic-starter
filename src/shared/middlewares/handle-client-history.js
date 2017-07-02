import { PUSH, REPLACE, GO, GO_FORWARD, GO_BACK } from '../actions/history';

export default ({ history }) => () => next => (action) => {
  const { payload, type } = action;
  if (type === PUSH) {
    return history.push(payload);
  }
  if (type === REPLACE) {
    return history.replace(payload);
  }
  if (type === GO) {
    return history.go(payload);
  }
  if (type === GO_FORWARD) {
    return history.goForward();
  }
  if (type === GO_BACK) {
    return history.goBack();
  }
  return next(action);
};
