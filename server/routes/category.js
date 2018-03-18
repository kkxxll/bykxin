var express = require('express')
var router = express.Router()
var Category = require('../controllers/category')

router.post('/new', Category.save)
router.get('/list', Category.list)

module.exports = router
