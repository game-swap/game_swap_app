const { Users, Games, Platforms, Offers } = require('../database/model');
const users = require('./seedData/users.json');
const games = require('./seedData/games.json');
const platforms = require('./seedData/platforms.json');
const offers = require('./seedData/offers.json');

const seedFunction = (users, games, platforms, offers) => {
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
  Platforms
  .bulkCreate(platforms)
  .then(() => {
    console.log('Platforms Table Seeded');
  })
  .catch(err => console.log(err))
  Offers
  .bulkCreate(offers)
  .then(() => {
    console.log('Offers Table Seeded');
  })
}

seedFunction(users, games, platforms, offers);