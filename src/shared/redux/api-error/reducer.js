import { prop } from 'lodash/fp';

import { handleActions } from '../utils/redux-actions';
import { THROW_API_ERROR } from './actions';

export default {
  fetchError: handleActions({
    [THROW_API_ERROR]: (fetchError, { payload, meta }) => {
      const errorMessage = prop('errors.default', payload);
      if (errorMessage) {
        return { message: errorMessage, ...meta };
      }
      return fetchError;
    },

  }, {}),
};
