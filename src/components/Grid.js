import React, {Component} from 'react';
import {View, TouchableHighlight, StyleSheet, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {
  screenWidth,
  screenHeight,
  statusBarHeight,
  headerHeight,
  bottomHeight,
  tabBarHeight,
} from '../styles/Index';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.defaultImgWidth = screenWidth / this.props.columns;
    this.defaultImgHeight =
      (screenHeight - headerHeight - statusBarHeight - bottomHeight - 8) /
      this.props.columns;
    this.state = {
      width: this.props.width || this.defaultImgWidth,
      height: this.props.height || this.defaultImgHeight,
    };
  }
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    imgPath: PropTypes.string, //图片地址
    title: PropTypes.string, //显示内容
    columns: PropTypes.number, //每列显示个数
    height: PropTypes.number,
    width: PropTypes.number,
    isShowHeader: PropTypes.bool,
    index: PropTypes.number,
  };
  static defaultProps = {
    style: {},
    columns: 3,
    index: 0,
    height: this.defaultImgHeight,
    width: this.defaultImgWidth,
  };
  componentDidMount() {
    const {isShowHeader} = this.props;

    if (isShowHeader) {
      let {height} = this.state;
      height =
        (screenHeight -
          statusBarHeight -
          bottomHeight -
          headerHeight -
          tabBarHeight -
          22) /
        this.props.columns;
      this.setState({
        height,
      });
    }
  }
  gridChange(index) {
    this.props.onGridChange && this.props.onGridChange(index);
  }
  render() {
    const {imgPath, title, style, index} = this.props;
    let {height, width} = this.state;
    return (
      <View style={[styles.container, style]}>
        <TouchableHighlight onPress={() => this.gridChange(index)}>
          <View>
            <Image
              source={{uri: imgPath}}
              style={{height: height - 18, width: width - 10}}
              resizeMethod="resize"
            />
            <Text style={styles.gridItem}>{title}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  gridItem: {
    textAlign: 'center',
  },
});
