var mongoose = require('mongoose')
var SellcmSchema = require('../schemas/sellcm')

var SellCm = mongoose.model('Sellcm', SellcmSchema)

module.exports = SellCm
