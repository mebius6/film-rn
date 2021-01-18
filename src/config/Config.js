// 发布版本
const version = '1.0.0';
// 发布日期
const bundleVersion = '20190426';

const loadingText = 'loading...';
// 服务接口地址
const services = {
  commonBase: {
    url: 'http://film.chenzhen.work',
    port: 80,
  },
};

module.exports = {
  bundleVersion: bundleVersion,
  version: version,
  apiUrl: 'http://film.chenzhen.work',
  apiBaseUrl: '/film',
  apiConfig: services,
  loadingText,
};
