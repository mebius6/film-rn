import React from 'react';
import { TouchableHighlight, StyleSheet, Text } from 'react-native';

export default function AudioVideoSwither(props) {
  const { title = '音频', onSwitch } = props;
  return (
    <TouchableHighlight
      underlayColor="transparent"
      style={styles.container}
      onPress={() => onSwitch && onSwitch()}>
      <Text style={styles.button}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 26,
    top: 20,
    right: 20,
    position: 'absolute',
    backgroundColor: 'rgba(178, 178, 178, 0.4)',
    alignItems: 'center',
    borderRadius: 4,
    zIndex: 100,
  },
  button: {
    color: '#333',
    fontSize: 14,
    lineHeight: 26,
  },
});
