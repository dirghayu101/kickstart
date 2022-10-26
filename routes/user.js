const express = require('express') 
const app = express()
const router = express.Router()
const user = require("../controllers/user")

router.get("/signup", user.signUpPage);
  
router.get("/login", user.loginPage);

router.post("/signup", user.signUpPagePost);
  
router.post("/login", user.loginPagePost);

router.get("/:path", user.dashboardPath);

module.exports = router