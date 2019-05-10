const { Users, Games, Consoles, Offers } = require('../database/model');
const users = require('./seedData/users.json');
const games = require('./seedData/games.json');
const consoles = require('./seedData/consoles.json');
const offers = require('./seedData/offers.json');

const seedFunction = (users, games, consoles, offers) => {
  Users
  .bulkCreate(users)
  .then(() => {
    console.log('Users Table Seeded');
  })
  .catch(err => console.log(err))
  Games
  .bulkCreate(games)
  .then(() => {
    console.log('Games Table Seeded');
  })
  .catch(err => console.log(err))
  Consoles
  .bulkCreate(consoles)
  .then(() => {
    console.log('Consoles Table Seeded');
  })
  .catch(err => console.log(err))
  Offers
  .bulkCreate(offers)
  .then(() => {
    console.log('Offers Table Seeded');
  })
}

seedFunction(users, games, consoles, offers);