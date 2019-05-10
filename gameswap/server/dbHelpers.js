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

const helpers = {
  deleteOffer: (offer_id, game_id) => {
    Offers
    .destroy({ where: { offer_id } })
  },
  updateNumberOfOffers: (game_id) => {
    Games
    .findOne({ where: { game_id } })
    .then((match) => {
      if (match) {
        let offers = match.offers - 1 || 0;
        Games
        .update({ offers }, { where: { game_id } })
      }
    })
  }
}

module.exports = { consoleIds, helpers };

// updateGameOffers: (req, res, offers) => {
//   let game_id = req.body.id;
//   Games
//     .update({ offers }, { where: { game_id } })
//     .then(() => controller.findGame(req, res)) // this is to confirm that the update was made
//     .catch(err => res.status(500).send('Error updating offer number in Games table: ', err))
//   }