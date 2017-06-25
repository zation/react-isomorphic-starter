import path from 'path';

const { env: { NODE_ENV }, argv } = process;

export const isDev = NODE_ENV !== 'production';
export const isVerbose = argv.includes('--verbose');

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
        sourceMap: isDev,
        modules: true,
        localIdentName: isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
        // CSS Nano http://cssnano.co/options/
        minimize: !isDev,
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
        sourceMap: isDev,
        // CSS Modules Disabled
        modules: false,
        minimize: !isDev,
        discardComments: { removeAll: true },
      },
    },
  ],
};
export const fileRegex = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/;
export const fileName = isDev ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]';
export const stats = {
  colors: true,
  reasons: isDev,
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
    cacheDirectory: isDev,

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
      ...isDev ? [] : ['react-optimize'],
    ],
    plugins: [
      ...isDev ? ['transform-react-jsx-source', 'transform-react-jsx-self'] : [],
      ...extraPlugins,
    ],
  },
});
