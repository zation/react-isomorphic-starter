import React from 'react';
import Admin from './admin';

const isAdmin = false;
const title = 'Admin Page';

function action() {
  if (!isAdmin) {
    return { redirect: '/login' };
  }

  return {
    chunks: ['admin'],
    title,
    component: <Admin title={title} />,
  };
}

export default action;
