import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';
import s from './layout.css';
import Header from './header';
import Footer from './footer';

export default compose(
  withStyles(normalizeCss, s),
  setDisplayName(__filename),
  setPropTypes({
    children: PropTypes.node.isRequired,
  }),
)(({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
));
