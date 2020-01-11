import React, {Component} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  StyleSheet,
} from 'react-native';
import {Tab, Grid} from '../../components/Index';
import {connect} from 'react-redux';
import {
  AppStyle,
  screenHeight,
  statusBarHeight,
  headerHeight,
  bottomHeight,
  tabBarHeight,
} from '../../styles/Index';

import Toast from '../../components/Toast';
import unit from '../../services/unit';

class TabarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      tabData: this.props.tabsData,
      tabs: [],
      isLoading: false,
      flatListData: [],
      pageIndex: 1,
      isEndReachedLoading: false,
      hasMore: false, //是否还有更多内容
      params: {},
      height: 0,
      onShow: true,
    };
  }

  componentDidMount() {
    console.log(['detail', this.props]);
    this._getTabBarList();
    this._getDefault();
  }
  componentWillUnmount() {
    this.setState({onShow: false});
  }
  // 切换tabs
  onTabChange(index) {
    let params = this.state.tabs.find((v, i) => i === index) || {};
    this.setState(
      {
        activeIndex: index,
        params,
      },
      () => {
        let params = this.state.params;
        if (params.path) {
          this._getList(params.path);
        }
      },
    );
  }
  //拉取tabs数据
  _getTabBarList = () => {
    let item = this.state.tabData.find(v => v.title == this.props.title);

    if (item) {
      global.api.get245BtTabData(item.path, {}).then(
        res => {
          let height =
            screenHeight - headerHeight - statusBarHeight - bottomHeight || 0;
          if (res.tabs.length) {
            height =
              screenHeight -
                statusBarHeight -
                headerHeight -
                bottomHeight -
                tabBarHeight -
                20 || 0;
          }
          this.setState({tabs: res.tabs || [], height});
        },
        err => {
          Toast.show('fail', err);
          this._getTabBarList();
        },
      );
    }
  };
  _getDefault = async () => {
    let vm = this;
    let {flatListData, params, onShow} = vm.state;
    if (!onShow) {
      return false;
    }
    if (!flatListData.length) {
      let header = this.props.tabsData.find(v => v.title === this.props.title);
      params = {path: header.path};
      if (header) {
        vm.setState(
          {
            params: params,
          },
          () => {
            vm._getList(header.path);
          },
        );
      }
    }
  };
  // 拉取列表数据
  _getList = async (path = '') => {
    let vm = this;
    let {onShow} = vm.state;

    if (!path || !onShow) {
      return false;
    }
    let res = await global.api.get245BtTabData(path, {}).catch(err => {
      Toast.show('fail', err);
      vm._getList(this.state.params.path);
    });
    if (!res || !res.body.length) return false;
    let {flatListData, pageIndex} = this.state;
    let list = res.body || [];
    if (pageIndex > 1) {
      list = unit.objectArrayReduce([...flatListData, ...list], 'title');
    }
    this.setState({
      flatListData: list,
      isLoading: false,
      isEndReachedLoading: false,
      hasMore: res
        ? Array.isArray(res.body) && res.body.length === 12
          ? true
          : false
        : false,
    });
  };
  _renderItem(data) {
    const item = data.item;
    return (
      <Grid
        columns={3}
        imgPath={item.imgPath}
        style={styles.item}
        title={item.title}
        index={data.index}
        onGridChange={index => {
          this.gridChange(index);
        }}
        isShowHeader={
          ['电影', '电视剧'].indexOf(this.props.title) > -1 ? true : false
        }
        key={item.title}></Grid>
    );
  }
  // 跳转详情页
  gridChange(index) {
    let {flatListData} = this.state;
    let item = flatListData[index];
    console.log(['item', item]);
    this.props.navigation.navigate('VideoDetail', item);
  }
  _genIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          size={'small'}
          animating={this.state.isEndReachedLoading}
          color={'blue'}
        />
        <View>
          <Text style={styles.indicator}>正在加载更多</Text>
        </View>
      </View>
    );
  }

  //上拉滚动加载
  _onEndReachedloadData() {
    let {hasMore, pageIndex} = this.state;
    if (!hasMore) {
      return false;
    }
    pageIndex += 1;
    this.setState(
      {
        isLoading: true,
        isEndReachedLoading: true,
        pageIndex,
      },
      () => {
        let path = this.state.params.path.split('.');
        path[0] = `${path[0]}-${pageIndex}`;
        let newPath = path.join('.');
        this._getList(newPath);
      },
    );
  }

  //下拉刷新
  loadData() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this._getList(this.state.params.path);
      },
    );
  }
  render() {
    let {activeIndex, height, isLoading, tabs, flatListData} = this.state;

    return (
      <View style={AppStyle.container}>
        {tabs.length ? (
          <Tab
            items={tabs}
            activeIndex={activeIndex}
            onTabChange={index => {
              this.onTabChange(index);
            }}></Tab>
        ) : null}
        <View
          style={[
            styles.flatList,
            {height: height, marginVertical: tabs.length ? 0 : 6},
          ]}>
          <FlatList
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            data={flatListData}
            renderItem={data => {
              return this._renderItem(data);
            }}
            refreshControl={
              <RefreshControl
                title={'loading'}
                colors={['blue']}
                refreshing={isLoading}
                onRefresh={() => {
                  this.loadData();
                }}
              />
            }
            ListFooterComponent={() => isLoading && this._genIndicator()}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              this._onEndReachedloadData();
            }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    tabsData: state.account.tabsData,
  };
};
const styles = StyleSheet.create({
  flatList: {
    // 主轴方向
    // 侧轴方向// 必须设置,否则换行不起作用
    marginHorizontal: 10,
  },

  item: {},
  text: {
    color: 'white',
    fontSize: 20,
  },
  indicatorContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    textAlign: 'center',
    color: '#333',
  },
});

export default connect(mapStateToProps)(TabarDetail);
