import React from 'react';
import { readMineUser, readAllUsers } from 'shared/redux/user/actions';
import getCurrentUser from 'shared/redux/user/current-user';
import Admin from './admin';

const title = 'Admin Page';

export default async ({ store: { dispatch, getState } }) => {
  await dispatch(readMineUser());

  const currentUser = getCurrentUser(getState());

  if (currentUser) {
    return {
      chunks: ['admin'],
      title: `${title} - ${currentUser.name}`,
      component: <Admin title={title} />,
      clientLoad: () => dispatch(readAllUsers()),
    };
  }

  return { redirect: '/login' };
};
