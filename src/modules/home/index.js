import React from 'react';
import { readAllArticles } from 'shared/entities/actions/article';
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
