const express = require('express');
const app = express();
const path = require('path');

const start = () => {
  const port = 3000;
  app.listen(port, () =>{
    console.log(`Server is listening on port ${port}...`);
    console.log(__dirname);
  });
};

app.get('/', function(req, res){
  console.log(__dirname + "/frontend/index.html");
  res.sendFile(path.join(__dirname+'/frontend/index.html'));
});
// This code doesn't work because it only send HTML file. I need to send the entire 
// directory for it to work.
start();


// Database Code starts here. 
// TODO: Focus on modularisation of code later.
const {Client} = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'rootUser',
  database: 'postgres'
});

client.connect();
client.query(`Select * from <myDb>`, (err, res) =>{
  if(!err){
    console.log(res.rows);
  } else{
    console.log(err.message);
  }
  client.end;
})