var mongoose = require('mongoose')
var BuySchema = require('../schemas/buy')

var Buy = mongoose.model('Buy', BuySchema)

module.exports = Buy
