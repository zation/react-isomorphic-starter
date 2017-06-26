import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { map } from 'lodash/fp';
import { compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { getEntityArray } from 'shared/entities/get-entity';
import s from './home.css';

export default compose(
  setDisplayName(__filename),
  withStyles(s),
  connect(state => ({
    articles: getEntityArray('article')(state),
  })),
)(({ articles }) => (
  <div className={s.root}>
    <div className={s.container}>
      <h1>React.js News</h1>
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
));
