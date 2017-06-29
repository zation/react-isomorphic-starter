import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose, setDisplayName } from 'recompose';
import s from './navigation.css';
import Link from '../link';

export default compose(
  withStyles(s),
  setDisplayName(__filename),
)(() => (
  <div className={s.root} role="navigation">
    <Link className={s.link} to="/about">About</Link>
    <Link className={s.link} to="/contact">Contact</Link>
    <span className={s.spacer}> | </span>
    <Link className={s.link} to="/login">Log in</Link>
    <span className={s.spacer}>or</span>
    <Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>
  </div>
));
