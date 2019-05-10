import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import axios from 'axios';

export default class Login extends Component { 
  loginVerify = () => {
      axios
      .get('/auth/google')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Input
          placeholder="Username"
          inputContainerStyle={{
            width: 300,
            marginBottom: 10,
            left: 45,
            bottom: 0
          }}
        />
        <Input
          placeholder="Password"
          inputContainerStyle={{
            width: 300,
            marginBottom: 10,
            left: 45,
            bottom: 0
          }}
        />
        <Button
          title={'Login'}
          onPress={() => this.props.navigation.navigate('Home')}
          buttonStyle={{
            backgroundColor: '#000',
            borderWidth: 1,
            borderColor: '#d3d3d3',
            borderRadius: 10,
            width: 300,
            marginTop: 20
          }}
          titleStyle={{ fontWeight: '500', color: '#7ed957' }}
        />

        <Button
          title={'Sign in with Google'}
          onPress={() => this.loginVerify()}
          // onPress={() => this.props.navigation.navigate('Home')}
          buttonStyle={{
            backgroundColor: '#000',
            borderWidth: 1,
            borderColor: '#d3d3d3',
            borderRadius: 10,
            width: 300,
            marginTop: 20
          }}
          titleStyle={{ fontWeight: '500', color: '#7ed957' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#696969'
  },
  logo: {
    width: 400,
    height: 400
  }
});
