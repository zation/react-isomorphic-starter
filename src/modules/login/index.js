import React from 'react';
import Layout from 'shared/components/layout';
import Login from './login';

const title = 'Log In';

function action() {
  return {
    chunks: ['login'],
    title,
    component: <Layout><Login title={title} /></Layout>,
  };
}

export default action;
