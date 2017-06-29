import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import router from 'shared/router';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { map, forEach } from 'lodash/fp';
import createStore from 'shared/create-store';
import App from 'shared/app';
import Html from './html';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import errorHandler from './middlewares/error-handler';
import config from './config';

const { api: { baseUrl: apiBaseUrl } } = config;
const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (__DEV__) {
  app.enable('trust proxy');
}

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        forEach(style => css.add(style._getCss()), styles);
      },
      store: createStore({ apiBaseUrl }),
      storeSubscription: null,
    };

    const route = await router.resolve({
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    // NOTICE: keep this before css
    const content = ReactDOM.renderToString(<App context={context}>{route.component}</App>);

    const html = ReactDOM.renderToStaticMarkup(
      <Html
        title={route.title}
        description={route.description}
        styles={[
          { id: 'css', cssText: [...css].join('') },
        ]}
        scripts={[
          assets.vendor.js,
          ...route.chunks ? map(chunk => assets[chunk].js, route.chunks) : [],
          assets.client.js,
        ]}
        app={{
          apiBaseUrl,
          initialState: context.store.getState(),
        }}
      >
        {content}
      </Html>,
    );
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const prettyError = new PrettyError();
prettyError.skipNodeFiles();
prettyError.skipPackage('express');
app.use(errorHandler(prettyError));

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('shared/router');
}

export default app;
