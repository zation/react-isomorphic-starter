import merge from '../merge';
import { handleAPIActions } from '../../redux-actions';
import {
  READ_ALL,
} from '../actions/article';
import { article } from '../schema';

export default {
  article: handleAPIActions({
    [READ_ALL]: merge(article),

  }, {}),
};
