import React, { Component } from 'react';
import { View } from 'react-native';

import lodash from 'lodash';

export default class RowItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const { numColumns, dataSource } = this.props;
    const rowItemsCount = numColumns ? numColumns : 1;
    if (dataSource) {
      let data = [];
      if (rowItemsCount > 1) {
        data = lodash
          .chain(dataSource)
          .chunk(rowItemsCount)
          .value();
      } else {
        data = dataSource;
      }
      this.setState({
        data: data
      });
    }
  }

  _getListView(info) {
    const {
      renderItem,
      numColumns,
      columnWrapperStyle,
      columnEmptyComponent
    } = this.props;
    if (numColumns > 1) {
      const { item, index } = info;
      let cols = [],
        len = item.length;
      item.forEach((v, i) => {
        const element = renderItem({
          item: v,
          index: index * numColumns + i
        });
        cols.push(element);
      });
      if (len < numColumns) {
        for (var n = 0; n < numColumns - len; n++) {
          cols.push(
            columnEmptyComponent({
              index: index * numColumns + len + n + 1
            })
          );
        }
      }
      return (
        <View
          key={`row-item-${index}`}
          style={[{ flexDirection: 'row' }, columnWrapperStyle]}
        >
          {cols}
        </View>
      );
    } else {
      return renderItem(info);
    }
  }

  render() {
    const { style } = this.props;
    let list = this.state.data.map((v, i) => {
      return this._getListView({ item: v, index: i });
    });
    return (
      <View style={[{ flexDirection: 'row' }, style]}>
        <View style={{ flex: 1 }}>{list}</View>
      </View>
    );
  }
}
