import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Icon, ListItem, Button} from '../../components/Index';
import {AppStyle, styleMap, colorMap} from '../../styles/Index';
export default class TabarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}
