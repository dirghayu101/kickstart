const path = require("path");
const bcrypt = require("bcryptjs");
const client = require("../database/connection");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");

require('dotenv').config();



//Update user function.
const updateUser = async (user, id) => {
    // id will be phone number and user will be request body.
    let updateQuery = `UPDATE public."User" SET "fName"='${user.fName}', "lName"='${user.lName}', "eMail"='${user.mailID}' WHERE "phoneNumber"=${user.phoneNumber};`
    await client.query(updateQuery, (err, result) => {
      if(!err){
        return {status: 'ok', message: "Update operation successful!"}
      } else{
        console.log(err.message)
      }
      client.end
    })
}
  
  
  //Delete user function.
const deleteUser = async (phoneNumber) => {
    let deleteQuery = `DELETE FROM public."User" WHERE "phoneNumber"=${phoneNumber}`
    await client.query(deleteQuery, (err, result) => {
      if (!err) {
        return {status: 'ok', message: "Deletion was successful"}
      } else {
        console.log(err.message)
      }
      client.end
    });
}
  
//Insert User function.
const insertUser = async (user) => {
    //user will be the request body.
    const {password: plainTextPassword, firstName, lastName, phoneNumber, emailID, gender,} = user
    const password = await bcrypt.hash(plainTextPassword, 10)
    insertQuery = `INSERT INTO public."User"("fName", "lName", "phoneNumber", password, "eMail", gender) VALUES ('${firstName}', '${lastName}', ${phoneNumber}, '${password}', '${emailID}', '${gender}' )`
    await client.query(insertQuery, (err, result) => {
        if (!err) {
          client.end;
          return true
        } else {
          console.log(err)
        }
        client.end;
    });
    return false
}
  
const getAllUsers = async () => {
    const selectQuery = `SELECT "fName", "lName", "phoneNumber", "eMail"  FROM public."User"`
    const { rows } = await client.query(selectQuery)
    client.end
    return rows
}
  
const getUserByMail = async (mailID) => {
    const getQuery = `SELECT "eMail", password FROM public."User" WHERE "eMail"='${mailID}'`;
    const {rows} = await client.query(getQuery);
    client.end;
    return rows
}

const getUserInformation = async (mailID) => {
  const getQuery = `SELECT "fName", "lName", "phoneNumber", "eMail", password FROM public."User" WHERE "eMail"='${mailID}'`;
  const {rows} = await client.query(getQuery);
  client.end;
  console.log(rows)
  return rows
}
  
const getAdmin = async (email) => {
    const getQuery = `SELECT "email", password FROM public."Admin" WHERE "email"='${email}'`
    const {rows} = await client.query(getQuery)
    client.end;
    return rows
}

const db = {getAdmin, getUserByMail, getAllUsers, insertUser, deleteUser, updateUser, getUserInformation,}
module.exports = db;