import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {AppStyle} from '../../styles/Index';
import {VideoPlayer} from '../../components/Index';
import {WebView} from 'react-native-webview';
import Toast from '../../components/Toast';
import Episode from '../episode/Episode'; //剧集列表
function mapStateToProps(state) {
  return {
    tabsData: state.account.tabsData,
  };
}

class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: this.props.navigation.state.params,
      loading: false,
      videoUrl: '',
      fullscreen: false,
      androidFullscreen: false,
      hiddenStatusBar: false,
    };
  }
  static navigationOptions = {
    title: '播放影片',
    header: null,
  };
  componentDidMount() {
    this._getPlayerUrl();
  }
  _getPlayerUrl = () => {
    let {params} = this.state;

    console.log(['params', params]);
    this.setState(
      {
        loading: true,
      },
      async () => {
        let res = await global.api.get245BtPlayerUrl(params.path).catch(err => {
          Toast.show('fail', err);
        });

        console.log(['_getPlayerUrl', res]);
        if (!res) return false;
        this.setState({
          videoUrl: res.url || '',
          loading: false,
        });
      },
    );
  };
  _onPressFullScreenBtn = () => {
    const {androidFullscreen} = this.state;
    this.setState({
      androidFullscreen: androidFullscreen ? false : true,
      hiddenStatusBar: androidFullscreen ? false : true,
    });
  };
  render() {
    let {
      params,
      fullscreen,
      androidFullscreen,
      videoUrl,
      loading,
      hiddenStatusBar,
    } = this.state;
    return (
      <SafeAreaView style={AppStyle.container}>
        <StatusBar
          hidden={hiddenStatusBar}
          showHideTransition={'fade'}></StatusBar>
        {videoUrl.endsWith('.m3u8') ? (
          <VideoPlayer
            videoUrl={videoUrl}
            fullscreen={fullscreen}
            fullscreenAutorotate={true}
            fullscreenOrientation={'landscape'} //landscape portrait
            loading={loading}
            onPressFullScreenBtn={() => {
              if (Platform.OS === 'android') {
                this._onPressFullScreenBtn();
              } else {
                this.setState({
                  fullscreen: true,
                });
              }
            }}
            onFullscreenPlayerWillDismiss={() => {
              this.setState({
                fullscreen: false,
              });
            }}
            is_full_screen={androidFullscreen}
            onBack={() => {
              if (Platform.OS === 'android') {
                this._onPressFullScreenBtn();
              }
            }}></VideoPlayer>
        ) : (
          <View style={{flex: 1}}>
            <WebView
              source={{
                uri: videoUrl,
              }}
            />
          </View>
        )}
        {!androidFullscreen ? (
          <View style={styles.container}>
            <Episode
              data={
                params.list && Array.isArray(params.list) ? params.list : []
              }
              onChange={item => {
                params.path = item.path;
                this.setState({params}, () => {
                  this._getPlayerUrl();
                });
              }}></Episode>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default connect(mapStateToProps)(PlayerList);
