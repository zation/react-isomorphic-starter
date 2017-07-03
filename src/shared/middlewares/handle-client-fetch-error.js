import { THROW_API_ERROR } from '../redux/api-error/actions';
import { replace } from '../actions/history';

export default () => ({ dispatch }) => next => (action) => {
  if (action.type === THROW_API_ERROR) {
    const {
      meta: { status, ignoreAuthRedirection },
    } = action;
    if (status === 401 && !ignoreAuthRedirection) {
      dispatch(replace('/login'));
    }
  }
  return next(action);
};
