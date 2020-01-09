import cheerio from 'cheerio';
import querystring from 'querystring';
import unit from './unit';
let parse = {
  /********************* www.1156zy.com api *****************/
  parseListHtml: data => {
    let $ = cheerio.load(data, {
      ignoreWhitespace: true,
      xmlMode: true,
    });
    let header = $('#sddm').children('li');

    let headerData = [];
    header.each((i, v) => {
      let a = $(v)
        .find('a')
        .get(0);
      let slideDown = [];
      let slide = [];
      if ($(v).children(`#m${i}`).length) {
        slideDown = $(v)
          .children(`#m${i}`)
          .children('a');
        slideDown.each((index, item) => {
          let href = $(item).attr('href');
          let params = {};
          if (href.indexOf('https') < 0) {
            params = querystring.parse(href.substr(2));
            let obj = {
              content: $(item).text(),
            };
            if (Object.keys(params).length) {
              obj.params = params;
            }
            slide.push(obj);
          }
        });
      }
      let href = $(a).attr('href');
      let params = {};
      // 过滤网址链接和插件链接
      if (href.indexOf('https') < 0 && href.indexOf('art') < 0) {
        params = querystring.parse(href.substr(2));
        let obj = {
          content: $(a).text(),
          slide,
        };
        if (Object.keys(params).length) {
          obj.params = params;
        }
        headerData.push(obj);
      }
    });
    let body = $('.xing_vb').find('li');
    let bodyData = [];
    body.each((index, item) => {
      if (index !== 0 && index !== body.length - 1) {
        let span = $(item).find('span');
        let content = '';
        let params = {};
        let a = $(span)
          .eq(1)
          .find('a');
        if (a) {
          content = $(a).text();
          let href = $(a).attr('href');
          if (href && href.indexOf('https') < 0) {
            params = querystring.parse(href.substr(2));
          }
        }
        let sort = $(span)
          .eq(2)
          .text();
        let time = $(span)
          .eq(3)
          .text();
        let obj = {
          content,
          params,
          sort,
          time,
        };
        bodyData.push(obj);
      }
    });
    return {
      header: headerData,
      body: bodyData,
    };
  },
  parseItemHtml: res => {
    let $ = cheerio.load(res, {
      ignoreWhitespace: true,
      xmlMode: true,
    });
    let data = {
      title: [],
      list: [],
    };
    let vodImg = $('.warp .vodImg').find('img');
    let vodInfo = $('.warp .vodInfo .vodinfobox ul').children('li');
    data.title.push({pic: vodImg.attr('src')});
    vodInfo.each((index, item) => {
      let text = `${$(item).text()} ${$(item)
        .find('span')
        .text()}`;
      if (text.trim().length) {
        data.title.push({text});
      }
    });
    let movies = $('.vodplayinfo:last-child').find('ul');

    // uls
    movies.each((index, item) => {
      //ul
      let list = [];
      let lis = $(item).children('li');
      lis.each((i, v) => {
        let text = $(v)
          .text()
          .split('$');
        list.push({
          text: text[0],
          path: text[1],
        });
      });
      data.list.push(list);
    });
    return data;
  },
  /********************* www.245bt.com api *****************/
  parse245BtHeader: data => {
    let $ = cheerio.load(data, {
      ignoreWhitespace: true,
      xmlMode: true,
    });
    let header = $('.stui-header__menu').children('li');
    let headerData = [];
    header.each((i, v) => {
      let a = $(v)
        .find('a')
        .get(0);
      if ($(v).children(`#m${i}`).length) {
        slideDown = $(v)
          .children(`#m${i}`)
          .children('a');
        slideDown.each((index, item) => {
          let href = $(item).attr('href');
          let params = {};
          if (href.indexOf('https') < 0) {
            params = querystring.parse(href.substr(2));
            let obj = {
              content: $(item).text(),
            };
            if (Object.keys(params).length) {
              obj.params = params;
            }
            slide.push(obj);
          }
        });
      }
      let href = $(a).attr('href');
      let content = $(a)
        .text()
        .trim();
      if (content !== '首页' && content !== '专题' && content !== '分类') {
        headerData.push({
          title: content,
          path: href,
        });
      }
    });
    return headerData;
  },
  parse245BtListHtml: data => {
    let $ = cheerio.load(data, {
      ignoreWhitespace: true,
      xmlMode: true,
    });
    let listTabsDom = $('.stui-screen__list').find('a');
    let listBodyDom = $('.stui-pannel_bd .stui-vodlist').children('li');
    let tabs = [];
    let body = [];
    listTabsDom.each((i, v) => {
      let a = $(v).get(0);
      if (a) {
        tabs.push({
          title: $(a)
            .text()
            .trim(),
          path: $(a).attr('href'),
        });
      }
    });
    listBodyDom.each((i, v) => {
      let a = $(v)
        .find('a')
        .get(0);
      let titleDom = $(v)
        .find('.stui-vodlist__detail h4 a')
        .get(0);
      if (a) {
        let path = $(a).attr('href');
        let imgPath = $(a).attr('data-original');
        let title = $(titleDom)
          .text()
          .trim();
        body.push({
          title,
          path,
          imgPath,
        });
      }
    });
    return {
      tabs,
      body,
    };
  },
  parse245BtItemHtml: data => {
    let $ = cheerio.load(data, {
      ignoreWhitespace: true,
      xmlMode: true,
    });
    let datas = {};
    let imgPath = $('.picture')
      .find('img')
      .attr('data-original');
    let detailDom = $('.stui-content__detail');
    datas.imgPath = imgPath;
    datas.author = detailDom
      .find('.title')
      .text()
      .trim();
    // 影片介绍
    let dataDom = $('.stui-content__detail').children('.data');
    let header = [];
    dataDom.each((i, v) => {
      if (i === 0) {
        let labelArr = $(v)
          .find('.text-muted')
          .map((i, el) =>
            $(el)
              .text()
              .trim(),
          );
        let valueArr = $(v)
          .find('a')
          .map((i, el) =>
            $(el)
              .text()
              .trim(),
          );
        for (let index = 0; index < labelArr.length; index++) {
          const item = labelArr[index];
          for (let j = 0; j < valueArr.length; j++) {
            const jItem = valueArr[j];
            if (index === j) {
              header.push({label: item, value: jItem});
            }
          }
        }
      } else {
        let label = $(v)
          .find('.text-muted')
          .text()
          .trim();
        let value = $(v)
          .text()
          .trim();
        if (value.indexOf('：') > -1) {
          value = value.split('：')[1];
        }
        header.push({
          label,
          value,
        });
      }
    });
    let descDom = $('.stui-content__detail').find('.desc');

    // 剧情简介
    let desc = [];
    desc.push({
      label: descDom.find('.text-muted').text(),
      value: descDom.find('.detail-sketch').text(),
    });
    // 剧集列表
    let bodyDom = $('.container ').find('.stui-pannel');
    let body = [];
    bodyDom.each((i, v) => {
      if (i < bodyDom.length - 1) {
        let dom = $(v).find('.stui-pannel_hd');
        let listDoms = $(v).find('.col-pd');
        let source = dom
          .find('.stui-pannel__head .title')
          .text()
          .trim();
        let listDom = listDoms.find('li');
        if (listDom.length) {
          let list = [];
          listDom.each((index, item) => {
            let urlDom = $(item).find('a');
            list.push({
              path: urlDom.attr('href'),
              title: urlDom.text().trim(),
            });
          });

          body.push({
            source,
            list: list.filter(k => k.path && k.title),
          });
        }
      }
    });

    datas.header = unit.objectArrayReduce(header, 'label');

    datas.body = body.filter((item, index) => index !== body.length - 1);
    datas.desc = desc.filter(v => v.label && v.value);

    return datas;
  },
  parser245BtPlayerUrl: data => {
    // player
    let $ = cheerio.load(data, {
      ignoreWhitespace: true,
      xmlMode: true,
    });
    let iframe = $('#cciframe');
    /**
     * "var vid="72304";
     * var vfrom="0";
     * var vpart="0";
     * var now=unescape("https%3A%2F%2Fiqiyi.com-qqcdn.com%2Fshare%2Facf666483bc8723fae7feda6f6a9cb7a");
     * var pn="yunbo";
     * var next=unescape("");
     * var prePage="/play/72304-0-0.html";
     * var nextPage="/play/72304-0-0.html";"
     */
    let playerUrlArr = iframe.prev()[0].children[0].data.split(';');
    let playerUrlItem = (playerUrlArr || []).find(v => v.indexOf('now') > -1);
    let playerUrl = '';
    try {
      playerUrl = playerUrlItem.match(/unescape\("(\S*)"\)/)[1];

      playerUrl = decodeURIComponent(playerUrl);
    } catch (error) {}
    return {
      url: playerUrl,
    };
  },
  /**
   * @returns : [
    {
      imgPath: '',
      title: '',
      desc: [
        {
          title: ''
        }
      ],
      btn: [
        {
          title: '',
          path: ''
        }
      ]
    }
  ],
   */

  parse245BtSearchList: data => {
    let $ = cheerio.load(data, {
      ignoreWhitespace: true,
      xmlMode: true,
    });
    let searchDom = $(
      '.col-lg-wide-75 .stui-pannel-box .stui-pannel_bd .stui-vodlist__media',
    ).children('li');
    let searchList = [];
    searchDom.each((i, v) => {
      let thumbDom = $(v).find('.stui-vodlist__thumb');
      let imgPath = thumbDom.attr('data-original');
      let title = thumbDom.attr('title');
      let descDom = $(v).find('p');
      let desc = [];
      let btn = [];
      descDom.each((index, item) => {
        let obj = {};
        if (index !== descDom.length - 1) {
          obj.title = $(item).text();
        } else {
          let primaryBtn = $(item).find('.btn-primary');
          let defaultBtn = $(item).find('.btn-default');
          btn = [
            {
              title: primaryBtn.text(),
              path: primaryBtn.attr('href'),
            },
            {
              title: defaultBtn.text(),
              path: defaultBtn.attr('href'),
            },
          ];
        }
        desc.push(obj);
      });
      searchList.push({
        imgPath,
        title,
        desc,
        btn,
      });
    });
    return searchList;
  },
};

module.exports = parse;
