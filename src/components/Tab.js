import React, {Component} from 'react';
import {
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      activeIndex: this.props.activeIndex,
    };
  }

  changeActiveIndex = index => {
    const {onTabChange} = this.props;
    onTabChange && onTabChange(index);
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      activeIndex: nextProps.activeIndex,
    });
  }
  render() {
    const {items, activeIndex = 0} = this.state;
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.tabBar}>
            {items.map((item, index) => (
              <TouchableHighlight
                key={index}
                underlayColor={null}
                style={[styles.tabItem]}
                onPress={() => this.changeActiveIndex(index)}>
                <Text style={styles.tabName}>{item.title}</Text>
              </TouchableHighlight>
            ))}
          </View>
          <View style={styles.tabBarUnderline}>
            {items.map((item, index) => (
              <View style={[styles.tabItemUnderline]} key={index}>
                <View
                  style={[
                    styles.tabItemUnderlineItem,
                    activeIndex === index ? styles.activeTab : null,
                  ]}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 49,
  },
  tabBarUnderline: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 5,
  },
  tabItem: {
    width: Dimensions.get('window').width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  tabItemUnderline: {
    width: Dimensions.get('window').width / 4,
    borderBottomWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
  },
  tabItemUnderlineItem: {
    width: 20,
    height: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  activeTab: {
    backgroundColor: '#97DA4A',
    borderColor: '#97DA4A',
  },
});
