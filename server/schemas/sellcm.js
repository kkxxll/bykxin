var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var SellcmSchema = new Schema({
  sell: { type: ObjectId, ref: 'Sell' },
  from: { type: ObjectId, ref: 'User' },
  replay: String,
  content: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})
// SellcmSchema.pre('save', function (next) {
//   if (this.isNew) {
//     this.meta.createAt = this.meta.updateAt = Date.now()
//   } else {
//     this.meta.updateAt = Date.now()
//   }
//   next()
// })

SellcmSchema.statics = {
  fetch: function (cb) {
    return this.find({})
      .sort('meta.createAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this.findOne({ _id: id }).exec(cb)
  }
}

module.exports = SellcmSchema
