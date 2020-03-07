import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import actionTypes from './store/actionTypes';
// api
import api from './api/index';
import http from './services/http';
global.api = api;
global.http = http;
//pages
import {TabNav, Pages} from './views/Views';
// 底部菜单路由
const tabNavigatorAttr = {
  initialRouteName: 'Film',
  tabBarComponent: BottomTabBar,
  tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
  swipeEnabled: false, // 是否可以左右滑动切换tab
  animationEnabled: false, // 切换页面时是否有动画效果
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
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: [],
    };
  }
  componentDidMount() {
    if (!this.props.tabsData.length) {
      this.props.setUserInfo();
    }
  }

  render() {
    return <AppContainer />;
  }
}

const mapStateToProps = state => {
  return {
    tabsData: state.account.tabsData,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    setUserInfo: () => {
      dispatch({
        type: actionTypes.REQ_START,
        loading: true,
      });
      api.get245BtHeader({}).then(
        res => {
          dispatch({
            type: actionTypes.REQ_SUCCESS,
            tabsData: res || [],
            loading: false,
          });
        },
        err => {
          dispatch({
            type: actionTypes.REQ_FAIL,
            loading: false,
          });
        },
      );
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
