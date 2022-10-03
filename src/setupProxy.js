// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line func-names
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://opendart.fss.or.kr',
            changeOrigin: true,
        }),
    );

    app.use(
        '/accounter',
        createProxyMiddleware({
            target: 'http://54.180.19.84:8080',
            changeOrigin: true,
        }),
    );
};
