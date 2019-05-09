import React, { Component } from 'react';
import  axios from 'axios';
import IGDB_API_KEY from '../../config';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 14,
      console_id: 311
    }
    this.fetchGameInfo = this.fetchGameInfo.bind(this);
  }

  fetchGameInfo(e) {
    e.preventDefault();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api-v3.igdb.com/games";
    const game_id = "/90101"
    const queryParams = "?fields=id,name,summary,popularity,total_rating,cover.url"
    axios
    .get((proxyurl + url + game_id + queryParams), 
    {
      headers: {
        'user-key': IGDB_API_KEY
      }
    })
    .then(response => console.log(response.data[0]))
    .catch(err => console.log('could not fetch. err: ', err))
  }

  render() {
    return (
      <div>
        <button onClick={this.fetchGameInfo}>Test</button>
      </div>
    )
  }
}

export default App;
