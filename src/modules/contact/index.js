import React from 'react';
import Contact from './contact';

const title = 'Contact Us';

export default () => ({
  chunks: ['contact'],
  title,
  component: <Contact title={title} />,
});
