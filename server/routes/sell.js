var express = require('express')
var router = express.Router()
var Sell = require('../controllers/sell')

router.post('/new', Sell.savePhoto, Sell.save)
router.get('/list/:id', Sell.list)
router.get('/list', Sell.allsell)
router.get('/listsell/:name', Sell.listsell)
router.get('/detail/:id', Sell.detail)
router.get('/search/:q', Sell.search)

module.exports = router
