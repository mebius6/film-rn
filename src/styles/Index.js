import {
  AppStyle,
  styleMap,
  colorMap,
  screenWidth,
  screenHeight,
  statusBarHeight
} from './AppStyle';
import headerStyle from './Header';

Object.assign(AppStyle, headerStyle);

module.exports = {
  AppStyle,
  styleMap,
  colorMap,
  screenWidth,
  screenHeight,
  statusBarHeight
};
