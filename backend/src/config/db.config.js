
const Sequelize = require('sequelize');
const env = require('./env.config') 

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT ?? 5432,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    host: env.POSTGRES_HOST, 
    // logging: false,
  }
);


module.exports = {sequelize};
