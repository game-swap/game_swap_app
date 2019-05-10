const Sequelize = require('sequelize');
const sequelize = require('./index');

const Users = sequelize.define('users', {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  requests_left: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

const Games = sequelize.define('games', {
  game_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  cover: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  platforms: {
    type: Sequelize.ARRAY(Sequelize.TEXT) 
  },
  popularity: {
    type: Sequelize.DOUBLE
  },
  summary: {
    type: Sequelize.TEXT
  },
  total_rating: {
    type: Sequelize.DOUBLE
  },
  offers: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

const Platforms = sequelize.define('platforms', {
  platform_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

const Offers = sequelize.define('offers', {
  offer_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  game_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  platform_id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: true,
  updatedAt: false,
});

sequelize.sync()
.then(() => console.log('✔ Schemas have been synced'))
.catch(err => console.log('✘ Failure to sync schemas: ', err))

module.exports = { Users, Games, Platforms, Offers };