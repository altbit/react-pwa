const config = require('./config/config');
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "styles/[name].[contenthash].css",
});

let webpackConfig = {
  entry: {
    'app': ['./src/bootstrap.js'],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router-dom',
      'prop-types',
      'material-ui/Progress',
    ],
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
              loader: "css-loader",
            },
            {
              loader: "less-loader",
            },
          ],
          // use style-loader in development
          fallback: "style-loader",
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
    AppConfig: JSON.stringify(config.app),
  },

  devtool: 'source-map',
};

const webpackPlugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.ProvidePlugin({
    'React': 'react',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.[chunkhash].js',
    minChunks: Infinity,
  }),
  new webpack.optimize.CommonsChunkPlugin({ name: 'meta', chunks: ['vendor'], filename: 'js/meta.[hash].js' }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    title: config.app.appName,
    filename: 'index.html',
    template: path.join(__dirname, '/src/assets/html/index.ejs'),
    inject: true,
  }),
  extractLess,
  new ModernizrWebpackPlugin({
    options: ['setClasses'],
    'feature-detects': ['svg'],
    filename: 'js/modernizr.js',
  }),
  new CopyWebpackPlugin([
    {
      from: path.join(__dirname, '/src/assets/html/.htaccess'),
      to: path.join(__dirname, '/public/'),
    },
  ], {
    ignore: [
      '*.ejs',
    ],
  }),
];

switch (config.env) {
  case 'production':
    webpackConfig = Object.assign({}, webpackConfig, {
      cache: false,

      plugins: [
        ...webpackPlugins,
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production'),
          },
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          comments: false,
          compress: {
            sequences     : true,
            booleans      : true,
            loops         : true,
            unused      : true,
            warnings    : false,
            drop_console: true,
            unsafe      : true,
          },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.(js|html|css)$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      ],
    });
    break;
  default:
    webpackConfig = Object.assign({}, webpackConfig, {
      cache: true,

      devServer: {
        contentBase: path.join(__dirname, "public"),
        port: 9000,
        inline: true,
        historyApiFallback: true,
        noInfo: false,
      },

      plugins: webpackPlugins,
    });
}

module.exports = webpackConfig;
