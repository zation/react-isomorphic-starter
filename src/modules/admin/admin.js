import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import Layout from 'shared/components/layout';
import { connect } from 'react-redux';
import { map } from 'lodash/fp';
import s from './admin.css';
import selector from './admin-selector';

export default compose(
  withStyles(s),
  connect(selector),
  setDisplayName(__filename),
  setPropTypes({
    title: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
    users: PropTypes.array,
  }),
)(({ title, currentUser, users }) => (
  <Layout>
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>Name: {currentUser.name}</p>
        <ul>
          {map(({ id, name }) => (
            <li key={id}>Name: {name}</li>
          ))(users)}
        </ul>
      </div>
    </div>
  </Layout>
));
