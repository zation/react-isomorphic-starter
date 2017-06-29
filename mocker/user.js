import { name, internet, random } from 'faker';
import { range, map, concat, flow } from 'lodash/fp';

const getUser = values => ({
  id: random.number(),
  name: name.findName(),
  email: internet.email(),
  ...values,
});

export const currentUser = getUser();

export const users = flow(
  map(getUser),
  concat(currentUser),
)(range(1, 40));

export default (router) => {
  router.get('/user/mine', (request, response) => {
    response.status(200).send(currentUser);
  });

  router.get('/user/all', (request, response) => {
    response.status(200).send(users);
  });
};
