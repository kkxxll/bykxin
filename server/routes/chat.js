var express = require('express')
var router = express.Router()
var Chat = require('../controllers/chat')

router.post('/new', Chat.save)
router.get('/list/:user', Chat.list)
module.exports = router
