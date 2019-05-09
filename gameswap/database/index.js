const Sequelize = require('sequelize');
const sequelize = new Sequelize('gameswap', 'liezelmanalo', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: { maxConnections: 20, maxIdleTime: 30 }
});

sequelize.authenticate()
  .then(() => console.log('connected to postgres'))
  .catch(err => console.log('unable to connect to postgres', err))

module.exports = sequelize;