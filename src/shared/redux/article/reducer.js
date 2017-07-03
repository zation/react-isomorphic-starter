import merge from '../utils/merge';
import { handleAPIActions } from '../utils/redux-actions';
import {
  READ_ALL,
} from './actions';
import { article } from '../schema';

export default {
  article: handleAPIActions({
    [READ_ALL]: merge(article),

  }, {}),
};
