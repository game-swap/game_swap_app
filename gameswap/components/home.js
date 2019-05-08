import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Header, SearchBar, ButtonGroup } from 'react-native-elements';
import Logo from './logo.js';
import Game from './game.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      console: '',
      games: [
        {
          img:
            'https://images.g2a.com/newlayout/470x470/1x1x0/b99b28590aea/5bc9c521ae653a5fd7677389',
          title: 'Red Dead Redemption 2',
          console: 'XBox One'
        },
        {
          img:
            'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kingdom_Hearts_III_box_art.jpg/220px-Kingdom_Hearts_III_box_art.jpg',
          title: 'Kingdom Hearts III',
          console: 'XBox One'
        },
        {
          img:
            'https://www.mobygames.com/images/covers/l/541579-anthem-legion-of-dawn-edition-playstation-4-front-cover.jpg',
          title: 'Anthem',
          console: 'XBox One'
        },
        {
          img:
            'https://images.g2a.com/newlayout/470x470/1x1x0/b99b28590aea/5bc9c521ae653a5fd7677389',
          title: 'Red Dead Redemption 2',
          console: 'PS4'
        },
        {
          img:
            'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kingdom_Hearts_III_box_art.jpg/220px-Kingdom_Hearts_III_box_art.jpg',
          title: 'Kingdom Hearts III',
          console: 'PS4'
        },
        {
          img:
            'https://www.mobygames.com/images/covers/l/541579-anthem-legion-of-dawn-edition-playstation-4-front-cover.jpg',
          title: 'Anthem',
          console: 'PS4'
        },
        {
          img:
            'https://images.g2a.com/newlayout/470x470/1x1x0/b99b28590aea/5bc9c521ae653a5fd7677389',
          title: 'Red Dead Redemption 2',
          console: 'Switch'
        },
        {
          img:
            'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kingdom_Hearts_III_box_art.jpg/220px-Kingdom_Hearts_III_box_art.jpg',
          title: 'Kingdom Hearts III',
          console: 'Switch'
        },
        {
          img:
            'https://www.mobygames.com/images/covers/l/541579-anthem-legion-of-dawn-edition-playstation-4-front-cover.jpg',
          title: 'Anthem',
          console: 'Switch'
        }
      ],
      filteredGames: []
    };
  }

  updateSearch = search => {
    let filteredGames = this.filterBySearch(search);
    this.setState({ search, filteredGames });
  };

  updateConsole = e => {
    let buttons = ['XBox One', 'PS4', 'Switch'];
    let filteredGames = this.filterByConsole(buttons[e]);
    this.setState({ console: buttons[e], filteredGames });
  };

  clearSearch = () => {
    if (this.state.console) {
      let filteredGames = this.filterByConsole(this.state.console);
      this.setState({ search: '', filteredGames }, () => this.updateSearch);
    } else {
      this.setState({ search: '', filteredGames: [] });
    }
  };

  filterBySearch = search => {
    let { games } = this.state;
    if (this.state.console) {
      let filteredGames = games.filter(
        game =>
          game.title.toLowerCase().includes(search.toLowerCase()) &&
          game.console === this.state.console
      );
      return filteredGames;
    } else {
      let filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(search.toLowerCase())
      );
      return filteredGames;
    }
  };

  filterByConsole = console => {
    let { games } = this.state;
    if (this.state.search) {
      let filteredGames = games.filter(game =>
        game.title
          .toLowerCase()
          .includes(this.state.search.toLowerCase() && game.console === console)
      );
      return filteredGames;
    } else {
      let filteredGames = games.filter(game => game.console === console);
      return filteredGames;
    }
  };

  tradeRequest = () => {};

  render() {
    let { search, console, games, filteredGames } = this.state;
    let buttons = ['XBox One', 'PS4', 'Switch'];
    let gamesToRender = search || console ? filteredGames : games;
    return (
      <View style={{ height: '100%', backgroundColor: '#fffff0' }}>
        <Header
          leftComponent={<Logo />}
          centerComponent={{
            text: 'GameSwap',
            style: {
              fontSize: 18,
              fontWeight: '700',
              color: '#7ed957'
            }
          }}
          rightComponent={{
            icon: 'account-circle',
            color: '#000'
          }}
          containerStyle={{ backgroundColor: '#fffff0' }}
        />
        <SearchBar
          containerStyle={{ backgroundColor: '#fffff0', marginTop: -1 }}
          placeholder="Search for Games"
          onChangeText={this.updateSearch}
          onClear={this.clearSearch}
          value={search}
        />
        <ButtonGroup
          buttons={buttons}
          onPress={this.updateConsole}
          containerStyle={{
            backgroundColor: '#7ed957',
            borderColor: '#000',
            marginBottom: 5
          }}
          innerBorderStyle={{ color: '#000' }}
          textStyle={{ color: '#000' }}
        />
        <Text style={styles.text}>Available Games</Text>
        <ScrollView>
          {gamesToRender.map((game, index) => (
            <Game
              key={index}
              index={index}
              img={game.img}
              title={game.title}
              tradeRequest={this.tradeRequest}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 5,
    marginBottom: 15
  }
});
