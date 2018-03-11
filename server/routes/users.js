var express = require('express')
var router = express.Router()
var User = require('../controllers/user')

/* GET users listing. */
router.post('/signup', User.signup)

module.exports = router
