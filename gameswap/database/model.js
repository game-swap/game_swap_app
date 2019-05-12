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
  }
}, {
  timestamps: false,
  instanceMethods: {
    generateHash: {
      generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      },
      validPassword(password) {
        return bcrypt.compareSync(password, this.local.password)
      }
    }
  }
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

const Consoles = sequelize.define('consoles', {
  console_id: {
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
  console_id: {
    type: Sequelize.INTEGER
  }
});

sequelize.sync()
.then(() => console.log('schemas have been synced'))
.catch(err => console.log('unable to sync schemas: ', err))

module.exports = { Users, Games, Consoles, Offers };