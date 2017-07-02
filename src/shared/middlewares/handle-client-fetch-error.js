import { THROW_FETCH_ERROR } from '../entities/actions/fetch-error';
import { replace } from '../actions/history';

export default () => ({ dispatch }) => next => (action) => {
  if (action.type === THROW_FETCH_ERROR) {
    const {
      meta: { status, ignoreAuthRedirection },
    } = action;
    if (status === 401 && !ignoreAuthRedirection) {
      dispatch(replace('/login'));
    }
  }
  return next(action);
};
