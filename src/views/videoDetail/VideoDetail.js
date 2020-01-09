import React, {Component} from 'react';
import {View, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import {Header, Icon, Card} from '../../components/Index';
import {AppStyle} from '../../styles/Index';
import {connect} from 'react-redux';
import Toast from '../../components/Toast';
import Episode from '../episode/Episode'; //剧集列表
class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: this.props.navigation.state.params,
      body: [],
      author: '',
      title: [],
    };
  }
  static navigationOptions = {
    title: '影片详情',
    header: null,
  };
  componentDidMount() {
    this._getDetailList();
  }
  _getDetailList = async () => {
    let {params, body, author, title} = this.state;
    let res = await global.api.get245BtListItem(params.path).catch(err => {
      Toast.show('fail', err);
    });
    if (!res) return false;
    title = res.header.map(v => `${v.label} ${v.value}`) || [];
    body = res.body || [];
    author = res.author || '';
    console.log([{body, author, title}]);
    this.setState({body, author, title});
  };
  playItemChange(item) {
    console.log('点击', item);
  }
  render() {
    let {params, title, body} = this.state;
    return (
      <SafeAreaView style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={params.title || ''}
          headerLeft={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon name={'arrowLeft'} style={{fontSize: 20, color: '#fff'}} />
            </TouchableOpacity>
          }
        />
        <Card image={{path: params.imgPath}} columns={title}></Card>
        <View style={styles.container}>
          <Episode
            data={body}
            onChange={item => {
              this.playItemChange(item);
            }}></Episode>
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    tabsData: state.account.tabsData,
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default connect(mapStateToProps)(VideoDetail);
