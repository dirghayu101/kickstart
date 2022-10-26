const path = require("path");
const db = require('./databaseRequests')
const bcrypt = require("bcryptjs");


const signUpPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/sign-up.html"));
}

const loginPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/login.html"));
}

const signUpPagePost = async (req, res) => {
    if(db.insertUser(req.body)){
      res.json({status: 'ok', msg: "User successfully signed up."});
    }else{
      res.json({msg: "Something went wrong."})
    }
}

const loginPagePost = async (req, res) => {
    const { email, password } = req.body;
    try {
    const rows = await db.getUserByMail(email)
    if (rows.length === 0) {
        res.json({ status: "error", data: "User doesn't exist" });
    }
    if (await bcrypt.compare(password, rows[0].password)) {
        console.log("Password verified, user exist.");
        res.json({ status: "ok", data: "Coming soon..." });
    }
    } catch (error) {
    console.log("User doesn't exist.");
    res.json({ status: "error", data: "Invalid username/password" });
    }
}

const dashboardPath = async (req, res) => {
    const requestKeyword = req.params.path;
    if (requestKeyword === "dashboard") {
      res.render("user-panel");
    } 
}

const user = {signUpPage, loginPage, signUpPagePost, loginPagePost, dashboardPath}
module.exports = user