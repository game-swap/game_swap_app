const { Users, Games, Platforms, Offers} = require('../database/model');
const { consoleIds, helpers } = require('./dbHelpers');



const controller = {
  addNewUser: (req, res) => {
    req.body.requests_left = 5;
    Users
    .create(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => {
      console.log('✘ Error adding to Users table')
      res.status(500).send('Email or Username already exists. Try again.')
    })
  },

  deleteUser: (req, res) => {
    let { user_id } = req.params;
    Users
    .destroy({ where: { user_id } })
    .then(() => res.status(200).send(`Deleted User Id #${user_id}`))
    .catch(err => res.status(500).send(`✘ Error deleting User Id #${user_id}: , ${err}`))
  },

  findAllOffersByUserId: (req, res) => {
    let { user_id } = req.params;
    Offers
    .findAll({ where: { user_id }})
    .then((offers) => res.send(offers))
    .catch(err => res.status(500).send(`Error finding all Offers by ${user_id}: `, err))
  },
  // deleteAllOffersByUserId: (req, res) => {
  //   let { user_id } = req.params;
  //   Offers
  //   .findAll({ where: { user_id } })
  //   .then((arrayData) => {
  //     let deletePromises = [];
  //     arrayData.forEach((offer) => {
  //       let { offer_id, game_id } = offer;
  //       deletePromises.push(helpers.deleteOffer(offer_id, game_id))
  //     })
  //     console.log(deletePromises)
  //     Promise.all(deletePromises)
  //     .then((gameIds) => {
  //       console.log(gameIds)
  //       let updatePromises = [];
  //       gameIds.forEach((game_id) => {
  //         updatePromises.push(helpers.updateNumberOfOffers(game_id))
  //       })
  //       console.log(gameIds)
  //       Promise.all(updatePromises)
  //       .then(values => res.send(values))
  //       .catch('DIDNT WORK :(')
  //     })
  //     .catch(err => res.send(err))
  //   })
  // },

  findAllOffersSortedByNew: (req, res) => {
    Offers
    .findAll({ limit: 10, order: [["createdAt", "DESC"]] })
    .then((offers) => res.send(offers))
    .catch(err => res.status(500).send('Error finding all Offers: ', err))
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
    .findOne({ where: { offer_id }})
    .then((offer) => {
      let { offer_id, game_id } = offer;
      Offers
      .destroy({ where: { offer_id } })
      .then(() => {
        Games
        .findOne({ where: { game_id } })
        .then((match) => {
          if (match) {
            let offers = match.offers - 1 || 0;
            req.body.id = game_id;
            controller.updateGameOffers(req, res, offers);
          };
        })
        .catch(err => res.send('✘ Error updating offer number on Games table'))
      })

    })
    .catch(err => res.status(500).send(`Error deleting offer id #${offer_id}: `, err))
  },
  updateGameOffers: (req, res, offers) => {
  let game_id = req.body.id;
  Games
    .update({ offers }, { where: { game_id } })
    .then(() => controller.findGame(req, res)) // this is to confirm that the update was made
    .catch(err => res.status(500).send('Error updating offer number in Games table: ', err))
  },

  findAllGames: (req, res) => {
    console.log(req.query)
    let query = { limit: 10 }
    if (req.query.sort) {
      query.order = [[req.query.sort, "DESC"]];
    }
    Games
    .findAll(query)
    .then((games) => res.send(games))
    .catch(err => res.status(500).send('Error finding all Games: ', err))
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
  findGame: (req, res) => {
    let game_id = req.params.game_id || req.body.game_id;
    Games
    .findOne({ where: { game_id } })
    .then((data) => res.send(data))
    .catch(err => res.status(500).send('Error finding in Games table: ', err))
  },

  addNewGame: (req, res) => {
    req.body.cover = req.body.cover.url.substring(2); // trims cover url
    req.body.platforms = req.body.platforms.filter(i => consoleIds[i]); // sets platforms property
    req.body.offers = 1; // sets offers property
    Games
    .create(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send('Error adding to Games table: ', err))
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
