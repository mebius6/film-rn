import React, {Component} from 'react';

import {Provider} from 'react-redux';
import {store} from './src/store';

import Main from './src/Main';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
