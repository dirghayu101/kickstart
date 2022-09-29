const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '618903',
    database: 'KickStart-WorkHub'
  }); 
  
/*client.connect();
client.query(`Select * FROM public."User";`, (err, res) =>{
  if(!err){
    console.log(res.rows);
  } else{
    console.log(err.message);
  }
  client.end;
}) */
module.exports = client;