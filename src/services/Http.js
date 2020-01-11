import Config from '../config/Config';
import axios from 'axios';
import querystring from 'querystring';
import Toast from '../components/Toast';
// 错误提示
const networkErr = '网络请求超时';

let instance = axios.create({
  timeout: 15 * 1000, // 请求超时时间设置 15s
  withCredentials: false, //  带cookie请求
  // headers: { 'Content-Type': '' }
});
// request 拦截器
instance.interceptors.request.use(
  config => {
    Toast.show('spinner');
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

// response 拦截器
instance.interceptors.response.use(
  res => {
    Toast.hide();
    return res;
  },
  err => {
    return Promise.reject(err.response.data);
  },
);

const formatData = (code, res) => {
  return new Promise((resolve, reject) => {
    if (res.status === 200) {
      let data = res.data;
      return resolve(data);
    } else {
      return reject(res.statusText);
    }
  });
};
const get = (path, params, {url = '', port = 80, code = false}) => {
  return new Promise((resolve, reject) => {
    let apiUrl = `${Config.apiUrl}:${port}${Config.apiBaseUrl}${path}`;
    if (url) {
      apiUrl = `${url}:${port}${Config.apiBaseUrl}${path}`;
    }
    return instance
      .get(apiUrl, {
        params,
      })
      .then(
        res => {
          return formatData(code, res).then(resolve, reject);
        },
        err => {
          return reject(err.msg || networkErr);
        },
      );
  });
};
const post = (
  path,
  params,
  {url = '', port = 8810, code = false, raw = false, file = false},
) => {
  return new Promise((resolve, reject) => {
    let data = params;
    let headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };

    if (file) {
      headers['Content-type'] = 'multipart/form-data';
    } else if (!raw) {
      data = querystring.stringify(params);
      headers['Content-type'] = 'application/x-www-form-urlencoded';
    }

    let apiUrl = `${Config.apiUrl}:${port}${Config.apiBaseUrl}${path}`;
    if (url) {
      apiUrl = `${url}:${port}${Config.apiBaseUrl}${path}`;
    }

    return instance
      .post(apiUrl, data, {
        headers,
      })
      .then(
        res => {
          return formatData(code, res).then(resolve, reject);
        },
        err => {
          return reject(err.msg || networkErr);
        },
      );
  });
};
module.exports = {
  get,
  post,
};
