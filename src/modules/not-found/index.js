import React from 'react';
import NotFound from './not-found';

const title = 'Page Not Found';

export default () => ({
  chunks: ['not-found'],
  title,
  component: <NotFound title={title} />,
  status: 404,
});
