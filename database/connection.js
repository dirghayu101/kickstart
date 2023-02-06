const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: process.env.PSQL_PORT,
    password: process.env.PSQL_PASSWORD,
    database: 'KickStart-WorkHub'
  }); 

module.exports = client;