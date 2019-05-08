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
        containerStyle={{ backgroundColor: '#7ed957' }}
        textStyle={{ color: '#000' }}
        uncheckedColor="#000"
        checkedColor="#000"
      />
    );
  }
}
