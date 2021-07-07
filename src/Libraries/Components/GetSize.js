import {Platform, StatusBar, Dimensions} from 'react-native';

function isIphoneX() {
  let dimen = Dimensions.get('window');
  const iphoneDimen =
    dimen.height === 812 ||
    dimen.width === 812 ||
    dimen.height === 896 ||
    dimen.width === 896;
  return (
    Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && iphoneDimen
  );
}

let statusBarHeight =
  Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight;
// android version is less then 5.0.1
if (Platform.OS === 'android' && Platform.Version < 21) {
  statusBarHeight = 0;
}

const {width, height} = Dimensions.get('window');
let screenWidth = width,
  screenHeight = height;

module.exports = {
  statusBarHeight,
  screenWidth,
  screenHeight,
};
