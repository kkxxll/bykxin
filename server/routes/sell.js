var express = require('express')
var router = express.Router()
var Sell = require('../controllers/sell')

router.post('/new', Sell.save)
router.get('/list/:id', Sell.list)

module.exports = router
