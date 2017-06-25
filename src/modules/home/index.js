import React from 'react';
import Layout from 'components/layout';
import Home from './home';

async function action() {
  return {
    chunks: ['home'],
    title: 'React Starter Kit',
    component: <Layout><Home news={[]} /></Layout>,
  };
}

export default action;
