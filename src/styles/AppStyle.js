import {StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';

import LibStyle from '../Libraries/utils/LibStyle';
import {colorMap, fontList, sizeList} from '../config/Basic';

// 获取屏幕宽高
const {height, width} = Dimensions.get('window');
const screenWidth = width,
  screenHeight = height,
  headerHeight = 44,
  bottomHeight = 49,
  tabBarHeight = 49;

// 获取状态栏高度
function isIphoneX() {
  // 375 812
  let dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimen.height === 812 && dimen.width === 375) ||
      (dimen.width === 812 && dimen.height === 375))
  );
}
let statusBarHeight =
  Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight;
// android version is less then 5.0.1
if (Platform.OS === 'android' && Platform.Version < 21) {
  statusBarHeight = 0;
}

/* 使用方法
 * styles.color_[name][index] 字体颜色
 * styles.bjColor_[name][index] 背景颜色
 * styles.bdColor_[name][index] 边框颜色
 * styles.font_s[size] 字体大小
 * styles.padding_[t,r,b,l,v,h][size] 内边距
 * styles.margin_[t,r,b,l,v,h][size]  外边距
 *
 */
const styleMap = {
  //颜色 背景色 边框色
  ...(function() {
    let color = {},
      bdColor = {},
      bjColor = {};
    for (let name in colorMap) {
      let colorName = colorMap[name];
      for (let index in colorName) {
        color['color_' + name + index] = {color: colorName[index]};
        bdColor['bdColor_' + name + index] = {borderColor: colorName[index]};
        bjColor['bjColor_' + name + index] = {
          backgroundColor: colorName[index],
        };
      }
    }
    return {
      ...color,
      ...bdColor,
      ...bjColor,
    };
  })(),
  //字体大小
  ...(function() {
    let font = {};
    for (let i = 0; i < fontList.length; i++) {
      let value = fontList[i];
      font['font_s' + value] = {
        fontSize: value,
      };
    }
    return {
      ...font,
    };
  })(),
  //边距
  ...(function() {
    var padding = {},
      margin = {},
      typeList = ['', '_t', '_r', '_b', '_l', '_v', '_h'],
      typeName = [
        '',
        'Top',
        'Right',
        'Bottom',
        'Left',
        'Vertical',
        'Horizontal',
      ];
    for (let i = 0; i < sizeList.length; i++) {
      let value = sizeList[i];
      for (let j = 0; j < typeList.length; j++) {
        let type = typeList[j],
          name = typeName[j];
        padding['padding' + type + value] = {['padding' + name]: value};
        margin['margin' + type + value] = {['margin' + name]: value};
      }
    }
    return {
      ...padding,
      ...margin,
    };
  })(),
};

const AppStyle = StyleSheet.create(styleMap);
Object.assign(AppStyle, LibStyle);

module.exports = {
  styleMap,
  colorMap,
  AppStyle,
  screenWidth,
  screenHeight,
  statusBarHeight,
  headerHeight,
  bottomHeight,
  tabBarHeight,
};
