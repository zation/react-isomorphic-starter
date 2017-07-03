import React from 'react';
import { readAllArticles } from 'shared/redux/article/actions';
import Home from './home';

const title = 'React Starter Kit';

export default async ({ store: { dispatch } }) => {
  await dispatch(readAllArticles());
  return {
    chunks: ['home'],
    title,
    component: <Home title={title} />,
  };
};
