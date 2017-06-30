import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
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

const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

export default {
  context,
  resolve,
  name: 'client',
  target: 'web',

  entry: {
    client: [
      'babel-polyfill',
      ...isDev ? [
        'react-error-overlay',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?name=client&reload=true',
      ] : [],
      './src/client/index.js',
    ],
  },

  output: {
    path: path.resolve(__dirname, '../build/public/assets'),
    publicPath: '/assets/',
    pathinfo: isVerbose,
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
  },

  module: {
    rules: [
      getBabelLoader({
        targets: {
          browsers: pkg.browserslist,
          uglify: true,
        },
        extraPlugins: isDev ? ['react-hot-loader/babel', 'lodash'] : ['lodash'],
      }),
      {
        test: fileRegex,
        loader: 'file-loader',
        query: {
          name: fileName,
        },
      },
      internalStyleRule,
      externalStyleRule,

      ...isDev ? [] : [
        {
          test: path.resolve(__dirname, '../node_modules/react-deep-force-update/lib/index.js'),
          loader: 'null-loader',
        },
      ],
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDev,
    }),

    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.json',
      prettyPrint: true,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),

    new LodashModuleReplacementPlugin({
      currying: true,
      paths: true,
    }),

    ...isDev ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ] : [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: isVerbose,
          unused: true,
          dead_code: true,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ],

    ...isAnalyze ? [new BundleAnalyzerPlugin()] : [],
  ],

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    __filename: true,
  },

  bail: !isDev,

  cache: isDev,

  stats,

  devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
};
