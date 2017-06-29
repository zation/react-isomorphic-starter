import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose, setDisplayName } from 'recompose';
import s from './footer.css';
import Link from '../link';

export default compose(
  withStyles(s),
  setDisplayName(__filename),
)(() => (
  <div className={s.root}>
    <div className={s.container}>
      <span className={s.text}>© Your Company</span>
      <span className={s.spacer}>·</span>
      <Link className={s.link} to="/">Home</Link>
      <span className={s.spacer}>·</span>
      <Link className={s.link} to="/admin">Admin</Link>
      <span className={s.spacer}>·</span>
      <Link className={s.link} to="/privacy">Privacy</Link>
      <span className={s.spacer}>·</span>
      <Link className={s.link} to="/not-found">Not Found</Link>
    </div>
  </div>
));
