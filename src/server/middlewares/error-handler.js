import React from 'react';
import ReactDOM from 'react-dom/server';
import { ErrorPageWithoutStyle } from 'modules/error/error-page';
import errorPageStyle from 'modules/error/error-page.css';
import Html from '../html';

// NOTE: express use params number to detect if it's a error handler middleware T_T
// eslint-disable-next-line no-unused-vars
export default prettyError => (err, req, res, next) => {
  console.error(prettyError.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
};
