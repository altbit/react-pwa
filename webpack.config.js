const webpack = require('webpack');
const path = require('path');
const args = require('minimist')(process.argv.slice(2));

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

let env = args.env ?
  args.env :
  (process.env.NODE_ENV ?
    process.env.NODE_ENV :
    'dev'
  );

const extractLess = new ExtractTextPlugin({
  filename: "styles/[name].[contenthash].css"
});

const globalConfig = require('./config/global.json');
const envConfig = require(`./config/env.${env}.json`);
const localConfig = env === 'dev' ? require('./config/local.json') : null;

let webpackConfig = {
  entry: {
    'app': ['./src/appBootstrap.js'],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk'
    ]
  },

  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        }),
      },
      {
        test: /\.(png|svg|gif)$/,
        exclude: /fonts/,
        loaders: [
          'file-loader?name=images/[name].[ext]',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)/,
        exclude: /images/,
        loaders: [
          'file-loader?name=fonts/[name].[ext]',
        ],
      },
    ],
  },

  externals: {
    Config: JSON.stringify(Object.assign(
      {},
      globalConfig,
      envConfig,
      localConfig
    )),
  },

  devtool: 'source-map',
};

const webpackPlugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.[chunkhash].js',
    minChunks: Infinity
  }),
  new webpack.optimize.CommonsChunkPlugin({ name: 'meta', chunks: ['vendor'], filename: 'js/meta.[hash].js' }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    title: 'React Progressive Web App',
    filename: 'index.html',
    template: path.join(__dirname, '/src/assets/html/index.ejs'),
    inject: true
  }),
  extractLess,
  new ModernizrWebpackPlugin({
    options: ['setClasses'],
    'feature-detects': ['svg'],
    filename: 'js/modernizr.js',
  })
];

switch (env) {
  case 'production':
    webpackConfig = Object.assign({}, webpackConfig, {
      cache: false,

      plugins: [
        ...webpackPlugins,
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"',
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false },
          comments: false,
          mangle: false,
          minimize: true
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ],
    });
    break;
  default:
    webpackConfig = Object.assign({}, webpackConfig, {
      cache: true,

      devServer: {
        contentBase: './public/',
        inline: true,
        historyApiFallback: true,
        noInfo: false,
      },

      plugins: webpackPlugins,
    });
}

module.exports = webpackConfig;
