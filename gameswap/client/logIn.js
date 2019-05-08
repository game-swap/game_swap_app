import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input } from 'react-native-elements';


export default class logIn extends Component {
  render() {
    return (
      <View >
        <Header
         leftComponent={<Logo />}
         centerComponent={{
           text: 'GameSwap',
           style: {
             fontSize: 18,
             fontWeight: '700',
             color: '#7ed957'
           }
         }}
         rightComponent={{
           icon: 'account-circle',
           color: '#000'
         }}
         containerStyle={{ backgroundColor: '#fffff0' }}
       />
        <Input placeholder='Username'/>
        <Input placeholder='Password'/>
        <Input placeholder='Email'/>
        <Input placeholder='Games for Trade'/>

      </View>
    );
  }
}