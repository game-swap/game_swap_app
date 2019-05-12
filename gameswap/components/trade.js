import React, { Component } from 'react';
import { Overlay } from 'react-native-elements';
import OverlayContent from './overlay.js';

export default class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesOwned: ['Red Dead Redemption', 'Kingdom Hearts III', 'Anthem']
    };
  }

  render() {
    return (
      <Overlay
        isVisible={this.props.visible}
        onBackdropPress={() => {
          this.props.close();
          this.props.updateConsoleRequest('');
        }}
        overlayBackgroundColor="#141414"
        children={
          <OverlayContent
            game={this.props.game}
            console={this.props.console}
            gamesOwned={this.state.gamesOwned}
            updateConsoleRequest={this.props.updateConsoleRequest}
            addOfferedGame={this.props.addOfferedGame}
            sendRequest={this.props.sendRequest}
            close={this.props.close}
          />
        }
        width="90%"
        height="auto"
        borderRadius={11}
        overlayStyle={{ borderWidth: 2, borderColor: '#d3d3d3' }}
      />
    );
  }
}
