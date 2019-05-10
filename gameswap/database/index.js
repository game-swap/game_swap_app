const Sequelize = require('sequelize');
const sequelize = new Sequelize('gameswap', 'postgres', 'mynameisjeff', {
  host: '18.212.114.97',
  dialect: 'postgres',
  logging: false,
  pool: { maxConnections: 20, maxIdleTime: 30 }
});

sequelize.authenticate()
  .then(() => console.log('✔ Connected to Postgres'))
  .catch(err => console.log('✔ unable to connect to postgres', err))


module.exports = sequelize;