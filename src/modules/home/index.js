import React from 'react';
import { readAll } from 'shared/entities/actions/article';
import Home from './home';

export default async ({ store: { dispatch } }) => {
  await dispatch(readAll());
  return {
    chunks: ['home'],
    title: 'React Starter Kit',
    component: <Home />,
  };
};
