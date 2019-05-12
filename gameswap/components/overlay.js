import React from 'react';
import { View } from 'react-native';
import Console from './console.js';
import Offer from './offer.js';

const OverlayContent = props => (
  <View>
    {!props.console ? (
      <Console
        game={props.game}
        updateConsoleRequest={props.updateConsoleRequest}
      />
    ) : (
      <Offer
        gamesOwned={props.gamesOwned}
        addOfferedGame={props.addOfferedGame}
      />
    )}
  </View>
);

export default OverlayContent;
