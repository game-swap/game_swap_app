import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';

const Game = props => (
  <View style={props.index === 0 ? styles.listItem1 : styles.listItem}>
    <Image source={{ uri: props.img }} style={styles.image} />
    <View style={styles.textView}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
    <View style={styles.buttonView}>
      <Button
        onPress={props.tradeRequest}
        title={'Trade'}
        buttonStyle={{
          backgroundColor: '#7ed957',
          borderWidth: 1,
          borderColor: '#000'
        }}
        titleStyle={{ color: '#000' }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  listItem1: {
    width: '100%',
    height: 77,
    paddingLeft: 5,
    paddingTop: 3,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  listItem: {
    width: '100%',
    height: 77,
    paddingLeft: 5,
    paddingTop: 3,
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  image: { width: 70, height: 70, marginRight: 7 },
  textView: { width: '60%' },
  text: { fontSize: 18, paddingTop: 25 },
  buttonView: {
    width: '20%',
    height: 77,
    paddingTop: 19,
    paddingRight: 7,
    position: 'absolute',
    right: 0
  }
});

export default Game;
