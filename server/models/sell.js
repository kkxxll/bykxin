var mongoose = require('mongoose')
var SellSchema = require('../schemas/sell')

var Sell = mongoose.model('Sell', SellSchema)

module.exports = Sell
