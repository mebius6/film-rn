import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {colorMap, screenWidth} from '../../styles/Index';
/**
 * 视频剧集
 */
class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.data,
    };
  }
  static propTypes = {
    data: PropTypes.array, //剧集列表
  };
  static defaultProps = {
    data: [],
  };
  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.data !== prevState.list) {
      return {
        list: newProps.data,
      };
    }

    return null;
  }

  _changeEpisode = (item, indexs) => {
    this.props.onChange && this.props.onChange(item, indexs);
  };
  _renderEpisodePart = (v, i) => {
    return (
      <View key={i} style={styles.episodePart}>
        <View style={styles.episodeSource}>
          <Text>{v.source}</Text>
        </View>
        <View style={styles.episodeList}>
          {this._renderEpisodeItem(v.list || [], i)}
        </View>
      </View>
    );
  };
  _renderEpisodeItem = (list, i) => {
    return list.map((item, index) => {
      return (
        <TouchableHighlight
          key={`${i}${index}`}
          onPress={() => {
            this._changeEpisode(item, {rowIndex: i, colIndex: index});
          }}
          underlayColor={'#ccc'}>
          <View style={[styles.episodeItem]}>
            <Text style={styles.episodeText}>{item.title}</Text>
          </View>
        </TouchableHighlight>
      );
    });
  };
  render() {
    const {list} = this.state;
    const episodePart = (list || []).map((v, i) => {
      return this._renderEpisodePart(v, i);
    });
    return (
      <ScrollView>
        <View style={styles.container}>{episodePart}</View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    flexDirection: 'column',
    flex: 1,
  },
  episodePart: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
  },
  episodeSource: {
    fontSize: 15,
    marginBottom: 10,
  },
  episodeList: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'left',
    flexWrap: 'wrap',
  },
  episodeItem: {
    // margin: 2,
    marginVertical: 2,
    marginHorizontal: 5,
    width: (screenWidth - 20 - 10 - 40) / 4,
  },
  episodeText: {
    fontSize: 14,
    width: '100%',
    height: 26,
    lineHeight: 26,
    paddingHorizontal: 2,
    textAlign: 'center',
    color: colorMap.black[1],
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 2,
  },
  episodeActiveText: {
    fontSize: 14,
    width: '100%',
    height: 26,
    lineHeight: 26,
    paddingHorizontal: 2,
    textAlign: 'center',
    color: colorMap.green[1],
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colorMap.green[0],
    borderRadius: 2,
  },
});
export default Episode;
