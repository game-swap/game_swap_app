import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class logIn extends Component {
  render() {
    return (
        <View style={styles.inputContainer}>
            <Button
              title={'Login'}
              buttonStyle={{
                backgroundColor: '#000',
                borderWidth: 1,
                borderColor: '#d3d3d3'
        }}
        titleStyle={{ fontWeight: '500', color: '#7ed957' }}
      />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  }
});