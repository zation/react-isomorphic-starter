import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import { map } from 'lodash/fp';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import config from './config';

/* eslint-disable react/no-danger */

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    // eslint-disable-next-line react/forbid-prop-types
    app: PropTypes.object,
    children: PropTypes.string.isRequired,
  }),
)(({ title, description, styles = [], scripts = [], app = {}, children }) => (
  <html className="no-js" lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {map(script => <link key={script} rel="preload" href={script} as="script" />, scripts)}
      <link rel="apple-touch-icon" href="apple-touch-icon.png" />
      {map(style => (
        <style
          key={style.id}
          id={style.id}
          dangerouslySetInnerHTML={{ __html: style.cssText }}
        />
      ), styles)}
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
      <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
      {map(script => <script key={script} src={script} />, scripts)}
      {config.analytics.googleTrackingId && (
        <script
          dangerouslySetInnerHTML={{
            __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
            `ga('create','${config.analytics.googleTrackingId}','auto');ga('send','pageview')`,
          }}
        />
      )}
      {config.analytics.googleTrackingId && (
        <script src="https://www.google-analytics.com/analytics.js" async defer />
      )}
    </body>
  </html>
));
