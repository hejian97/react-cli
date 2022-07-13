const proxySettings = {
  // 代理接口1
  '/api/': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
  // 代理接口2
  '/api-2/': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathReWrite: {
      '^/api-2': '',
    },
  },
  // ...
};

module.exports = proxySettings;
