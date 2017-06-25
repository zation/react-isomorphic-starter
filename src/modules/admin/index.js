import React from 'react';
import Layout from 'components/layout';
import Admin from './admin';

const title = 'Admin Page';
const isAdmin = false;

function action() {
  if (!isAdmin) {
    return { redirect: '/login' };
  }

  return {
    chunks: ['admin'],
    title,
    component: <Layout><Admin title={title} /></Layout>,
  };
}

export default action;
