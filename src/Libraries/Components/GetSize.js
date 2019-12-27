import { Platform, StatusBar, Dimensions } from 'react-native';

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

const { width, height } = Dimensions.get('window');
let screenWidth = width,
  screenHeight = height;

module.exports = {
  statusBarHeight,
  screenWidth,
  screenHeight
};
