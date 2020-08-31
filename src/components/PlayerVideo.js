import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import Video from 'react-native-video';
class PlayerVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: this.props.video,
      autoplay: this.props.autoplay || false,
      loading: this.props.loading || false,
      poster: this.props.poster || '',
      // isWIFI: false,
      // isFullscreen: false,
      paused: this.props.paused || false,
      duration: 0,
      controls: this.props.controls,
      resizeMode: this.props.resizeMode,
    };
    this.player = null;
  }
  static propTypes = {
    video: PropTypes.string, //视频源
    loading: PropTypes.bool, //请求状态
    poster: PropTypes.string,
    paused: PropTypes.bool, //暂停
    volume: PropTypes.number, //调节音量
    muted: PropTypes.bool, //控制音频是否静音
    resizeMode: PropTypes.string, // 缩放模式
    onLoad: PropTypes.func, //加载媒体并准备播放时调用的回调函数
    repeat: PropTypes.bool, // 是否重复播放
    posterResizeMode: PropTypes.string,
    controls: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
    paused: false,
    duration: 0,
    muted: false,
    resizeMode: 'cover',
    repeat: true,
    posterResizeMode: 'cover',
    controls: true,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.paused !== prevState.paused) {
      return {
        paused: nextProps.paused,
      };
    }
    if (nextProps.video !== prevState.video) {
      return {
        loading: true,
        video: nextProps.video,
      };
    } else {
      return null;
    }
  }

  _onLoad(event) {
    this.setState({
      loading: false,
      duration: event.duration,
    });
  }

  _renderVideo() {
    const {
      video,
      autoplay,
      resizeMode,
      posterResizeMode,
      loading,
      poster,
      repeat,
      paused,
      controls,
    } = this.state;
    return (
      <View style={styles.player}>
        {video && (
          <Video
            ref={ref => {
              this.player = ref;
            }}
            paused={paused}
            source={{uri: video}}
            controls={controls}
            repeat={repeat}
            poster={poster}
            posterResizeMode={posterResizeMode}
            resizeMode={resizeMode}
            onLoad={event => {
              this._onLoad(event);
            }}
            onEnd={() => {
              this._onEnd();
            }}
            onError={this._videoError}
            style={styles.backgroundVideo}
          />
        )}
        {loading && (
          <View style={[styles.backgroundVideo, styles.loading]}>
            <Text style={styles.loadingText}>加载中...</Text>
          </View>
        )}
        {/* {!loading && (
          <View style={[styles.backgroundVideo, styles.pause]}>
            <Icon name={'pause'} style={styles.pauseText} />
          </View>
        )} */}
      </View>
    );
  }
  render() {
    return <View>{this._renderVideo()}</View>;
  }
}
const styles = StyleSheet.create({
  player: {
    position: 'relative',
  },
  backgroundVideo: {
    height: 211,
    backgroundColor: '#000000',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  // pause: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: 'transparent',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // pauseText: {
  //   fontSize: 60,
  //   color: '#FFFFFF',
  // },
});

export default PlayerVideo;
