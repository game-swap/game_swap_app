const Sequelize = require('sequelize');
const sequelize = new Sequelize('gameswap', 'postgres', 'mynameisjeff', {
  host: '18.212.114.97',
  dialect: 'postgres',
  logging: false,
  pool: { maxConnections: 20, maxIdleTime: 30 }
});

<<<<<<< HEAD
sequelize.authenticate({ force: true })
  .then(() => console.log('✔ Connected to Postgres'))
  .catch(err => console.log('✔ unable to connect to postgres', err))
=======
sequelize.authenticate()
  .then(() => console.log('connected to postgres'))
  .catch(err => console.log('unable to conenct to postgres', err))
>>>>>>> origin/master


module.exports = sequelize;