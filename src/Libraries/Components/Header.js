import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  // check props
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    leftStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    rightStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    title: PropTypes.string,
    showTitle: PropTypes.bool,
    headerLeft: PropTypes.element,
    headerCenter: PropTypes.element,
    headerRight: PropTypes.element,
    showStatusBar: PropTypes.bool,
    statusBarStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    barStyle: PropTypes.string,
    hidden: PropTypes.bool,
  };

  // default props
  static defaultProps = {
    style: {backgroundColor: 'transparent'},
    showStatusBar: true,
    headerStyle: {backgroundColor: '#597AEE'},
    statusBarStyle: {backgroundColor: '#597AEE'},
    barStyle: 'light-content',
    title: '',
    showTitle: true,
    hidden: false,
  };
  // iPhone X、iPhone XS: 375 812
  // iPhone XR、iPhone XS Max: 414 896
  isIphoneX() {
    let dimen = Dimensions.get('window');
    const iphoneDimen =
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896;
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      iphoneDimen
    );
  }

  statusBarHeight() {
    let height =
      Platform.OS === 'ios'
        ? this.isIphoneX()
          ? 48
          : 20
        : StatusBar.currentHeight;
    if (Platform.OS === 'android' && Platform.Version < 21) {
      height = 0;
    }
    return height;
  }
  render() {
    const {
      style,
      headerStyle,
      leftStyle,
      rightStyle,
      showStatusBar,
      statusBarStyle,
      barStyle,
      title,
      hidden,
      showTitle,
      headerLeft,
      headerCenter,
      headerRight,
    } = this.props;
    const barViewStyle = [
      {height: showStatusBar ? this.statusBarHeight() : 0},
      statusBarStyle,
    ];
    return (
      <View style={style}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
          hidden={Platform.OS === 'ios' ? true : hidden}
          showHideTransition={'fade'}
          barStyle={barStyle}
        />
        <View style={barViewStyle} />
        <View style={[styles.header, styles.row, headerStyle]}>
          <View style={[styles.headerLeft, styles.row, leftStyle]}>
            {headerLeft}
          </View>
          {showTitle ? (
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          ) : (
            <View style={styles.headerCenter}>{headerCenter}</View>
          )}
          <View style={[styles.headerRight, styles.row, rightStyle]}>
            {headerRight}
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal: 12
  },
  headerLeft: {
    justifyContent: 'flex-start',
  },
  headerCenter: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  headerRight: {
    justifyContent: 'flex-end',
  },
});
