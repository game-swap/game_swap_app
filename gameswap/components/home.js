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
      consoleRequest: '',
      trade: false,
      games: [
        // {
        //   cover:
        //     'https://images.g2a.com/newlayout/470x470/1x1x0/b99b28590aea/5bc9c521ae653a5fd7677389',
        //   name: 'Red Dead Redemption 2',
        //   platforms: ['49']
        // },
        // {
        //   cover:
        //     'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kingdom_Hearts_III_box_art.jpg/220px-Kingdom_Hearts_III_box_art.jpg',
        //   name: 'Kingdom Hearts III',
        //   platforms: ['49']
        // },
        // {
        //   cover:
        //     'https://www.mobygames.com/images/covers/l/541579-anthem-legion-of-dawn-edition-playstation-4-front-cover.jpg',
        //   name: 'Anthem',
        //   platforms: ['49']
        // },
        // {
        //   cover: 'https://i.imgur.com/T50pVR6.jpg',
        //   name: 'God of War',
        //   platforms: ['48']
        // },
        // {
        //   cover:
        //     'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Spider-Man_PS4_cover.jpg/220px-Spider-Man_PS4_cover.jpg',
        //   name: 'Spider-Man',
        //   platforms: ['48']
        // },
        // {
        //   cover:
        //     'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Sekiro_art.jpg/220px-Sekiro_art.jpg',
        //   name: 'Sekiro: Shadows Die Twice',
        //   platforms: ['48']
        // },
        // {
        //   cover:
        //     'https://cdn02.nintendo-europe.com/media/images/11_square_images/games_18/nintendo_switch_5/SQ_NSwitch_SuperSmashBrosUltimate_02_image420w.jpg',
        //   name: 'Super Smash Bros Ultimate',
        //   platforms: ['130']
        // },
        // {
        //   cover:
        //     'https://www.playersinitiative.com/wp-content/uploads/2017/03/The-Legend-of-Zelda-Breath-of-the-Wild-Cover-Art-Game.jpg',
        //   name: 'The Legend of Zelda: Breath of the Wild',
        //   platforms: ['130']
        // },
        // {
        //   cover:
        //     'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Mortal_Kombat_11_cover_art.png/220px-Mortal_Kombat_11_cover_art.png',
        //   name: 'Mortal Kombat 11',
        //   platforms: ['130']
        // }
      ],
      filteredGames: []
    };
  }

  componentWillMount() {
    axios
      .get('http://18.206.147.254:3000/api/games/?sort=offers')
      .then(games => this.setState({ status: 'loaded', games: games.data }))
      .catch(err => console.log(err));
  }

  updateSearch = search => {
    let filteredGames = this.filterBySearch(search);
    this.setState({ search, filteredGames });
  };

  updateConsole = consoleIndex => {
    let buttons = ['XBox One', 'PS4', 'Switch'];
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
      let filteredGames = this.filterByConsole(buttons[consoleIndex]);
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
    let { games } = this.state;
    let platformCodes = { PS4: '48', 'XBox One': '49', Switch: '130' };
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
    let { games, search } = this.state;
    let platformCodes = { PS4: '48', 'XBox One': '49', Switch: '130' };
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

  tradeRequest = e => {
    e.preventDefault();
    this.setState({ trade: true });
  };

  closeOverlay = e => {
    this.setState({ trade: false });
  };

  render() {
    const {
      status,
      search,
      console,
      consoleIndex,
      consoleRequest,
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
              console={consoleRequest}
            />
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
            {gamesToRender.length ? (
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
