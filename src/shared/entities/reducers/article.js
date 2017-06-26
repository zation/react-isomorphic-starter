import merge from '../merge';
import { handleActions } from '../redux-actions';
import {
  READ_ALL,
} from '../actions/article';
import { article } from '../schema';

export default {
  article: handleActions({
    [READ_ALL]: merge(article),

  }, {}),
};
