import http from 'http';
import enableDestroy from 'server-destroy';
import promisify from 'es6-promisify';
import logger from './logger';

const GRACEFUL_SHUTDOWN_DELAY = 4000;

export default (app) => {
  const server = new http.Server(app);

  if (__DEV__) {
    enableDestroy(server);
    const serverDestroy = promisify(server.destroy, server);
    app.set('isSigterm', false);

    const gracefulStop = () => {
      logger.info('----> React web server is shutting down...', new Date().toISOString());
      serverDestroy()
        .then(() => {
          logger.info('----> React web successful graceful shutdown', new Date().toISOString());
          process.exit(0);
        })
        .catch((err) => {
          logger.error('----> Error happened during react web graceful shutdown', err);
          process.exit(1);
        });
    };

    process.on('SIGTERM', () => {
      app.set('isSigterm', true);
      logger.info('----> Got SIGTERM. React web graceful shutdown start');
      setTimeout(gracefulStop, GRACEFUL_SHUTDOWN_DELAY);
    });
  }

  return server;
};
