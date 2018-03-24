var express = require('express')
var router = express.Router()
var Buy = require('../controllers/buy')

router.post('/new', Buy.save)

module.exports = router
