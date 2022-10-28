const path = require("path");
const db = require('./databaseRequests')
const jwt = require("jsonwebtoken");
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

    const rows = await db.getUserByMail(email)
    if (rows.length === 0) {
        res.json({ status: "error", data: "User doesn't exist" });
    }
    if (await bcrypt.compare(password, rows[0].password)) {  
      const token = jwt.sign(
        {
          email: rows[0].email,
        },
        process.env.JWT_USER
      )
      res.json({ status: "ok", data: token});
    }
}

const dashboardPath = async (req, res) => {
  let authBody = req.headers.authorization.split(' ')
  let token = authBody[0]
  let email = authBody[1]
  if (!jwt.verify(token, process.env.JWT_USER)) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }
  const userInformation = await db.getUserInformation(email)
  console.log(userInformation)
  const requestKeyword = req.params.path;
  const userData = require("../data/userDataObject")
  if (requestKeyword === "dashboard") {
    res.render("user-panel", {
      data: userData.dashboard,
      db: userInformation[0],
    });
  } else if(requestKeyword === "spaces"){
    res.render("user-panel", {
      data: userData.spaces ,
      db: userInformation[0],
    });
  } else if(requestKeyword === "orders"){
    res.render("user-panel", {
      db: userInformation[0],
      data: userData.orders,
    });
    
  } else if(requestKeyword === "feedback"){
    res.render("user-panel", {
      db: userInformation[0],
      data: userData.feedback,
    });
    
  } else if(requestKeyword === "support"){
    res.render("user-panel", {
      db: userInformation[0],
      data: userData.support,
    });
    
  } else {
    if(requestKeyword === "reschedule"){
      res.render("user-panel", {
      db: userInformation[0],
      data: userData.reschedule,
      });
    }
    //TODO Else condition to return error.
  }
}

const user = {signUpPage, loginPage, signUpPagePost, loginPagePost, dashboardPath}
module.exports = user