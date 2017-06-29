import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from 'shared/components/layout';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import s from './not-found.css';

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    title: PropTypes.string.isRequired,
  }),
  withStyles(s),
)(({ title }) => (
  <Layout>
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>Sorry, the page you were trying to view does not exist.</p>
      </div>
    </div>
  </Layout>
));
