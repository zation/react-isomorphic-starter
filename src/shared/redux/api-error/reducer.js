import { prop } from 'lodash/fp';

import { handleActions } from '../utils/redux-actions';
import { THROW_API_ERROR } from './actions';

export default {
  apiError: handleActions({
    [THROW_API_ERROR]: (apiError, { payload, meta }) => {
      const errorMessage = prop('errors.default', payload);
      if (errorMessage) {
        return { message: errorMessage, ...meta };
      }
      return apiError;
    },

  }, {}),
};
