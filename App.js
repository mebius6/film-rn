import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

//pages
import {TabNav, Pages} from './src/views/Views';

// 底部菜单路由
const tabNavigatorAttr = {
  initialRouteName: 'Film',
  tabBarComponent: BottomTabBar,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    inactiveTintColor: '#808080',
    activeTintColor: '#597AEE',
    showIcon: true,
    labelStyle: {
      fontSize: 10,
    },
  },
};
const MainTabNavigator = createBottomTabNavigator(TabNav, tabNavigatorAttr);
// 程序主路由
const MainNavigator = createStackNavigator(
  {
    MainTab: {
      screen: MainTabNavigator,
    },
    ...Pages,
  },
  {
    initialRouteName: 'MainTab',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false, //手势控制页面切换
    },
  },
);
const AppContainer = createAppContainer(MainNavigator);
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
