import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Header, SearchBar, ButtonGroup } from 'react-native-elements';
import Logo from './logo.js';
import Game from './game.js';
import Trade from './trade.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      console: '',
      consoleIndex: null,
      trade: false,
      games: [
        {
          cover:
            'https://images.g2a.com/newlayout/470x470/1x1x0/b99b28590aea/5bc9c521ae653a5fd7677389',
          name: 'Red Dead Redemption 2',
          console: 'XBox One'
        },
        {
          cover:
            'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kingdom_Hearts_III_box_art.jpg/220px-Kingdom_Hearts_III_box_art.jpg',
          name: 'Kingdom Hearts III',
          console: 'XBox One'
        },
        {
          cover:
            'https://www.mobygames.com/images/covers/l/541579-anthem-legion-of-dawn-edition-playstation-4-front-cover.jpg',
          name: 'Anthem',
          console: 'XBox One'
        },
        {
          cover:
            'https://images.g2a.com/newlayout/470x470/1x1x0/b99b28590aea/5bc9c521ae653a5fd7677389',
          name: 'Red Dead Redemption 2',
          console: 'PS4'
        },
        {
          cover:
            'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kingdom_Hearts_III_box_art.jpg/220px-Kingdom_Hearts_III_box_art.jpg',
          name: 'Kingdom Hearts III',
          console: 'PS4'
        },
        {
          cover:
            'https://www.mobygames.com/images/covers/l/541579-anthem-legion-of-dawn-edition-playstation-4-front-cover.jpg',
          name: 'Anthem',
          console: 'PS4'
        },
        {
          cover:
            'https://images.g2a.com/newlayout/470x470/1x1x0/b99b28590aea/5bc9c521ae653a5fd7677389',
          name: 'Red Dead Redemption 2',
          console: 'Switch'
        },
        {
          cover:
            'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kingdom_Hearts_III_box_art.jpg/220px-Kingdom_Hearts_III_box_art.jpg',
          name: 'Kingdom Hearts III',
          console: 'Switch'
        },
        {
          cover:
            'https://www.mobygames.com/images/covers/l/541579-anthem-legion-of-dawn-edition-playstation-4-front-cover.jpg',
          name: 'Anthem',
          console: 'Switch'
        }
      ],
      filteredGames: []
    };
  }

  loginVerify = () => {
    this.setState({ logIn: false });   
  }

  updateSearch = search => {
    let filteredGames = this.filterBySearch(search);
    this.setState({ search, filteredGames });
  };

  updateConsole = consoleIndex => {
    let buttons = ['XBox One', 'PS4', 'Switch'];
    if (consoleIndex === this.state.consoleIndex) {
      this.setState({ console: '', consoleIndex: null }, () => {
        let filteredGames = this.state.search
          ? this.filterBySearch(this.state.search)
          : [];
        this.setState({ filteredGames });
      });
    } else {
      let filteredGames = this.filterByConsole(buttons[consoleIndex]);
      this.setState({
        console: buttons[consoleIndex],
        consoleIndex,
        filteredGames
      });
    }
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
    let { games } = this.state;
    if (this.state.console) {
      let filteredGames = games.filter(
        game =>
          game.name.toLowerCase().includes(search.toLowerCase()) &&
          game.console === this.state.console
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
    let { games } = this.state;
    if (this.state.search) {
      let filteredGames = games.filter(
        game =>
          game.name.toLowerCase().includes(this.state.search.toLowerCase()) &&
          game.console === console
      );
      return filteredGames;
    } else {
      let filteredGames = games.filter(game => game.console === console);
      return filteredGames;
    }
  };

  tradeRequest = e => {
    e.preventDefault();
    this.setState({ trade: true });
  };

  closeOverlay = e => {
    this.setState({ trade: false });
  };

  render() {
    let { search, console, consoleIndex, games, filteredGames } = this.state;
    let buttons = ['XBox One', 'PS4', 'Switch'];
    let gamesToRender = search || console ? filteredGames : games;
    let currentConsole = this.state.console === '' ? 'All' : this.state.console;
    return (
      <View style={{ height: '100%', backgroundColor: '#141414' }}>
        <Trade visible={this.state.trade} close={this.closeOverlay} />
        <Header
          leftComponent={<Logo />}
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
          rightComponent={{
            icon: 'account-circle',
            color: '#000'
          }}
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
        <ScrollView>
          {gamesToRender.map((game, index) => (
            <Game
              key={index}
              index={index}
              cover={game.cover}
              name={game.name}
              tradeRequest={this.tradeRequest}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
