import React from 'react';
import { Image } from 'react-native';

const Logo = () => (
  <Image
    source={require('../assets/logo.png')}
    style={{ width: 55, height: 55 }}
  />
);

export default Logo;
