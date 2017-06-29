import React from 'react';
import Register from './register';

const title = 'New User Registration';

export default () => ({
  chunks: ['register'],
  title,
  component: <Register title={title} />,
});
