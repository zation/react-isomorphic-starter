import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import Layout from 'shared/components/layout';
import s from './admin.css';

export default compose(
  withStyles(s),
  setDisplayName(__filename),
  setPropTypes({
    title: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
  }),
)(({ title, currentUser }) => (
  <Layout>
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>Name: {currentUser.name}</p>
      </div>
    </div>
  </Layout>
));
