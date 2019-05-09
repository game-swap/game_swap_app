import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  render() {
    return (
      <CheckBox
        title={this.props.name}
        checked={this.state.checked}
        onPress={() => this.setState({ checked: !this.state.checked })}
        containerStyle={{
          backgroundColor: '#141414',
          borderRadius: 7,
          borderColor: '#7ed957',
          borderWidth: 1.5
        }}
        textStyle={{ color: '#d3d3d3' }}
        uncheckedColor="#d3d3d3"
        checkedColor="#7ed957"
      />
    );
  }
}
