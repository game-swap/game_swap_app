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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('GameSwap', () => App);
