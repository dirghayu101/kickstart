const client = require('./connection.js');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300.");
})
client.connect();


app.use(bodyParser.json());
app.get('/users', (req, res)=>{
    client.query(`SELECT * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }        
    });
    client.end;
})