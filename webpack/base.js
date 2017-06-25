import path from 'path';

export const isDebug = !process.argv.includes('--release');
export const isVerbose = process.argv.includes('--verbose');

export const context = path.resolve(__dirname, '..');

export const resolve = {
  // Keep in sync with .flowconfig and .eslintrc
  modules: ['node_modules', 'src'],
};

export const internalStyleRule = {
  test: /\.css$/,
  include: [
    path.resolve(__dirname, '../src'),
  ],
  use: [
    {
      loader: 'isomorphic-style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: isDebug,
        modules: true,
        localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
        // CSS Nano http://cssnano.co/options/
        minimize: !isDebug,
        discardComments: { removeAll: true },
      },
    },
    'postcss-loader',
  ],
};
export const externalStyleRule = {
  test: /\.css$/,
  exclude: [
    path.resolve(__dirname, '../src'),
  ],
  use: [
    {
      loader: 'isomorphic-style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDebug,
        // CSS Modules Disabled
        modules: false,
        minimize: !isDebug,
        discardComments: { removeAll: true },
      },
    },
  ],
};
export const fileRegex = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/;
export const fileName = isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]';
export const stats = {
  colors: true,
  reasons: isDebug,
  hash: isVerbose,
  version: isVerbose,
  timings: true,
  chunks: isVerbose,
  chunkModules: isVerbose,
  cached: isVerbose,
  cachedAssets: isVerbose,
};

export const getBabelLoader = ({ targets, extraPlugins = [] }) => ({
  test: /\.jsx?$/,
  loader: 'babel-loader',
  include: [
    path.resolve(__dirname, '../src'),
  ],
  query: {
    cacheDirectory: isDebug,

    babelrc: false,
    presets: [
      ['env', {
        targets,
        modules: false,
        useBuiltIns: false,
        debug: false,
      }],
      'stage-2',
      'react',
      ...isDebug ? [] : ['react-optimize'],
    ],
    plugins: [
      ...isDebug ? ['transform-react-jsx-source'] : [],
      ...isDebug ? ['transform-react-jsx-self'] : [],
      ...extraPlugins,
    ],
  },
});
