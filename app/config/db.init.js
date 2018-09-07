
var config = require('./config.js').get(process.env.NODE_ENV);

console.log(`\n${process.env.NODE_ENV}configuration loaded successfully\n`);

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: false,

  // disable logging; default: console.log
  logging: config.logging,

  pool: {
    max: config.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

console.log('.....database connection established.....');

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.users = require('../model/user.model.js')(sequelize, Sequelize);
db.roles = require('../model/role.model.js')(sequelize, Sequelize);

db.roles.hasMany(db.users); 
 
module.exports = db;