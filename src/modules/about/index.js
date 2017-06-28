import React from 'react';
import Layout from 'shared/components/layout/layout';

function action() {
  return {
    chunks: ['about'],
    title: 'About',
    component: <Layout>About</Layout>,
  };
}

export default action;
