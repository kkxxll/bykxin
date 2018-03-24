var express = require('express')
var router = express.Router()
var Sell = require('../controllers/sell')

router.post('/new', Sell.save)

module.exports = router
