import React from 'react';
import { View } from 'react-native';
import Console from './console.js';
import Offer from './offer.js';

const OverlayContent = props => (
  <View>
    {!props.console ? (
      <Console updateConsoleRequest={props.updateConsoleRequest} />
    ) : (
      <Offer gamesOffered={props.gamesOffered} />
    )}
  </View>
);

export default OverlayContent;
