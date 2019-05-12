import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Checkbox from './checkbox.js';

export default class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedConsole: ''
    };
    this.setCheckedConsole = this.setCheckedConsole.bind(this);
  }

  componentDidMount() {
    const platformCodes = { '48': 'PS4', '49': 'XBox One', '130': 'Switch' };
    const platforms = this.props.game.platforms
      .filter(code => platformCodes[code])
      .map(code => platformCodes[code]);
    if (platforms.length === 1) {
      this.setCheckedConsole(platforms[0]);
    }
  }

  setCheckedConsole(console) {
    this.setState({ checkedConsole: console });
  }

  render() {
    const { checkedConsole } = this.state;
    const platformCodes = { '48': 'PS4', '49': 'XBox One', '130': 'Switch' };
    const platforms = this.props.game.platforms
      .filter(code => platformCodes[code])
      .map(code => platformCodes[code]);
    return (
      <View>
        <Text style={styles.text}>Choose a Console</Text>
        {platforms.map((console, index) => (
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
