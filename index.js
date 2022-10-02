const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const app = express();
const bcrypt =  require('bcryptjs')
const client = require('./connection');
const { existsSync } = require('fs');
const jwt = require('jsonwebtoken');

app.use(express.static('./frontend'))
app.use(bodyParser.json())



app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.resolve(__dirname, './frontend/home.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/sign-up.html'));

});

app.get('/login', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './frontend/login.html'));
});
client.connect();
app.post('/api/signup', async (req, res) =>{
    console.log(req.body);
    const {password: plainTextPassword, firstName, lastName, phoneNumber, emailID, gender} = req.body;
    const password = await bcrypt.hash(plainTextPassword, 10);
    try{
        var insertQuery = `INSERT INTO public."User"(
            "fName", "lName", "phoneNumber", password, "eMail", gender)
            VALUES ('${firstName}', '${lastName}', ${phoneNumber}, '${password}', '${emailID}', 'Male' )`;
        
        console.log(insertQuery);
        client.query(insertQuery, (err, result) => {
            if(!err){
                console.log("Insertion was successful!");
            }
            else{
                var error = err;
                throw error;
            }
            client.end;
        });
    }
    catch(error){
        if(error.code === 23505){
            return res.json({status: 'error', error: 'Mobile Number or email address already exist.'});
        }
        else{
            throw error;
        }

    }
    res.json({status: 'ok'});
});

/* 

	
SELECT "eMail", password FROM public."User" WHERE "eMail" = 'dirghayujoshi48@gmail.com';
*/

app.post('/api/login', async(req, res) => {
    
    const {email, password} = req.body;
    console.log("Here");
    try {
        const getQuery = `SELECT "eMail", password FROM public."User" WHERE "eMail"='${email}'`;
        const result = await client.query(getQuery);
        const {rows} = result;
        if(rows.length === 0){
            throw error;
        }
        if(bcrypt.compare(password, rows[0].password)){
            res.json({status: 'ok', data: 'Coming soon...'})
        }
        
    } catch (error) {
        res.json({status: 'error', data: "Invalid username/password"});
    }
    

});



/*
 client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
*/

app.listen(3000, () => {
    
    console.log(path.resolve(__dirname, './frontend/home.html'));
    console.log('server is listening on port 3000....')
})