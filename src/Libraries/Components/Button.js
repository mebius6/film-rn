import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  // check props
  static propTypes = {
    style: PropTypes.style,
    color: PropTypes.string,
    borderColor: PropTypes.string,
    fontSize: PropTypes.number,
    disabled: PropTypes.bool,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  };

  // default props
  static defaultProps = {
    type: 'normal',
    title: '',
    color: '#FFFFFF',
    //borderColor: '#FFFFFF',
    fontSize: 18,
    disabled: false,
    onPress: null,
  };

  render() {
    const {
      style,
      type,
      color,
      borderColor,
      fontSize,
      disabled,
      title,
      onPress,
    } = this.props;

    const buttonStyles = [styles.button];
    const textStyles = [];

    if (type === 'normal') {
      buttonStyles.push({
        backgroundColor: '#5775BB',
        borderColor: '#5775BB',
      });
    }
    if (type === 'danger') {
      buttonStyles.push({
        backgroundColor: '#E94F4F',
        borderColor: '#E94F4F',
      });
    }
    if (type === 'white') {
      buttonStyles.push({
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
      });
    }

    if (color) {
      textStyles.push({color: color});
    }
    if (borderColor) {
      buttonStyles.push({borderColor});
    }
    if (fontSize) {
      textStyles.push({fontSize});
    }
    if (style) {
      buttonStyles.push(style);
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        disabled={disabled}
        onPress={onPress}>
        <Text style={textStyles}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
});
