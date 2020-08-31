// 发布版本
const version = '1.0.0';
// 发布日期
const bundleVersion = '20190426';

const loadingText = 'loading...';
// 服务接口地址
const services = {
  commonBase: {
    url: 'http://192.168.1.90',
    port: 5005,
  },
};

module.exports = {
  bundleVersion: bundleVersion,
  version: version,
  apiUrl: 'http://192.168.1.90',
  apiBaseUrl: '/film',
  apiConfig: services,
  loadingText,
};
