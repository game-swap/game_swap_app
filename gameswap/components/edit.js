import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Header, Button, Icon, SearchBar } from 'react-native-elements';
import axios from 'axios';
import Logo from './logo.js';
import ownedGames from './ownedGames.js';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      games: [],
      search: '',
      filteredGames: [],
      addNewOpened: false,
      currentGamesOpened: false
    };
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.toggleCurrentGamesOpened = this.toggleCurrentGamesOpened.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.filterBySearch = this.filterBySearch.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://54.211.218.213:3000/api/games/?sort=offers')
      .then(games => {
        this.setState({ status: 'loaded', games });
      })
      .catch(err => console.log(err));
  }

  toggleAddNew() {
    let addNewOpened = !this.state.addNewOpened;
    this.setState({ addNewOpened });
  }

  toggleCurrentGamesOpened() {
    let currentGamesOpened = !this.state.currentGamesOpened;
    this.setState({ currentGamesOpened });
  }

  updateSearch = search => {
    const filteredGames = this.filterBySearch(search);
    this.setState({ search, filteredGames });
  };

  clearSearch = () => {
    this.setState({ search: '' }, () => {
      if (this.state.console) {
        let filteredGames = this.filterByConsole(this.state.console);
        this.setState({ filteredGames });
      } else {
        this.setState({ filteredGames: [] });
      }
    });
  };

  filterBySearch = search => {
    const { games } = this.state;
    let filteredGames = games.filter(game =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
    return filteredGames;
  };

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
      text: {
        color: '#d3d3d3',
        fontSize: 18,
        fontWeight: '700',
        paddingTop: 20
      },
      game: {
        color: '#d3d3d3',
        fontSize: 18,
        fontWeight: '700',
        paddingTop: 20
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
            onPress: () => this.props.navigation.navigate('Account'),
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
              <Text style={styles.text}>What games do you want to swap?</Text>
            </View>
            <View style={styles.iconView}>
              <Icon name="account-circle" size={60} />
            </View>
          </View>

          <ScrollView>
            <View style={styles.listItem}>
              <View style={styles.textView}>
                <Text style={styles.text} onPress={this.toggleAddNew}>
                  Add New Game For Swap
                </Text>
              </View>
              <View style={styles.iconView}>
                <Icon
                  name="arrow-drop-down-circle"
                  color="#7ed957"
                  onPress={this.toggleAddNew}
                />
              </View>
            </View>

            {this.state.addNewOpened && (
              <SearchBar
                containerStyle={{
                  backgroundColor: '#141414',
                  marginTop: 5,
                  borderTopColor: '#141414',
                  borderBottomColor: '#141414'
                }}
                placeholder="Search for Games"
                onChangeText={this.updateSearch}
                onClear={this.clearSearch}
                value={this.state.search}
              />
            )}

            {/* Account Info */}
            <View>
              <View style={styles.listItem}>
                <View style={styles.textView}>
                  <Text
                    style={styles.text}
                    onPress={this.toggleCurrentGamesOpened}
                  >
                    Your Games For Swap
                  </Text>
                </View>
                <View
                  style={styles.iconView}
                  onPress={this.toggleCurrentGamesOpened}
                >
                  <Icon name="arrow-drop-down-circle" color="#7ed957" />
                </View>
              </View>

              {this.state.currentGamesOpened && (
                <ScrollView>
                  {this.state.games.map(game => {
                    <ownedGames key={index} index={index} game={game} />;
                  })}
                </ScrollView>
              )}
            </View>

            <View style={styles.listItem}>
              <View style={styles.textView}>
                <Text
                  style={styles.text}
                  onPress={() => this.props.navigation.navigate('Home')}
                >
                  Return to homepage
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
