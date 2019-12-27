import React from 'react';

import { View, ActivityIndicator } from 'react-native';

export default class Spinner extends React.Component {
  _getSpinner() {
    return <ActivityIndicator animating={true} size="small" {...this.props} />;
  }

  render() {
    return <View>{this._getSpinner()}</View>;
  }
}
