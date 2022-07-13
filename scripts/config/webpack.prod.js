const webpack = require('webpack');
const { merge } = require('webpack-merge');
// eslint-disable-next-line unicorn/import-style
const { resolve } = require('path');
const glob = require('glob');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// eslint-disable-next-line import/extensions
const common = require('./webpack.common.js');
const { PROJECT_PATH } = require('../constants');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
    }),
    new webpack.BannerPlugin({
      raw: true,
      banner: '/** @preserve Powered by react-cli (https://github.com/hejian97/react-cli) */',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: '8888',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        },
      }),
      new OptimizeCssAssetsPlugin(),
    ].filter(Boolean),
  },
});
