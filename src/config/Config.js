import {Platform} from 'react-native';

// 程序版本
const bundleVersion = '20180309';

// 环境设定 本地开发、正式环境
let environment = 'local';
const environments = ['local', 'online'];

// 数据接口
const apiUrl = {
  local: 'http://api.film.chenzhen.work',
  online: 'http://api.film.chenzhen.work',
};

// 热更新
const codepush = {
  ios: {
    local: '',
    online: '',
  },
  android: {
    local: '',
    online: '',
  },
};

const Config = {
  bundleVersion,
  environment,
  url: apiUrl[environment],
  codepushKey: codepush[Platform.OS][environment],
};

module.exports = Config;
