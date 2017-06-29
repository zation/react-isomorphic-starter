import React from 'react';
import { readAll } from 'shared/entities/actions/article';
import Home from './home';

const title = 'React Starter Kit';

export default async ({ store: { dispatch } }) => {
  await dispatch(readAll());
  return {
    chunks: ['home'],
    title,
    component: <Home title={title} />,
  };
};
