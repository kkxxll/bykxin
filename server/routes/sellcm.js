var express = require('express')
var router = express.Router()
var Sellcm = require('../controllers/sellcm')

router.post('/new', Sellcm.save)
router.post('/replay', Sellcm.replay)
router.get('/list/:id', Sellcm.list)

module.exports = router
