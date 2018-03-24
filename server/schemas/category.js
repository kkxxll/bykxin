var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var CategorySchema = new Schema({
  name: String,
  sells: [{ type: ObjectId, ref: 'Sell' }],
  buys: [{ type: ObjectId, ref: 'Buy' }],
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})
CategorySchema.statics = {
  fetch: function (cb) {
    // 返回所有的
    return this.find({})
      .sort('meta.createAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    // 返回一个
    return this.findOne({ _id: id }).exec(cb)
  }
}

module.exports = CategorySchema
