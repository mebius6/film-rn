// 发布版本
const version = '1.0.0';
// 发布日期
const bundleVersion = '20190426';

const loadingText = 'loading...';
// 环境设定 【dev、prod】
const environment = 'dev';

// 接口相关
const urls = {
  dev: {
    url: 'http://127.0.0.1',
    port: 5000,
  },

  prod: {
    url: 'http://film.chenzhen.work',
    port: 80,
  },
};
// 服务接口地址
const services = {
  commonBase: urls[environment],
};

module.exports = {
  bundleVersion: bundleVersion,
  version: version,
  apiUrl: 'http://192.168.1.90',
  apiBaseUrl: '/film',
  apiConfig: services,
  loadingText,
};
