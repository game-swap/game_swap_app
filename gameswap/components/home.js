import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Header, SearchBar, ButtonGroup } from 'react-native-elements';
import axios from 'axios';
import Logo from './logo.js';
import Game from './game.js';
import Trade from './trade.js';
import Loading from './loading.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      search: '',
      console: '',
      consoleIndex: null,
      trade: false,
      game_id: '',
      gameName: '',
      consoleRequest: '',
      gameIndex: '',
      games: [],
      filteredGames: [],
      offeredGames: []
    };
    this.setRequestedGame = this.setRequestedGame.bind(this);
    this.addOfferedGame = this.addOfferedGame.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  componentWillMount() {
    axios
      .get('http://54.211.218.213:3000/api/games/?sort=offers')
      .then(games => this.setState({ status: 'loaded', games: games.data }))
      .catch(err => console.log(err)); // display 'error loading' + refresh icon
  }

  sendRequest() {
    const { game_id, gameName, consoleRequest, offeredGames } = this.state;
    const platformCodes = { PS4: '48', 'XBox One': '49', Switch: '130' };
    if (offeredGames.length) {
      axios({
        method: 'post',
        url: 'http://18.220.172.51:3000/api/email/',
        data: {
          buyer: 'Julian Yuen',
          user_id: 7,
          game: gameName,
          game_id: game_id,
          platform_id: platformCodes[consoleRequest],
          offer: offeredGames,
          email: 'unclej@hr.com'
        }
      })
        .then(response => console.log(response)) // display success message
        .catch(err => console.log(err)); // display error message + retry button
      this.setState({ offeredGames: [] });
      return true;
    }
  }

  setRequestedGame = game => {
    const { game_id, name } = game;
    this.setState({ game_id, gameName: name });
  };

  addOfferedGame = game => {
    let { offeredGames } = this.state;
    offeredGames.includes(game)
      ? (offeredGames = offeredGames.filter(gameName => gameName !== game))
      : offeredGames.push(game);
    this.setState({ offeredGames });
  };

  updateSearch = search => {
    const filteredGames = this.filterBySearch(search);
    this.setState({ search, filteredGames });
  };

  updateConsole = consoleIndex => {
    const buttons = ['XBox One', 'PS4', 'Switch'];
    if (consoleIndex === this.state.consoleIndex) {
      this.setState(
        { console: '', consoleIndex: null, consoleRequest: '' },
        () => {
          let filteredGames = this.state.search
            ? this.filterBySearch(this.state.search)
            : [];
          this.setState({ filteredGames });
        }
      );
    } else {
      const filteredGames = this.filterByConsole(buttons[consoleIndex]);
      this.setState({
        console: buttons[consoleIndex],
        consoleRequest: buttons[consoleIndex],
        consoleIndex,
        filteredGames
      });
    }
  };

  updateConsoleRequest = consoleRequest => {
    this.setState({ consoleRequest });
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
    const platformCodes = { PS4: '48', 'XBox One': '49', Switch: '130' };
    if (this.state.console) {
      let filteredGames = games.filter(
        game =>
          game.name.toLowerCase().includes(search.toLowerCase()) &&
          game.platforms.includes(platformCodes[this.state.console])
      );
      return filteredGames;
    } else {
      let filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(search.toLowerCase())
      );
      return filteredGames;
    }
  };

  filterByConsole = console => {
    const { games, search } = this.state;
    const platformCodes = { PS4: '48', 'XBox One': '49', Switch: '130' };
    if (search) {
      let filteredGames = games.filter(
        game =>
          game.name.toLowerCase().includes(search.toLowerCase()) &&
          game.platforms.includes(platformCodes[console])
      );
      return filteredGames;
    } else {
      let filteredGames = games.filter(game =>
        game.platforms.includes(platformCodes[console])
      );
      return filteredGames;
    }
  };

  tradeRequest = (e, gameIndex) => {
    e.preventDefault();
    this.setState({ trade: true, gameIndex });
  };

  closeOverlay = e => {
    this.setState({ trade: false, offeredGames: [] });
  };

  render() {
    const {
      status,
      search,
      console,
      consoleIndex,
      consoleRequest,
      gameIndex,
      games,
      filteredGames
    } = this.state;
    const buttons = ['XBox One', 'PS4', 'Switch'];
    const gamesToRender = search || console ? filteredGames : games;
    return (
      <View>
        {status === 'loading' ? (
          <Loading />
        ) : (
          <View style={{ height: '100%', backgroundColor: '#141414' }}>
            <Trade
              visible={this.state.trade}
              close={this.closeOverlay}
              updateConsoleRequest={this.updateConsoleRequest}
              addOfferedGame={this.addOfferedGame}
              sendRequest={this.sendRequest}
              console={consoleRequest}
              game={
                filteredGames.length
                  ? filteredGames[gameIndex]
                  : games[gameIndex]
              }
            />
            <Header
              leftComponent={{
                icon: 'account-circle',
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
              value={search}
            />
            <ButtonGroup
              buttons={buttons}
              onPress={this.updateConsole}
              selectedIndex={consoleIndex}
              containerStyle={{
                backgroundColor: '#000',
                borderColor: '#d3d3d3',
                marginBottom: 11
              }}
              innerBorderStyle={{ color: '#d3d3d3' }}
              textStyle={{ fontWeight: '700', color: '#7ed957' }}
              selectedButtonStyle={{ backgroundColor: '#7ed957' }}
              selectedTextStyle={{ fontWeight: '700', color: '#000' }}
            />
            {gamesToRender.length ? (
              <ScrollView>
                {gamesToRender.map((game, index) => (
                  <Game
                    key={index}
                    index={index}
                    game={game}
                    tradeRequest={this.tradeRequest}
                    setRequestedGame={this.setRequestedGame}
                  />
                ))}
              </ScrollView>
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  fontFamily: 'Verdana-Bold',
                  color: '#d3d3d3',
                  display: 'flex',
                  alignSelf: 'center',
                  marginTop: 30
                }}
              >
                No Results Found
              </Text>
            )}
          </View>
        )}
      </View>
    );
  }
}
