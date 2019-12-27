import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Icon from './Font/Icon';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  // check props
  static propTypes = {
    title: PropTypes.string
  };

  // default props
  static defaultProps = { title: '搜索' };

  render() {
    const { title } = this.props;

    return (
      <View style={styles.search}>
        <View style={styles.search_before}>
          <Icon name={'search'} style={styles.search_icon} />
          <Text style={styles.search_text}>{title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  search_before: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E6E6EA'
  },
  search_icon: {
    fontSize: 20,
    color: '#B2B2B2'
  },
  search_text: {
    paddingLeft: 8,
    fontSize: 17,
    color: '#B2B2B2'
  }
});
