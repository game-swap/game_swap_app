import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Home from './components/home.js';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Home />
      </View>
    );
  }
}

AppRegistry.registerComponent('GameSwap', () => App);
