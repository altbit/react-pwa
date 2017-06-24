const config = require('./config/config');
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const extractLess = new ExtractTextPlugin({
  filename: "styles/[name].[contenthash].css",
});

let webpackConfig = {
  entry: {
    'app': ['./src/bootstrap.js'],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'redux-thunk',
      'react-router-dom',
      'prop-types',
      'jss',
      'axios',
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
  new webpack.optimize.CommonsChunkPlugin({
    name: 'meta',
    chunks: ['vendor'],
    filename: 'js/meta.[hash].js'
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    title: config.app.appName,
    filename: 'index.html',
    template: path.join(__dirname, '/src/assets/html/index.ejs'),
    inject: true,
  }),
  extractLess,
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
          threshold: 1240,
          minRatio: 0.8,
        }),
      ],
    });
    break;

  case 'analyze':
    webpackConfig = Object.assign({}, webpackConfig, {
      cache: false,

      plugins: [
        ...webpackPlugins,
        new BundleAnalyzerPlugin({
          // Can be `server`, `static` or `disabled`.
          // In `server` mode analyzer will start HTTP server to show bundle report.
          // In `static` mode single HTML file with bundle report will be generated.
          // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file
          // by setting `generateStatsFile` to `true`.
          analyzerMode: 'server',
          // Host that will be used in `server` mode to start HTTP server.
          analyzerHost: '127.0.0.1',
          // Port that will be used in `server` mode to start HTTP server.
          analyzerPort: 8888,
          // Path to bundle report file that will be generated in `static` mode.
          // Relative to bundles output directory.
          reportFilename: 'report.html',
          // Module sizes to show in report by default.
          // Should be one of `stat`, `parsed` or `gzip`.
          // See "Definitions" section for more information.
          defaultSizes: 'parsed',
          // Automatically open report in default browser
          openAnalyzer: true,
          // If `true`, Webpack Stats JSON file will be generated in bundles output directory
          generateStatsFile: false,
          // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
          // Relative to bundles output directory.
          statsFilename: 'stats.json',
          // Options for `stats.toJson()` method.
          // For example you can exclude sources of your modules from stats file with `source: false` option.
          // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
          statsOptions: null,
          // Log level. Can be 'info', 'warn', 'error' or 'silent'.
          logLevel: 'info',
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
