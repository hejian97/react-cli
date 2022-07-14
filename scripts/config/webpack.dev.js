const Webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const { merge } = require('webpack-merge');

const common = require('./webpack.common');
const paths = require('../paths');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  output: {
    filename: 'js/[name].js',
    path: paths.appBuild,
  },
  stats: 'errors-only',
  devServer: {
    compress: true, // 是否启用 gzip 压缩
    // host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    // port: SERVER_PORT, // 指定端口，默认是8080
    client: {
      logging: 'log',
    }, // 日志等级
    open: true, // 打开默认浏览器
    hot: true, // 热更新
    // noInfo: true,
    proxy: { ...require(paths.appProxySetup) },
  },
  plugins: [new Webpack.HotModuleReplacementPlugin(), new ErrorOverlayPlugin()],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
    chunkIds: 'named',
  },
});
