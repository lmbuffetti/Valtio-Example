process.env.NODE_ENV = process.argv[process.argv.length - 1];
process.env.BABEL_ENV = process.argv[process.argv.length - 1];
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')

// const devMode = false;
const ROOT_DIR = path.resolve(__dirname, './');
const BUILD_DIR = path.join(ROOT_DIR, './dist');
const devMode = process.argv[process.argv.length - 1] === 'development';
const getEnvBuild = process.argv[process.argv.length - 3];

const PATHS = {
  src: path.join(__dirname, 'src')
}

const clientConfig = {
  mode: 'development',
  devtool: devMode ? 'inline-source-map' : 'cheap-source-map',
  entry: {
    polyfill: '@babel/polyfill',
    main: [
      './src/index.jsx',
      './src/assets/style/general/main.scss',
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: !devMode,
    port: 5000,
    historyApiFallback: true,
    open: devMode,
  },
  output: {
    publicPath: '/',
    path: BUILD_DIR,
    filename: 'js/[name].bundle.js',
    chunkFilename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    hotUpdateChunkFilename: devMode ? 'hot/hot-update.js' : 'hot/hot-update.[chunkhash].js',
    hotUpdateMainFilename: devMode ? 'hot/hot-update.json' : 'hot/hot-update.[chunkhash].js',
    globalObject: 'this',
  },
  stats: {
    assets: false,
    chunks: false,
    modules: false,
    outputPath: false,
    publicPath: false,
    errors: true,
    warnings: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode,
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
              sourceMap: devMode,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: !devMode,
              failOnWarning: !devMode,
              emitWarning: true,
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[fullhash].[ext]',
            outputPath: 'fonts/',

          },
        }],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'file-loader?name=images/[name].[ext]',
          options: {
            esModule: false,
          },
        }],
      },
      {
        type: 'javascript/auto',
        exclude: /(node_modules|bower_components|public)/,
        test: /\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'json/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'css/[name].css' : 'css/[name].[fullhash].css',
      chunkFilename: devMode ? 'css/[name]_[id].css' : 'css/[name]_[id].[chunkhash].css',
    }),
    new CleanWebpackPlugin({
      dry: false,
      verbose: false,
      cleanOnceBeforeBuildPatterns: ['*', '!manifest.json'],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: './public/favicon.ico', to: './' },
        { from: './public/favicon.ico', to: './' },
      ],
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      hash: true,
      inject: true,
      filename: './index.html',
      template: './public/index.html',
      title: 'Valtio Website',
      meta: {
        keywords: '',
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      googleAnalyticsId: '',
      facebookPixelId: '',
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(devMode ? 'development' : 'production'),
      'process.env': {
        NODE_ENV: JSON.stringify(devMode ? 'development' : 'production'),
      },
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    nodeEnv: devMode ? 'development' : 'production',
    minimize: !devMode,
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
    },
  },
};

module.exports = [clientConfig];
