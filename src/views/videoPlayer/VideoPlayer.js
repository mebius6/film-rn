import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
function mapStateToProps(state) {
  return {};
}

class VideoPlayer extends Component {
  render() {
    return <View></View>;
  }
}

export default connect(mapStateToProps)(VideoPlayer);
