import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';
import {Header, Icon, Card, SearchBar} from '../../components/Index';
import {AppStyle, colorMap, screenWidth} from '../../styles/Index';
import {connect} from 'react-redux';
import Toast from '../../components/Toast';
import unit from '../../services/unit';
function mapStateToProps(state) {
  return {
    tabsData: state.account.tabsData,
  };
}

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWords: '',
      isLoading: false,
      flatListData: [],
      pageIndex: 1,
      isEndReachedLoading: false,
      hasMore: false, //是否还有更多内容
      height: 0,
      onShow: true,
    };
  }
  static navigationOptions = {
    title: '搜索',
    header: null,
  };
  componentWillUnmount() {
    this.setState({onShow: false});
  }
  // 搜索栏模糊搜索
  querySearchBar = value => {
    this.setState({keyWords: value});
  };

  // 搜索栏搜索查询
  onSubmitEditing = () => {
    this.setState({pageIndex: 1}, () => {
      this._getList();
    });
  };

  // 拉取列表数据
  _getList = async () => {
    let vm = this;
    let {onShow, keyWords, pageIndex, flatListData} = vm.state;

    if (!keyWords || !onShow) {
      return false;
    }
    let res = await global.api
      .search245BtBykeywords('/search.php', {
        searchword: keyWords,
        page: pageIndex,
      })
      .catch(err => {
        Toast.show('fail', err);
        vm._getList();
      });
    if (!res || !res.length) return false;
    console.log(['res', res]);
    let list = res.map(v => {
      let obj = {
        path: v.imgPath,
        title: v.title,
        columns: [
          {
            render: () => {
              return <Text style={styles.searchResultTitle}>{v.title}</Text>;
            },
          },
          ...v.desc.filter(v => Object.keys(v).length).map(v => v.title),
          {
            render: () => {
              return (
                <View style={[AppStyle.row, AppStyle.flex1]}>
                  <TouchableOpacity
                    onPress={() => {
                      this.clickBtn(v.btn[0]);
                    }}>
                    <Text style={styles.searchBtn}>{v.btn[0].title}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.clickBtn({
                        ...v.btn[1],
                        imgPath: v.imgPath,
                        name: v.title,
                      });
                    }}>
                    <Text style={[styles.searchBtn, {marginLeft: 12}]}>
                      {v.btn[1].title}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            },
          },
        ],
      };

      return obj;
    });

    if (pageIndex > 1) {
      list = unit.objectArrayReduce([...flatListData, ...list], 'title');
    }
    this.setState({
      flatListData: list,
      isLoading: false,
      isEndReachedLoading: false,
      hasMore: res
        ? Array.isArray(res) && res.length === 6
          ? true
          : false
        : false,
    });
  };
  _renderItem(data) {
    const item = data.item;
    return (
      <Card
        key={data.index}
        image={{path: item.path}}
        height={parseInt((screenWidth / 4) * 1.2)}
        columns={item.columns}></Card>
    );
  }
  // 立即播放 查看详情
  clickBtn = item => {
    if (item.title === '立即播放') {
    }
    if (item.title === '查看详情') {
      console.log(['查看详情', item]);
      // 跳转详情页
      this.props.navigation.navigate('VideoDetail', item);
    }
  };

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
    let {hasMore, onShow, pageIndex, keyWords} = this.state;
    if (!hasMore || !onShow || !keyWords) {
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
        this._getList(this.state.pageIndex);
      },
    );
  }

  //下拉刷新
  loadData() {
    let {keyWords, onShow} = this.state;
    if (!onShow || !keyWords) {
      return false;
    }
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
    let {isLoading, flatListData, keyWords} = this.state;
    return (
      <SafeAreaView style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={'搜索'}
          headerLeft={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon name={'arrowLeft'} style={{fontSize: 20, color: '#fff'}} />
            </TouchableOpacity>
          }
        />
        <SearchBar
          onChange={this.querySearchBar}
          value={keyWords}
          onSubmitEditing={this.onSubmitEditing}></SearchBar>
        <View>
          <FlatList
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  searchResultTitle: {
    color: colorMap.yellow[0],
    textAlign: 'left',
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
  },
  searchBtn: {
    borderWidth: 1,
    borderColor: colorMap.white[2],
    borderRadius: 2,
    paddingHorizontal: 4,
    height: 26,
    lineHeight: 26,
    color: colorMap.green[1],
  },
});
export default connect(mapStateToProps)(SearchResult);
