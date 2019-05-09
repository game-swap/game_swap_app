const { Users, Games, Consoles, Offers} = require('../database/model');

const controller = {
  addNewUser: (req, res) => {
    Users
    .create(req.body)
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },
  findGame: (req, res) => {
    let game_id = req.body.id;
    Games
    .findOne({ where: { game_id } })
    .then((data) => res.send(data))
    .catch(err => res.send(err))
  },
  addNewGame: (req, res) => {
    // assumes req.body contains obj from api get request and console, see example below
    let cover = req.body.cover.url.substring(2);
    req.body.cover = cover; // resassigns cover property
    req.body.offers = 1; // sets offers property
    req.body.game_id = req.body.id; // renames property to game_id
    console.log(req.body)

    Offers
    .create(req.body)
    .then(() => {
      Games
      .create(req.body)
      .then(data => res.send(data))
      .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
  },
  updateGameOffers: (req, res, data) => {
    console.log('goodbye');
    let game_id = req.body.id;
    let offers = data.offers + 1;
    console.log(game_id)
    Games
      .update({ offers }, { where: { game_id } })
      .then(data => res.send(data))
      .catch(err => res.send(err))
  },
  postNewOffer: (req, res) => {
    // check to see if game is in our database first
    let game_id = req.body.id;
    Games
    .findOne({ where: { game_id } })
    .then((data) => {
      if (data) {
        console.log('hello')
        console.log(controller.updateGameOffers)
        controller.updateGameOffers(req, res, data)
      } else {
        res.send(`Game id #${game_id} does not exist`);
      }
    })
    .catch(err => res.send(err))
      // if not, this.addNewGame
      // else, this.addExistingGame
  }
}

module.exports = controller;

/* 

Example req.body received for addNewGame:
{
    "id": 90101,
    "cover": {
        "id": 70748,
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/co1il8.jpg"
    },
    "name": "Super Smash Bros. Ultimate",
    "popularity": 136.0357747063557,
    "summary": "Legendary game worlds and fighters collide in the ultimate showdown—a new entry in the Super Smash Bros. series for the Nintendo Switch system! New fighters, like Inkling from the Splatoon series and Ridley from the Metroid series, make their Super Smash Bros. series debut alongside every Super Smash Bros. fighter in the series…EVER! Faster combat, new items, new attacks, new defensive options, and more will keep the battle raging whether you’re at home or on the go.",
    "total_rating": 89.211137823158,
    "user_id": 1,
    "console": "ns"
}

*/
