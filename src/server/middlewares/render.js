import React from 'react';
import ReactDOM from 'react-dom/server';
import { map, forEach } from 'lodash/fp';
import createStore from 'shared/create-store';
import router from 'shared/router';
import App from 'shared/app';
import Html from '../html';
import config from '../config';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved

const { api: { baseUrl: apiBaseUrl } } = config;

export default async (req, res, next) => {
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
};
