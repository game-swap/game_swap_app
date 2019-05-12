import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated, Easing } from 'react-native';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.spinValue, {
          toValue: 1,
          duration: 700,
          easing: Easing.easeIn,
          useNativeDriver: true
        }),
        Animated.timing(this.state.spinValue, {
          toValue: 2,
          duration: 700,
          easing: Easing.easeOut,
          useNativeDriver: true
        }),
        Animated.timing(this.state.spinValue, {
          toValue: 3,
          duration: 500,
          easing: Easing.easeOut,
          useNativeDriver: true
        }),
        Animated.delay(500),
        Animated.timing(this.state.spinValue, {
          toValue: 4,
          duration: 700,
          easing: Easing.easeIn,
          useNativeDriver: true
        }),
        Animated.timing(this.state.spinValue, {
          toValue: 5,
          duration: 700,
          easing: Easing.easeOut,
          useNativeDriver: true
        }),
        Animated.timing(this.state.spinValue, {
          toValue: 6,
          duration: 500,
          easing: Easing.easeOut,
          useNativeDriver: true
        }),
        Animated.timing(this.state.spinValue, {
          toValue: 0,
          duration: 0,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.delay(500)
      ])
    ).start();
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6],
      outputRange: [
        '0deg',
        '-90deg',
        '220deg',
        '180deg',
        '90deg',
        '400deg',
        '360deg'
      ]
    });
    return (
      <View style={styles.loading}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Animated.Image
          style={{
            transform: [{ rotate: spin }],
            width: 200,
            height: 200
          }}
          source={require('../assets/loading.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 400,
    height: 400
  },
  loading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#696969'
  }
});
