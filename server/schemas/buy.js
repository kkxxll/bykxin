var mongoose = require('mongoose')
var Schema = mongoose.Schema
var objectId = Schema.Types.ObjectId

var BuySchema = new Schema({
  author: String,
  title: String,
  desc: String,
  price: Number,
  photo: [{ type: String }],
  pv: {
    type: Number,
    default: 0
  },
  category: {
    type: objectId,
    ref: 'Category'
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

BuySchema.statics = {
  fetch: function (cb) {
    return this.find({})
      .sort('meta.createAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this.findOne({ _id: id }).exec(cb)
  }
}

module.exports = BuySchema
