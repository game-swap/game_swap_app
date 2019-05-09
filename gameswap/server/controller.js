const { Users, Games, Platforms, Offers} = require('../database/model');

let consoleIds = {
  4: "Nintendo 64",
  7: "PlayStation",
  8: "PlayStation 2",
  9: "PlayStation 3",
  11: "Xbox",
  12: "Xbox 360",
  18: "Nintendo Entertainment System (NES)",
  19: "Super Nintendo Entertainment System (SNES)",
  20: "Nintendo DS",
  21: "Nintendo GameCube",
  36: "Xbox Live Arcade",
  37: "Nintendo 3DS",
  38: "PlayStation Portable",
  45: "PlayStation Network",
  46: "PlayStation Vita",
  47: "Virtual Console (Nintendo)",
  48: "PlayStation 4",
  49: "Xbox One",
  130: "Nintendo Switch",
  131: "Nintendo PlayStation",
  137: "New Nintendo 3DS",
  159: "Nintendo DSi",
  160: "Nintendo eShop",
  165: "PlayStation VR",
  167: "PlayStation 5"
  };

const controller = {
  addNewUser: (req, res) => {
    Users
    .create(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send('Error adding to Users table: ', err))
  },
  postNewOffer: (req, res) => {
    // assumes req.body contains obj from api get request and console, see example below  
    req.body.game_id = req.body.id; 
    // adds new record to Offers table
    Offers
    .create(req.body)
    .then((newOffer) => {
      Games
      .findOne({ where: { game_id: newOffer.game_id } })
      .then((match) => {
        if (match) {
          let offers = match.offers + 1;
          controller.updateGameOffers(req, res, offers);
        } else {
          controller.addNewGame(req, res);
        }
      })
      .catch(err => res.status(500).send('Error checking for a match in Games table: ', err))
    })
    .catch(err => res.status(500).send('Error adding to Offers table: ', err));
  },
  updateGameOffers: (req, res, offers) => {
    let game_id = req.body.id;
    Games
      .update({ offers }, { where: { game_id } })
      .then(() => controller.findGame(req, res)) // this is to confirm that the update was made
      .catch(err => res.status(500).send('Error updating offer number in Games table: ', err))
  },
  addNewGame: (req, res) => {
    req.body.cover = req.body.cover.url.substring(2); // trims cover url
    req.body.platforms = req.body.platforms.filter(i => consoleIds[i]); // sets platforms property
    req.body.offers = 1; // sets offers property
    res.send(req.body)
    // Games
    // .create(req.body)
    // .then(data => res.send(data))
    // .catch(err => res.status(500).send('Error adding to Games table: ', err))
  },
  findGame: (req, res) => {
    let game_id = req.body.id;
    Games
    .findOne({ where: { game_id } })
    .then((data) => res.send(data))
    .catch(err => res.status(500).send('Error finding in Games table: ', err))
  },
  findAllOffersSortedByNew: (req, res) => {
    Offers
    .findAll({ limit: 10, order: [["createdAt", "DESC"]] })
    .then((offers) => res.send(offers))
    .catch(err => res.status(500).send('Error finding all Offers: ', err))
  },
  findAllOffersByUserId: (req, res) => {
    let { user_id } = req.params;
    Offers
    .findAll({ where: { user_id }})
    .then((offers) => res.send(offers))
    .catch(err => res.status(500).send(`Error finding all Offers by ${user_id}: `, err))
  },
  findOfferByOfferId: (req, res) => {
    let { offer_id } = req.params;
    Offers
    .findOne({ where: { offer_id }})
    .then((offers) => res.send(offers))
    .catch(err => res.status(500).send(`Error finding offer id #${offer_id}: `, err))
  },
  deleteOfferByOfferId: (req, res) => {
    let { offer_id } = req.params;
    Offers
    .delete({ where: { offer_id }})
    .then(() => {
      // decrement games offers
      res.send(`successfully deleted offer id #${offer_id}`)
    })
    .catch(err => res.status(500).send(`Error deleting offer id #${offer_id}: `, err))
  },
  deleteAllOffersByUserId: (req, res) => {

  },
  deleteUser: (req, res) => {

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
    "platforms": [ 130 ],
    "name": "Super Smash Bros. Ultimate",
    "popularity": 136.0357747063557,
    "summary": "Legendary game worlds and fighters collide in the ultimate showdown—a new entry in the Super Smash Bros. series for the Nintendo Switch system! New fighters, like Inkling from the Splatoon series and Ridley from the Metroid series, make their Super Smash Bros. series debut alongside every Super Smash Bros. fighter in the series…EVER! Faster combat, new items, new attacks, new defensive options, and more will keep the battle raging whether you’re at home or on the go.",
    "total_rating": 89.211137823158,

    "user_id": 10,
    "platform_id": 130
}

game info will be obtained from API call
user_id and platform_id will need to be added to req.body on the front-end

*/
