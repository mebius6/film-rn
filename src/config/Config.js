// 发布版本
const version = '1.0.0';
// 发布日期
const bundleVersion = '20190426';

const loadingText = 'loading...';
// 服务接口地址
const services = {
  commonBase: {
    url: 'http://api.1156zy.chenzhen.work',
    port: 80,
  },
};

module.exports = {
  bundleVersion: bundleVersion,
  version: version,
  apiUrl: 'http://api.1156zy.chenzhen.work',
  apiBaseUrl: '',
  apiConfig: services,
  loadingText,
};
