import { THROW_FETCH_ERROR } from '../entities/actions/fetch-error';

export default ({ history }) => () => next => (action) => {
  if (action.type === THROW_FETCH_ERROR) {
    const {
      meta: { status, ignoreAuthRedirection },
    } = action;
    if (status === 401 && !ignoreAuthRedirection) {
      history.replace('/login');
    }
  }
  return next(action);
};
