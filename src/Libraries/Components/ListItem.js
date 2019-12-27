import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  // check props
  static propTypes = {
    style: PropTypes.style,
    showBorder: PropTypes.bool,
    left: PropTypes.element,
    center: PropTypes.element,
    right: PropTypes.element,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
  };

  // default props
  static defaultProps = {
    style: null,
    disabled: false,
    showBorder: false,
    onPress: null,
  };

  render() {
    const {
      style,
      showBorder,
      left,
      center,
      right,
      disabled,
      onPress,
    } = this.props;

    let itemStyles = [styles.item];

    if (style) {
      itemStyles.push(style);
    }

    if (showBorder) {
      itemStyles.push(styles.item_border);
    }

    return (
      <TouchableOpacity
        style={itemStyles}
        disabled={disabled}
        onPress={onPress}>
        <View style={styles.item_left}>{left}</View>
        <View style={styles.item_center}>{center}</View>
        <View style={styles.item_right}>{right}</View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  item_border: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  item_left: {
    marginRight: 10,
  },
  item_center: {
    flex: 1,
  },
  item_right: {},
});
