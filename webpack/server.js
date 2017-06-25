import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import {
  isDev,
  isVerbose,
  context,
  resolve,
  internalStyleRule,
  externalStyleRule,
  fileRegex,
  fileName,
  stats,
  getBabelLoader,
} from './base';
import pkg from '../package.json';

export default {
  context,
  resolve,
  name: 'server',
  target: 'node',

  entry: {
    server: ['babel-polyfill', './src/server/index.js'],
  },

  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/assets/', // TODO: check if needed
    pathinfo: isVerbose,
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
    ...isDev ? {
      hotUpdateMainFilename: 'updates/[hash].hot-update.json',
      hotUpdateChunkFilename: 'updates/[id].[hash].hot-update.js',
    } : {},
  },

  module: {
    rules: [
      getBabelLoader({
        targets: {
          node: pkg.engines.node.match(/(\d+\.?)+/)[0],
        },
      }),
      {
        test: fileRegex,
        loader: 'file-loader',
        query: {
          name: `public/assets/${fileName}`,
          publicPath: url => url.replace(/^public/, ''),
        },
      },
      internalStyleRule,
      externalStyleRule,
    ],
  },

  externals: [
    './assets.json',
    nodeExternals({
      whitelist: [
        /\.(css|less|scss|sss)$/i,
      ],
    }),
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __DEV__: isDev,
    }),

    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),

    ...isDev ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
    ] : [],
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  bail: !isDev,

  cache: isDev,

  stats,

  devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
};
