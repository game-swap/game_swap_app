import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import OverlayContent from './overlay.js';

export default class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesOffered: ['Red Dead Redemption', 'Kingdom Hearts III', 'Anthem']
    };
  }

  render() {
    return (
      <Overlay
        isVisible={this.props.visible}
        onBackdropPress={this.props.close}
        overlayBackgroundColor="#fffff0"
        children={<OverlayContent gamesOffered={this.state.gamesOffered} />}
        width="90%"
        height="auto"
      />
    );
  }
}
