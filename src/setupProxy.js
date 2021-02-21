const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  const proxy = createProxyMiddleware({target: process.env.BACKEND_URL || 'http://127.0.0.1:5000'});
  app.use('/api', proxy);
  app.use('/auth', proxy);
};
