import React from 'react';
import { readMine, readAll } from 'shared/entities/actions/user';
import getCurrentUser from 'shared/selectors/current-user';
import Admin from './admin';

const title = 'Admin Page';

export default async ({ store: { dispatch, getState } }) => {
  await dispatch(readMine());
  dispatch(readAll());

  const currentUser = getCurrentUser(getState());

  if (currentUser) {
    return {
      chunks: ['admin'],
      title: `${title} - ${currentUser.name}`,
      component: <Admin title={title} />,
    };
  }

  return { redirect: '/login' };
};
