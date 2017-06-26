import React from 'react';
import Layout from 'components/layout';
import { readAll } from 'shared/entities/actions/article';
import Home from './home';

async function action({ store: { dispatch } }) {
  await dispatch(readAll());
  return {
    chunks: ['home'],
    title: 'React Starter Kit',
    component: <Layout><Home articles={[]} /></Layout>,
  };
}

export default action;
