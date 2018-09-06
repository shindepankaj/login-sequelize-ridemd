const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  // sync: { force: true, alter: true },

  // disable logging; default: console.log
  logging: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
//.sync({force: false, alter: true}).then(() => {
    // console.log('Drop and Resync with { force: false }');
  // });

// sequelize.sync({force: false, alter: true}).then(() => {
  // console.log('Drop and Resync with { force: false }');
// });

console.log('\n');
console.log('******* database connection established *****');
console.log('\n');

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.users = require('../model/user.model.js')(sequelize, Sequelize);
db.roles = require('../model/role.model.js')(sequelize, Sequelize);

db.roles.hasMany(db.users); 
 
module.exports = db;