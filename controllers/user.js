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
    
  } else if(requestKeyword === 'to-cart'){
    res.render("user-panel", {
      db: userInformation[0],
      data: userData.cart,
    })

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

const reservationDB = require('./populate')



const makeReservation = async (req, res) => {
  let authBody = req.headers.authorization.split(' ')
  let token = authBody[0]
  let email = authBody[1]
  if (!jwt.verify(token, process.env.JWT_USER)) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }
  let userInfo = await db.getUserInformation(email)
  userInfo = userInfo[0]
  let {reservationArr} = req.body
  reservationArr.forEach(async (spaceType) => {
    let space = spaceType.space.split(' ').join().replace(',', '')
    space = space.replace(space.charAt(0), space.charAt(0).toLowerCase()) 
    let seats = await reservationDB.getSeats(space, spaceType.numberOfSpace)
    let startTime = spaceType.reservationDate + ' 06:00:00'
    let endTime = spaceType.reservationDate + ' 23:59:59'
    let phoneNumber = parseInt(userInfo.phoneNumber)
    let makeReservationObj = {
      space: space,
      start: startTime,
      end: endTime,
      phoneNumber: phoneNumber,
      seatIDs: seats
    }
    reservationDB.makeReservation(makeReservationObj)
  })
  res.json({status: 'ok'})
}

const getSpaceStatus = async (req, res) => {
  // let authBody = req.headers.authorization.split(' ')
  // let token = authBody[0]
  // if (!jwt.verify(token, process.env.JWT_USER)) {
  //   return res.json({ status: "error", error: "Invalid username/password" });
  // }
  let spaceArr = ['Conference Room', 'Cubicle', 'Private Office', 'Hot Seat']
  let result = await reservationDB.getSeatsAvailableObject(spaceArr)
  res.json(result)
}

const user = {signUpPage, loginPage, signUpPagePost, loginPagePost, dashboardPath, makeReservation, getSpaceStatus}
module.exports = user