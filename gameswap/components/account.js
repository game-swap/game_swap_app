import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
// import axios from 'axios';
import Logo from './logo.js';
import Game from './game.js';
// import Trade from './trade.js';
// import Loading from './loading.js';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const styles = StyleSheet.create({
      listItem1: {
        width: '100%',
        height: 180,
        paddingLeft: 7,
        paddingTop: 3,
        paddingBottom: 3,
        // borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#7ed957',
        flexDirection: 'row',
        alignItems: 'center'
      },
      listItem: {
        width: '100%',
        height: 70,
        paddingLeft: 7,
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomWidth: 2,
        borderColor: '#7ed957',
        flexDirection: 'row',
        alignItems: 'center',
      },
      textView: { width: "82%", justifyContent: "center" },
      text: { color: '#d3d3d3', fontSize: 18, fontWeight: '700', paddingTop: 25 },
      iconView: {
        width: '20%',
        height: 77,
        paddingTop: 16,
        paddingRight: 7,
        justifyContent: 'center'
      }
    })

    return (
      <View>
        <Header
          leftComponent={{
            icon: 'arrow-back',
            color: '#000',
            marginLeft: '11%',
            onPress: () => this.props.navigation.navigate('Home')
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
        <View style={{ height: '100%', backgroundColor: '#141414' }}>

          <View style={styles.listItem1}>

            <View style={styles.textView}>
              <Text style={styles.text}>
                Welcome User
              </Text>
            </View>
            <View style={styles.iconView}>
              <Icon
                name='account-circle'
                size={60}
              />
            </View>

          </View>

          <ScrollView>

            <View> 

              <View style={styles.listItem}>
                <View style={styles.textView}>
                  <Text style={styles.text}>
                    Change Username
                  </Text>
                </View>
                <View style={styles.iconView}>
                  <Icon 
                    name='arrow-drop-down-circle'
                    color='#7ed957'
                  />
                </View>
              </View>
              <View style={styles.listItem}> 
                <View style={styles.textView}>
                  <Text style={styles.text}>
                    Change Email
                  </Text>
                </View>
                <View style={styles.iconView}>
                  <Icon 
                    name='arrow-drop-down-circle'
                    color='#7ed957'
                  />
                </View>
              </View>
              <View style={styles.listItem}>
                <View style={styles.textView}>
                  <Text style={styles.text}>
                    Change Password
                  </Text>
                </View>
                <View style={styles.iconView}>
                  <Icon 
                    name='arrow-drop-down-circle'
                    color='#7ed957'
                  />
                </View>
              </View>

            </View>

            <View style={styles.listItem}>
              <View style={styles.textView}>
                <Text style={styles.text}>
                  Add/Remove Games For Offer
                </Text>
              </View>
              <View style={styles.iconView}>
                <Icon 
                  name='arrow-drop-down-circle'
                  color='#7ed957'
                />
              </View>
            </View>

            <View style={styles.listItem}>
              <View style={styles.textView}>
                <Text style={styles.text}>
                  Logout
                </Text>
              </View>
              <View style={styles.iconView}>
                <Icon 
                  name='arrow-drop-down-circle'
                  color='#7ed957'
                />
              </View>
            </View>

          </ScrollView>
        </View>
      </View>
    )
  }
}