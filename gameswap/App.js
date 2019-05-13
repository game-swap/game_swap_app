import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './components/login.js';
import Home from './components/home.js';
import Account from './components/account.js';
import Edit from './components/edit.js';

class App extends React.Component {
  render() {
    return Login;
  }
}

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: { header: null, gesturesEnabled: false }
    },
    Home: {
      screen: Home,
      navigationOptions: { header: null, gesturesEnabled: false }
    },
    Account: {
      screen: Account,
      navigationOptions: { header: null }
    },
    Edit: {
      screen: Edit,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'screen'
  }
);

AppRegistry.registerComponent('GameSwap', () => App);

export default createAppContainer(AppNavigator);
