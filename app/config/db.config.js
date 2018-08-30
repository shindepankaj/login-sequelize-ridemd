const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  sync: { force: true, alter: true },

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 

console.log('\n\n\n\n\n\n\n\n\n\n');
console.log('******* database connection established *****');
console.log('\n\n\n\n\n\n\n\n\n\n');

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.users = require('../model/user.model.js')(sequelize, Sequelize);
 
 
module.exports = db;