import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';

export default class logIn extends Component {
  render() {
    return (
        <View style={styles.container}>
            <Image 
              source={require('./Logo.png')}
              style={styles.logo}
            />
            <Input 
              placeholder='Username'
              inputContainerStyle={{
                width: 300,
                marginBottom: 10,
                left: 45,
                bottom: 50
              }}

            />
            <Input 
              placeholder='Password'
              inputContainerStyle={{
                width: 300,
                marginBottom: 10,
                left: 45,
                bottom: 50
              }}

            />
            <Button
              title={'Login'}
              buttonStyle={{
                backgroundColor: '#000',
                borderWidth: 1,
                borderColor: '#d3d3d3',
                borderRadius: 10,
                width: 300,
                marginTop: 20,
                bottom: 50
              }}
              titleStyle={{ fontWeight: '500', color: '#7ed957' }}
            />

            <Button
              title={'Sign in with Google'}
              buttonStyle={{
                backgroundColor: '#000',
                borderWidth: 1,
                borderColor: '#d3d3d3',
                borderRadius: 10,
                width: 300,
                marginTop: 20,
                bottom: 50
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
    height: 400,
  }
});