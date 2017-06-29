import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'shared/components/layout';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { map } from 'lodash/fp';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { connect } from 'react-redux';
import { getEntityArray } from 'shared/entities/get-entity';
import s from './home.css';

export default compose(
  setDisplayName(__filename),
  withStyles(s),
  connect(state => ({
    articles: getEntityArray('article')(state),
  })),
  setPropTypes({
    articles: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }),
)(({ articles, title }) => (
  <Layout>
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        {map(item => (
          <article key={item.link} className={s.newsItem}>
            <h1 className={s.newsTitle}><a href={item.link}>{item.title}</a></h1>
            <div
              className={s.newsDesc}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </article>
        ), articles)}
      </div>
    </div>
  </Layout>
));
