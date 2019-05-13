import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import axios from 'axios';
import Logo from './logo.js';
import Game from './game.js';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 3,
      username_opened: false,
      email_opened: false,
      password_opened: false
    };
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
        paddingTop: 0,
        paddingBottom: 16,
        borderBottomWidth: 2,
        borderColor: '#7ed957',
        flexDirection: 'row',
        alignItems: 'center'
      },
      textView: { width: '82%', justifyContent: 'center' },
      heading: {
        color: '#d3d3d3',
        fontSize: 18,
        fontWeight: '700',
        paddingTop: 20
      },
      subheading: {
        color: '#d3d3d3',
        fontSize: 15,
        fontWeight: '500',
        fontStyle: 'italic',
        paddingTop: 9
      },
      iconView: {
        width: '20%',
        height: 80,
        paddingTop: 20,
        paddingRight: 7,
        justifyContent: 'center'
      }
    });

    return (
      <View>
        <Header
          leftComponent={{
            icon: 'arrow-back',
            color: '#000',
            marginLeft: '11%',
            onPress: () => this.props.navigation.navigate('Home'),
            underlayColor: '#696969'
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
              <Text style={styles.heading}>Settings</Text>
              <Text style={styles.subheading}>uncle_jay</Text>
            </View>
            <View style={styles.iconView}>
              <Icon name="account-circle" size={60} />
            </View>
          </View>

          <ScrollView>
            <View style={styles.listItem}>
              <View style={styles.textView}>
                <Text
                  style={styles.heading}
                  onPress={() => this.props.navigation.navigate('Edit')}
                >
                  Add / Remove Games For Swap
                </Text>
              </View>
              <View style={styles.iconView}>
                <Icon
                  name="chevron-right"
                  color="#7ed957"
                  onPress={() => this.props.navigation.navigate('Edit')}
                />
              </View>
            </View>

            {/* Account Info */}
            <View>
              <View style={styles.listItem}>
                <View style={styles.textView}>
                  <Text style={styles.heading}>Change Username</Text>
                </View>
                <View style={styles.iconView}>
                  <Icon name="edit" color="#7ed957" />
                </View>
              </View>
              <View style={styles.listItem}>
                <View style={styles.textView}>
                  <Text style={styles.heading}>Update Email</Text>
                </View>
                <View style={styles.iconView}>
                  <Icon name="edit" color="#7ed957" />
                </View>
              </View>
              <View style={styles.listItem}>
                <View style={styles.textView}>
                  <Text style={styles.heading}>Change Password</Text>
                </View>
                <View style={styles.iconView}>
                  <Icon name="edit" color="#7ed957" />
                </View>
              </View>
            </View>

            <View style={styles.listItem}>
              <View style={styles.textView}>
                <Text
                  style={styles.heading}
                  onPress={() => this.props.navigation.navigate('Login')}
                >
                  Logout
                </Text>
              </View>
              <View style={styles.iconView}>
                <Icon
                  name="exit-to-app"
                  color="#7ed957"
                  onPress={() => this.props.navigation.navigate('Login')}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
