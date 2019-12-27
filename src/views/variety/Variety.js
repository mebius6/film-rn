import React, {Component} from 'react';
import {TouchableOpacity, SafeAreaView} from 'react-native';
import {Header, Icon} from '../../components/Index';
import {AppStyle} from '../../styles/Index';
import TabarDetail from '../tabarDetail/TabarDetail';
export default class Variety extends Component {
  static navigationOptions = {
    title: '综艺',
    header: null,
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <Icon
            name={'varietyActive'}
            style={{fontSize: 24, color: tintColor}}
          />
        );
      }
      return <Icon name={'variety'} style={{fontSize: 24, color: tintColor}} />;
    },
  };
  render() {
    return (
      <SafeAreaView style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={'综艺'}
          headerRight={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}></TouchableOpacity>
          }
        />
        <TabarDetail title="综艺"></TabarDetail>
      </SafeAreaView>
    );
  }
}
