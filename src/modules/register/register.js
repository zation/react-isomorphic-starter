import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from 'shared/components/layout/layout';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import s from './register.css';

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
        <p>...</p>
      </div>
    </div>
  </Layout>
));
