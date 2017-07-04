import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import router from 'shared/router';
import handleError from './middlewares/handle-error';
import render from './middlewares/render';
import healthCheck from './middlewares/health-check';
import logger from './logger';
import config from './config';
import enableGracefulShutdown from './enable-graceful-shutdown';

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

app.route('/healthCheck').get(healthCheck);

//
// Register server-side rendering middleware
// NOTE: resolve should happen in entry file, otherwise HMR will crash
// -----------------------------------------------------------------------------
app.get('*', render(options => router.resolve(options)));

//
// Error handling
// -----------------------------------------------------------------------------
const prettyError = new PrettyError();
prettyError.skipNodeFiles();
prettyError.skipPackage('express');
app.use(handleError(prettyError));

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  const server = enableGracefulShutdown(app);
  server.listen(config.port, () => {
    logger.info(`The server is running at http://localhost:${config.port}/`);
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
