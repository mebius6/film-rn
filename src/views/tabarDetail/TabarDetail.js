import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Tab, Icon, ListItem, Button} from '../../components/Index';
import Toast from '../../components/Toast';
import {AppStyle, styleMap, colorMap} from '../../styles/Index';
export default class TabarDetail extends Component {
  constructor(props) {
    super(props);
    this.tabs = ['全部', '动作片', '喜剧片', '爱情片', '国产片', '动画片'];
    this.state = {
      activeIndex: 0,
    };
  }
  onTabChange(index) {
    this.setState({
      activeIndex: index,
    });
  }
  render() {
    let {activeIndex} = this.state;

    return (
      <View>
        <Tab
          items={this.tabs}
          activeIndex={activeIndex}
          onTabChange={index => {
            this.onTabChange(index);
          }}></Tab>
      </View>
    );
  }
}
