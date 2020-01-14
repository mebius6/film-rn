import {StyleSheet} from 'react-native';

import {styleMap} from './AppStyle';

export default StyleSheet.create({
  header_btn: {
    alignItems: 'center',
  },
  header_btn_left: {
    //...styleMap.bjColor_red1,
    paddingLeft: 12,
    paddingRight: 5,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_btn_right: {
    //...styleMap.bjColor_red1,
    paddingRight: 12,
    paddingLeft: 5,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_btn_icon: {
    fontSize: 21,
    ...styleMap.color_white0,
    //...styleMap.bjColor_green0
  },
  header_btn_text: {
    fontSize: 15,
    ...styleMap.color_white0,
  },
});
