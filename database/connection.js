const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: `618903`,
    database: 'KickStart-WorkHub'
  }); 

module.exports = client;