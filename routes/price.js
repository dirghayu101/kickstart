const express = require('express') 
const app = express()
const router = express.Router()
const price = require("../controllers/price")

router.get('/:path', price.sendPricePage)

module.exports = router