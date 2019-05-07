import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Header, SearchBar, ButtonGroup } from 'react-native-elements';
import Logo from './logo.js';
import Game from './game.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      console: '',
      search: '',
      games: [
        {
          img:
            'https://images.g2a.com/newlayout/470x470/1x1x0/b99b28590aea/5bc9c521ae653a5fd7677389',
          title: 'Red Dead Redemption 2'
        },
        {
          img:
            'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kingdom_Hearts_III_box_art.jpg/220px-Kingdom_Hearts_III_box_art.jpg',
          title: 'Kingdom Hearts III'
        },
        {
          img:
            'https://www.mobygames.com/images/covers/l/541579-anthem-legion-of-dawn-edition-playstation-4-front-cover.jpg',
          title: 'Anthem'
        },
        {
          img:
            'https://images.g2a.com/newlayout/470x470/1x1x0/b99b28590aea/5bc9c521ae653a5fd7677389',
          title: 'Red Dead Redemption 2'
        },
        {
          img:
            'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kingdom_Hearts_III_box_art.jpg/220px-Kingdom_Hearts_III_box_art.jpg',
          title: 'Kingdom Hearts III'
        },
        {
          img:
            'https://www.mobygames.com/images/covers/l/541579-anthem-legion-of-dawn-edition-playstation-4-front-cover.jpg',
          title: 'Anthem'
        },
        {
          img:
            'https://images.g2a.com/newlayout/470x470/1x1x0/b99b28590aea/5bc9c521ae653a5fd7677389',
          title: 'Red Dead Redemption 2'
        },
        {
          img:
            'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kingdom_Hearts_III_box_art.jpg/220px-Kingdom_Hearts_III_box_art.jpg',
          title: 'Kingdom Hearts III'
        },
        {
          img:
            'https://www.mobygames.com/images/covers/l/541579-anthem-legion-of-dawn-edition-playstation-4-front-cover.jpg',
          title: 'Anthem'
        }
      ]
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  tradeRequest = () => {};

  render() {
    const { search } = this.state;
    const buttons = ['XBox One', 'PS4', 'Switch'];
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
          onChange={this.updateSearch}
          value={search}
        />
        <ButtonGroup
          buttons={buttons}
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
          {this.state.games.map((game, index) => (
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
