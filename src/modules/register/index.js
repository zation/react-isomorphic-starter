import React from 'react';
import Layout from 'shared/components/layout/layout';
import Register from './register';

const title = 'New User Registration';

function action() {
  return {
    chunks: ['register'],
    title,
    component: <Layout><Register title={title} /></Layout>,
  };
}

export default action;
