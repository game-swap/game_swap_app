import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Checkbox from './checkbox.js';

export default class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedConsole: '',
      consoles: ['XBox One', 'PS4', 'Switch']
    };
    this.setCheckedConsole = this.setCheckedConsole.bind(this);
  }

  getConsoles() {}

  setCheckedConsole(console) {
    this.setState({ checkedConsole: console });
  }

  render() {
    let { consoles, checkedConsole } = this.state;
    return (
      <View>
        <Text style={styles.text}>Choose a Console</Text>
        {consoles.map((console, index) => (
          <Checkbox
            key={index}
            name={console}
            unique={true}
            checked={console === checkedConsole ? true : false}
            setCheckedConsole={this.setCheckedConsole}
          />
        ))}
        <Button
          onPress={
            checkedConsole
              ? () => this.props.updateConsoleRequest(checkedConsole)
              : null
          }
          title={'Next'}
          buttonStyle={{
            display: 'flex',
            alignSelf: 'center',
            backgroundColor: '#000',
            borderWidth: 1,
            borderColor: '#d3d3d3',
            width: '50%',
            marginTop: 7,
            marginBottom: 7,
            borderRadius: 7
          }}
          titleStyle={{
            color: '#7ed957',
            fontWeight: '700'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: '#d3d3d3',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 7
  }
});
