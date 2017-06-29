import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose, setDisplayName } from 'recompose';
import s from './header.css';
import Link from '../link';
import Navigation from '../navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

export default compose(
  withStyles(s),
  setDisplayName(__filename),
)(() => (
  <div className={s.root}>
    <div className={s.container}>
      <Navigation />
      <Link className={s.brand} to="/">
        <img src={logoUrl} srcSet={`${logoUrl2x} 2x`} width="38" height="38" alt="React" />
        <span className={s.brandTxt}>Your Company</span>
      </Link>
      <div className={s.banner}>
        <h1 className={s.bannerTitle}>React</h1>
        <p className={s.bannerDesc}>Complex web apps made easy</p>
      </div>
    </div>
  </div>
));
