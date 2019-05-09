import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';

const Game = props => (
  <View style={props.index === 0 ? styles.listItem1 : styles.listItem}>
    <Image source={{ uri: props.cover }} style={styles.image} />
    <View style={styles.textView}>
      <Text style={styles.text}>{props.name}</Text>
    </View>
    <View style={styles.buttonView}>
      <Button
        onPress={props.tradeRequest}
        title={'Trade'}
        buttonStyle={{
          backgroundColor: '#000',
          borderWidth: 1,
          borderColor: '#d3d3d3'
        }}
        titleStyle={{ fontWeight: '500', color: '#7ed957' }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  listItem1: {
    width: '100%',
    height: 77,
    paddingLeft: 7,
    paddingTop: 3,
    paddingBottom: 3,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#696969',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  listItem: {
    width: '100%',
    height: 77,
    paddingLeft: 7,
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomWidth: 2,
    borderColor: '#696969',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  image: { width: 70, height: 70, marginRight: 11 },
  textView: { width: '60%' },
  text: { color: '#d3d3d3', fontSize: 18, fontWeight: '700', paddingTop: 25 },
  buttonView: {
    width: '20%',
    height: 77,
    paddingTop: 16,
    paddingRight: 7,
    position: 'absolute',
    right: 0
  }
});

export default Game;
