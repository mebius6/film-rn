import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import RootSiblings from 'react-native-root-siblings';

import {Icon, Spinner, RootToast} from './Index';

class Toast extends Component {
  constructor(props) {
    super(props);
  }

  _toast = null;
  static show(
    iconName,
    message,
    options = {
      duration: 2000,
      position: RootToast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      showText: false,
      onShow: () => {},
      onShown: () => {},
      onHide: () => {},
      onHidden: () => {},
      mask: false, //是否显示遮罩
      wrapperPointerEvents: 'auto', //pointerEvents enum('box-none', 'none', 'box-only', 'auto')
      maskStyle: null, //遮罩的样式
    },
  ) {
    let toast = {};
    //不允许自动关闭
    if (options.mask) {
      options.duration = 0;
      options.position = 0; //中间
      options.hideOnPress = false;
    }
    toast.wrapper =
      options.mask &&
      new RootSiblings(
        (<View style={[styles.contianer, options.maskStyle]} />),
      );
    let msgView = (
      <View style={styles.toast_info}>
        {iconName == 'spinner' ? (
          <Spinner size="large" />
        ) : (
          <Icon name={iconName} style={styles.toast_icon} />
        )}
        {message ? <Text style={styles.toast_text}>{message}</Text> : null}
      </View>
    );
    toast.toast = RootToast.show(msgView, options);
    return toast;
  }

  static hide(toast) {
    if (toast && toast.wrapper && toast.wrapper instanceof RootSiblings) {
      toast.wrapper.destroy();
      RootToast.hide(toast.toast);
    } else if (toast && toast.toast && toast.toast instanceof RootSiblings) {
      RootToast.hide(toast.toast);
    } else {
      // console.warn('Toast show have an error');
    }
  }

  render() {
    return null;
  }
}

var styles = StyleSheet.create({
  contianer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  toast_info: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast_icon: {
    fontSize: 36,
    color: '#FFF',
  },
  toast_text: {
    marginTop: 16,
    fontSize: 13,
    color: '#FFF',
    textAlign: 'center',
  },
});

export {RootToast};
export default Toast;
