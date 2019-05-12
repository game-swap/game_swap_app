import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Checkbox from './checkbox.js';

const Offer = props => (
  <View>
    <Text style={styles.text}>Offer to Trade</Text>
    {props.gamesOwned.map((game, index) => (
      <Checkbox
        key={index}
        name={game}
        unique={false}
        addOfferedGame={props.addOfferedGame}
      />
    ))}
    <Button
      onPress={() => {
        if (props.sendRequest()) {
          props.close();
          props.updateConsoleRequest('');
        }
      }}
      title={'Make Offer'}
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

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: '#d3d3d3',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 7
  }
});

export default Offer;
