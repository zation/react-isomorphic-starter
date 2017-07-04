import path from 'path';
import fs from 'fs';
import forOwn from 'lodash/forOwn';
import { Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from './config';

const { logDir } = config;

try {
  fs.accessSync(logDir);
} catch (error) {
  fs.mkdirSync(logDir);
}

const logger = new Logger({
  transports: [
    __DEV__ ?
      new transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
        timestamp: true,
      }) :
      new DailyRotateFile({
        name: 'file',
        level: 'info',
        datePattern: '.yyyy-MM-dd',
        maxFiles: 30,
        filename: path.resolve(logDir, `${process.env.HOSTNAME}-application.log`),
      }),
  ],
  exitOnError: false,
  emitErrs: true,
});

const originError = logger.error.bind(logger);
logger.error = (msg, meta) => {
  let newMeta = meta;

  if (meta && meta instanceof Error) {
    newMeta = {};

    forOwn(meta, (value, key) => {
      newMeta[key] = value;
    });

    newMeta.stack = meta.stack;
  }

  originError(msg, newMeta);
};

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

export default logger;
