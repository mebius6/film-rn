import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, StyleSheet, screenWidth} from 'react-native';
import {Icon} from '../components/Index';
import {AppStyle, colorMap} from '../styles/Index';
export default class Result extends Component {
  static propTypes = {
    iconName: PropTypes.string,
    showIcon: PropTypes.bool,
    imgUrl: PropTypes.string,
    img: PropTypes.element,
    title: PropTypes.string,
  };

  static defaultProps = {
    iconName: 'warn',
    showIcon: true,
    imgUrl: '',
    title: '没有更多影片了',
  };

  render() {
    const {iconName, showIcon, imgUrl, img, title} = this.props;
    return (
      <View style={[AppStyle.container, AppStyle.center]}>
        <View style={[AppStyle.flex1, AppStyle.row, {alignItems: 'center'}]}>
          {showIcon ? (
            <Icon name={iconName} style={styles.iconStyle}></Icon>
          ) : null}
          {!showIcon ? (
            imgUrl ? (
              <Image source={{uri: imgUrl}} style={styles.resultImage}></Image>
            ) : (
              img
            )
          ) : null}
          <Text>{title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 24,
    color: colorMap.yellow[0],
  },
  resultImage: {
    width: screenWidth / 3,
    height: (screenWidth / 3) * 1.2,
  },
});
