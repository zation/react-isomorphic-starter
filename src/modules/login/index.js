import React from 'react';
import Login from './login';

const title = 'Log In';

function action() {
  return {
    chunks: ['login'],
    title,
    component: <Login title={title} />,
  };
}

export default action;
