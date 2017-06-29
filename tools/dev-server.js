import path from 'path';
import express from 'express';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import createLaunchEditorMiddleware from 'react-error-overlay/middleware';
import clientConfig from '../webpack/client';
import serverConfig from '../webpack/server';
import run, { format } from './run';
import clean from './clean';

const isDebug = !process.argv.includes('--release');

// https://webpack.js.org/configuration/watch/#watchoptions
const watchOptions = {
  // Watching may not work with NFS and machines in VirtualBox
  // Uncomment next line if it is your case (use true or interval in milliseconds)
  // poll: true,

  // Decrease CPU or memory usage in some file systems
  // ignored: /node_modules/,
};

const createCompilationPromise = (name, compiler, config) =>
  new Promise((resolve, reject) => {
    let timeStart = new Date();
    compiler.plugin('compile', () => {
      timeStart = new Date();
      console.info(`[${format(timeStart)}] Compiling '${name}'...`);
    });
    compiler.plugin('done', (stats) => {
      console.info(stats.toString(config.stats));
      const timeEnd = new Date();
      const time = timeEnd.getTime() - timeStart.getTime();
      if (stats.hasErrors()) {
        console.info(`[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`);
        reject(new Error('Compilation failed!'));
      } else {
        console.info(`[${format(timeEnd)}] Finished '${name}' compilation after ${time} ms`);
        resolve(stats);
      }
    });
  });

let server;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  if (server) return server;
  server = express();
  server.use(createLaunchEditorMiddleware());
  server.use(express.static(path.resolve(__dirname, '../public')));

  // Configure compilation
  await run(clean);
  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);
  const clientPromise = createCompilationPromise('client', clientCompiler, clientConfig);
  const serverPromise = createCompilationPromise('server', serverCompiler, serverConfig);

  // https://github.com/webpack/webpack-dev-middleware
  server.use(webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    quiet: true,
    watchOptions,
  }));

  // https://github.com/glenjamin/webpack-hot-middleware
  server.use(webpackHotMiddleware(clientCompiler, { log: false }));

  let appPromise;
  let appPromiseResolve;
  let appPromiseIsResolved = true;
  serverCompiler.plugin('compile', () => {
    if (!appPromiseIsResolved) return;
    appPromiseIsResolved = false;
    appPromise = new Promise(resolve => (appPromiseResolve = resolve));
  });

  let app;
  server.use((req, res) => {
    appPromise.then(() => app.handle(req, res)).catch(error => console.error(error));
  });

  function checkForUpdate(fromUpdate) {
    const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
    if (!app.hot) {
      throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
    }
    if (app.hot.status() !== 'idle') {
      return Promise.resolve();
    }
    return app.hot.check(true).then((updatedModules) => {
      if (!updatedModules) {
        if (fromUpdate) {
          console.info(`${hmrPrefix}Update applied.`);
        }
        return;
      }
      if (updatedModules.length === 0) {
        console.info(`${hmrPrefix}Nothing hot updated.`);
      } else {
        console.info(`${hmrPrefix}Updated modules:`);
        updatedModules.forEach(moduleId => console.info(`${hmrPrefix} - ${moduleId}`));
        checkForUpdate(true);
      }
    }).catch((error) => {
      console.error(error);
      if (['abort', 'fail'].includes(app.hot.status())) {
        console.warn(`${hmrPrefix}Cannot apply update.`);
        delete require.cache[require.resolve('../build/server')];
        // eslint-disable-next-line global-require, import/no-unresolved
        app = require('../build/server').default;
        console.warn(`${hmrPrefix}App has been reloaded.`);
      } else {
        console.warn(`${hmrPrefix}Update failed: ${error.stack || error.message}`);
      }
    });
  }

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (app && !error && !stats.hasErrors()) {
      checkForUpdate().then(() => {
        appPromiseIsResolved = true;
        appPromiseResolve();
      });
    }
  });

  // Wait until both client-side and server-side bundles are ready
  await clientPromise;
  await serverPromise;

  const timeStart = new Date();
  console.info(`[${format(timeStart)}] Launching server...`);

  // Load compiled src/server/index.js as a middleware
  // eslint-disable-next-line global-require, import/no-unresolved
  app = require('../build/server').default;
  appPromiseIsResolved = true;
  appPromiseResolve();

  // Launch the development server with Browsersync and HMR
  await new Promise((resolve, reject) => browserSync.create().init({
    // https://www.browsersync.io/docs/options
    server: 'src/server/index.js',
    middleware: [server],
    open: !process.argv.includes('--silent'),
    ...isDebug ? {} : { notify: false, ui: false },
  }, (error, bs) => (error ? reject(error) : resolve(bs))));

  const timeEnd = new Date();
  const time = timeEnd.getTime() - timeStart.getTime();
  console.info(`[${format(timeEnd)}] Server launched after ${time} ms`);
  return server;
}

export default start;
