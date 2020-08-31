import http from '../services/Http';
import parse from '../services/parse.js';

import Config from '../config/Config';
// 请求第三方资源
const services = Config.apiConfig.commonBase;
const services1 = {
  url: 'http://192.168.1.90',
  port: 5005,
};
let api = {
  /********************* www.1156zy.com api *****************/

  // 列表查询
  getList: params => {
    return new Promise((resolve, reject) => {
      http.get('', params, services).then(
        res => {
          return resolve(parse.parseListHtml(res));
        },
        err => {
          reject(err);
        },
      );
    });
  },
  // 列表搜索
  searchList: params => {
    return new Promise((resolve, reject) => {
      http.get('?m=vod-search', params, services).then(
        res => {
          return resolve(parse.parseListHtml(res).body);
        },
        err => {
          reject(err);
        },
      );
    });
  },
  getListItem: params => {
    return new Promise((resolve, reject) => {
      http.get('', params, services).then(
        res => {
          return resolve(parse.parseItemHtml(res));
        },
        err => {
          reject(err);
        },
      );
    });
  },
  /********************* www.245bt.com api *****************/
  // 获得tabs列表
  get245BtHeader: params => {
    return new Promise((resolve, reject) => {
      return http.get('/getHeader', params, services1).then(
        res => {
          // return resolve(parse.parse245BtHeader(res));
          return resolve(res);
        },
        err => {
          reject(err);
        },
      );
    });
  },
  // 根据tab 拉取list
  get245BtTabData: params => {
    return new Promise((resolve, reject) => {
      http.get('/getList', params, services1).then(
        res => {
          // return resolve(parse.parse245BtListHtml(res));
          return resolve(res);
        },
        err => {
          reject(err);
        },
      );
    });
  },
  // 获得明细详情
  get245BtListItem: params => {
    return new Promise((resolve, reject) => {
      http.get('/getListItem', params, services1).then(
        res => {
          // return resolve(parse.parse245BtItemHtml(res));
          return resolve(res);
        },
        err => {
          reject(err);
        },
      );
    });
  },
  // 解析视频url
  get245BtPlayerUrl: params => {
    return new Promise((resolve, reject) => {
      http.get('/parsePlayerUrl', params, services1).then(
        res => {
          // return resolve(parse.parser245BtPlayerUrl(res));
          return resolve(res);
        },
        err => {
          reject(err);
        },
      );
    });
  },
  // 模糊搜索
  search245BtBykeywords: params => {
    return new Promise((resolve, reject) => {
      // console.warn(['params', params]);
      http.get('/searchListBywords', params, services1).then(
        res => {
          // return resolve(parse.parse245BtSearchList(res));
          return resolve(res);
        },
        err => {
          reject(err);
        },
      );
    });
  },
};
module.exports = api;
