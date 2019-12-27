import React, {Component} from 'react';
import {TouchableOpacity, SafeAreaView} from 'react-native';
import {Header, Icon} from '../../components/Index';
import {AppStyle} from '../../styles/Index';
import TabarDetail from '../tabarDetail/TabarDetail';
export default class Anime extends Component {
  static navigationOptions = {
    title: '动漫',
    header: null,
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <Icon name={'animeActive'} style={{fontSize: 24, color: tintColor}} />
        );
      }
      return <Icon name={'anime'} style={{fontSize: 24, color: tintColor}} />;
    },
  };
  render() {
    return (
      <SafeAreaView style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={'动漫'}
          headerRight={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}></TouchableOpacity>
          }
        />
        <TabarDetail title="动漫"></TabarDetail>
      </SafeAreaView>
    );
  }
}
