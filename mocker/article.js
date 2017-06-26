import { lorem, internet, random } from 'faker';
import { range, map } from 'lodash/fp';

const getArticle = values => ({
  id: random.number(),
  title: lorem.words(),
  link: internet.url(),
  content: lorem.paragraph(),
  ...values,
});

export const news = map(getArticle)(range(1, 40));

export default (router) => {
  router.get('/article', (request, response) => {
    response.status(200).send(news);
  });
};
