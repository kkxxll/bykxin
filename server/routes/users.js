var express = require('express')
var router = express.Router()
var User = require('../controllers/user')

/* GET users listing. */
router.post('/signup', User.signup)
router.post('/signin', User.signin)
router.get('/list', User.list)
router.delete('/del', User.del)

module.exports = router
