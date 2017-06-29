import { THROW_SERVER_ERROR } from '../entities/actions/server-error';

export default ({ history }) => () => next => (action) => {
  if (action.type === THROW_SERVER_ERROR) {
    const {
      meta: { status, ignoreAuthRedirection },
    } = action;
    if (status === 401 && !ignoreAuthRedirection && history) {
      history.push('/login');
    }
  }
  return next(action);
};
