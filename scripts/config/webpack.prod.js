const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const common = require('./webpack.common');
const paths = require('../paths');
const { shouldOpenAnalyzer, ANALYZER_HOST, ANALYZER_PORT } = require('../conf');

module.exports = merge(common, {
  mode: 'production',
  target: 'browserslist',
  output: {
    filename: 'js[name].[contenthash:8].js',
    path: paths.appBuild,
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    shouldOpenAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: ANALYZER_HOST,
        analyzerPort: ANALYZER_PORT,
      }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${paths.appSrc}/**/*.{tsx,scss,less,css}`, {
        nodir: true,
      }),
    }),
    new webpack.BannerPlugin({
      raw: true,
      banner: '/** @preserve Powered by react-cli (https://github.com/hejian97/react-cli) */',
    }),
  ].filter(Boolean),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        },
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
    chunkIds: 'deterministic',
  },
});
