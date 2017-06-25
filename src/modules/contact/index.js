import React from 'react';
import Layout from 'components/layout';
import Contact from './contact';

const title = 'Contact Us';

function action() {
  return {
    chunks: ['contact'],
    title,
    component: <Layout><Contact title={title} /></Layout>,
  };
}

export default action;
