import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Header, SearchBar, ButtonGroup } from 'react-native-elements';
// import axios from 'axios';
// import Logo from './logo.js';
// import Game from './game.js';
// import Trade from './trade.js';
// import Loading from './loading.js';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    <View>
      <Header
        leftComponent={{
          icon: 'account-circle',
          color: '#000',
          marginLeft: '11%'
        }}
        centerComponent={
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                fontFamily: 'Verdana-Bold',
                color: '#7ed957'
              }}
            >
              Game
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                fontFamily: 'Verdana-Bold',
                color: '#000'
              }}
            >
              Swap
            </Text>
          </View>
        }
        rightComponent={<Logo />}
        containerStyle={{
          backgroundColor: '#696969',
          borderBottomColor: '#696969'
        }}
      />
      <View>
        {/* Welcome User */}
        <Text>Welcome User</Text>
      </View>
      <ScrollView>
        <View>
          {/* change username */}
          <Text>Change Username</Text>
        </View>
        <View>
          {/* change email */}
          <Text>Change Email</Text>
        </View>
        <View>
          {/* change password */}
          <Text>Change Password</Text>
        </View>
        <View>
          {/* Add/Remove Games For Offer */}
          <Text>Add/Remove Games For Offer</Text>
        </View>
      </ScrollView>
    </View>
  }
}