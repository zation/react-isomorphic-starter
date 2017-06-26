import { lorem, internet } from 'faker';
import { range, map } from 'lodash/fp';

const getNews = values => ({
  title: lorem.words(),
  link: internet.url(),
  content: lorem.paragraph(),
  ...values,
});

export const news = map(getNews)(range(1, 40));

export default (router) => {
  router.get('/news', (request, response) => {
    response.status(200).send(news);
  });
};
