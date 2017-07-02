import { prop } from 'lodash/fp';

import { handleActions } from '../../redux-actions';
import { THROW_FETCH_ERROR } from '../actions/fetch-error';

export default {
  fetchError: handleActions({
    [THROW_FETCH_ERROR]: (fetchError, { payload, meta }) => {
      const errorMessage = prop('errors.default', payload);
      if (errorMessage) {
        return { message: errorMessage, ...meta };
      }
      return fetchError;
    },

  }, {}),
};
